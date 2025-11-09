import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
})

// Use dedicated buyout webhook secret, fallback to main webhook secret
const webhookSecret = process.env.STRIPE_BUYOUT_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  console.log('🔔 Buyout webhook received!')
  
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    console.error('❌ No signature in webhook request')
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    console.log(`✅ Webhook verified! Event type: ${event.type}`)
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  // Handle checkout.session.completed for buyout payments
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    console.log('📦 Checkout session completed:', session.id)
    console.log('Customer email:', session.customer_details?.email)
    console.log('Success URL:', session.success_url)
    console.log('Payment link:', session.payment_link)
    console.log('Amount:', session.amount_total)

    // Check if this is a buyout payment
    const buyoutLinkIds = ['28EfZi2FIgWf93Xdsr0co06', '14AdRafsueO70xr3RR0co05']
    
    // Method 1: Check success URL
    const successUrlIsBuyout = session.success_url?.includes('/website-purchased') || false
    
    // Method 2: Check payment link
    let isBuyoutLink = false
    if (session.payment_link) {
      try {
        const paymentLink = await stripe.paymentLinks.retrieve(session.payment_link as string)
        isBuyoutLink = buyoutLinkIds.some(id => paymentLink.url?.includes(id)) || false
        console.log('Payment link URL:', paymentLink.url)
        console.log('Is buyout link:', isBuyoutLink)
      } catch (error) {
        console.log('Could not retrieve payment link:', error)
      }
    }

    // Method 3: Check line items
    let lineItemsIndicateBuyout = false
    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 10 })
      console.log('Line items count:', lineItems.data.length)
      
      lineItemsIndicateBuyout = lineItems.data.some(item => {
        const description = item.description?.toLowerCase() || ''
        const productName = typeof item.price?.product === 'string' 
          ? '' 
          : (item.price?.product as any)?.name?.toLowerCase() || ''
        
        const isBuyout = description.includes('buyout') || 
                        description.includes('own your website') ||
                        description.includes('website') ||
                        productName.includes('buyout') ||
                        productName.includes('website')
        
        if (isBuyout) {
          console.log('Found buyout indicator in line item:', {
            description: item.description,
            productName
          })
        }
        
        return isBuyout
      }) || false
      
      console.log('Line items indicate buyout:', lineItemsIndicateBuyout)
    } catch (error) {
      console.log('Could not retrieve line items:', error)
    }

    // Method 4: Check metadata
    const hasBuyoutMetadata = session.metadata?.type === 'website_buyout' ||
                              session.metadata?.buyout === 'true' ||
                              false

    const isWebsiteBuyout = successUrlIsBuyout || isBuyoutLink || lineItemsIndicateBuyout || hasBuyoutMetadata

    console.log('🔍 Buyout detection results:', {
      successUrlIsBuyout,
      isBuyoutLink,
      lineItemsIndicateBuyout,
      hasBuyoutMetadata,
      isWebsiteBuyout
    })

    if (isWebsiteBuyout) {
      console.log('🎉 WEBSITE BUYOUT DETECTED!')
      
      if (session.customer_details?.email) {
        const customerEmail = session.customer_details.email.trim()
        console.log(`📧 Looking for booking with email: ${customerEmail}`)
        
        try {
          // Find booking with exact email match
          const { data: exactMatch, error: exactError } = await supabase
            .from('bookings')
            .select('id, email, full_name, payment_status, website_owned')
            .eq('email', customerEmail)
            .order('created_at', { ascending: false })

          if (exactError) {
            console.error('❌ Error finding booking:', exactError)
          } else if (exactMatch && exactMatch.length > 0) {
            console.log(`✅ Found ${exactMatch.length} booking(s) for ${customerEmail}`)
            console.log('Bookings:', exactMatch)
            
            // Update the most recent booking
            const bookingToUpdate = exactMatch[0]
            console.log(`🔄 Updating booking ID: ${bookingToUpdate.id}`)
            
            const { data: updatedBooking, error: updateError } = await supabase
              .from('bookings')
              .update({ website_owned: true })
              .eq('id', bookingToUpdate.id)
              .select()

            if (updateError) {
              console.error('❌ Error updating website_owned:', updateError)
              console.error('Update error details:', JSON.stringify(updateError, null, 2))
            } else if (updatedBooking && updatedBooking.length > 0) {
              console.log(`✅✅✅ SUCCESS! Marked website as owned for: ${customerEmail}`)
              console.log(`✅ Updated booking ID: ${updatedBooking[0].id}`)
              console.log(`✅ New website_owned value: ${updatedBooking[0].website_owned}`)
              
              // Fetch full booking data for email
              const { data: fullBooking } = await supabase
                .from('bookings')
                .select('*')
                .eq('id', bookingToUpdate.id)
                .single()

              // Send email notification to alexander.ptboost@gmail.com
              if (fullBooking && process.env.RESEND_API_KEY) {
                try {
                  console.log('📧 Sending buyout notification email to alexander.ptboost@gmail.com')
                  await resend.emails.send({
                    from: 'PTBoost <noreply@ptboost.co.uk>',
                    to: ['alexander.ptboost@gmail.com'],
                    subject: `🚀 Website Buyout Purchase - ${fullBooking.business_name || fullBooking.full_name}`,
                    html: `
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <meta charset="utf-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <style>
                            * {
                              margin: 0;
                              padding: 0;
                              box-sizing: border-box;
                            }
                            body {
                              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                              line-height: 1.6;
                              color: #1a1a1a;
                              background: linear-gradient(135deg, #fef3e7 0%, #fff5e6 50%, #ffe5e5 100%);
                              padding: 20px;
                            }
                            .email-container {
                              max-width: 650px;
                              margin: 0 auto;
                              background: #ffffff;
                              border-radius: 24px;
                              overflow: hidden;
                              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                              background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%);
                              color: white;
                              padding: 50px 40px;
                              text-align: center;
                            }
                            .header h1 {
                              font-size: 32px;
                              font-weight: 800;
                              margin-bottom: 10px;
                            }
                            .content {
                              padding: 40px;
                            }
                            .alert-box {
                              background: #fef3e7;
                              border-left: 4px solid #f97316;
                              padding: 20px;
                              margin: 20px 0;
                              border-radius: 8px;
                            }
                            .info-section {
                              background: #f9fafb;
                              padding: 25px;
                              border-radius: 12px;
                              margin: 20px 0;
                            }
                            .info-row {
                              display: flex;
                              padding: 12px 0;
                              border-bottom: 1px solid #e5e7eb;
                            }
                            .info-row:last-child {
                              border-bottom: none;
                            }
                            .info-label {
                              font-weight: 600;
                              color: #374151;
                              width: 150px;
                              flex-shrink: 0;
                            }
                            .info-value {
                              color: #1f2937;
                              flex: 1;
                            }
                            .cta-button {
                              display: inline-block;
                              background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%);
                              color: white;
                              padding: 16px 32px;
                              border-radius: 12px;
                              text-decoration: none;
                              font-weight: 600;
                              margin: 20px 0;
                              text-align: center;
                            }
                            .footer {
                              background: #f9fafb;
                              padding: 30px 40px;
                              text-align: center;
                              color: #6b7280;
                              font-size: 14px;
                            }
                          </style>
                        </head>
                        <body>
                          <div class="email-container">
                            <div class="header">
                              <h1>🚀 Website Buyout Purchase</h1>
                              <p style="font-size: 18px; opacity: 0.9;">Action Required: Prepare Website Folder</p>
                            </div>
                            <div class="content">
                              <div class="alert-box">
                                <strong>⚠️ Action Required:</strong> A customer has purchased the website buyout. You need to prepare the website folder to give to the user.
                              </div>
                              
                              <div class="info-section">
                                <h2 style="margin-bottom: 20px; color: #1f2937;">Customer Information</h2>
                                
                                <div class="info-row">
                                  <div class="info-label">Name:</div>
                                  <div class="info-value">${fullBooking.full_name || 'N/A'}</div>
                                </div>
                                
                                <div class="info-row">
                                  <div class="info-label">Email:</div>
                                  <div class="info-value"><a href="mailto:${fullBooking.email}">${fullBooking.email || 'N/A'}</a></div>
                                </div>
                                
                                <div class="info-row">
                                  <div class="info-label">Phone:</div>
                                  <div class="info-value">${fullBooking.phone || 'N/A'}</div>
                                </div>
                                
                                <div class="info-row">
                                  <div class="info-label">Business:</div>
                                  <div class="info-value">${fullBooking.business_name || 'N/A'}</div>
                                </div>
                                
                                <div class="info-row">
                                  <div class="info-label">Location:</div>
                                  <div class="info-value">${fullBooking.location || 'N/A'}</div>
                                </div>
                                
                                <div class="info-row">
                                  <div class="info-label">Specialization:</div>
                                  <div class="info-value">${fullBooking.specialization || 'N/A'}</div>
                                </div>
                                
                                ${fullBooking.website_goals ? `
                                <div class="info-row">
                                  <div class="info-label">Website Goals:</div>
                                  <div class="info-value">${fullBooking.website_goals}</div>
                                </div>
                                ` : ''}
                                
                                ${fullBooking.preferred_colors ? `
                                <div class="info-row">
                                  <div class="info-label">Preferred Colors:</div>
                                  <div class="info-value">${fullBooking.preferred_colors}</div>
                                </div>
                                ` : ''}
                                
                                ${fullBooking.additional_notes ? `
                                <div class="info-row">
                                  <div class="info-label">Additional Notes:</div>
                                  <div class="info-value">${fullBooking.additional_notes}</div>
                                </div>
                                ` : ''}
                                
                                <div class="info-row">
                                  <div class="info-label">Booking ID:</div>
                                  <div class="info-value">${fullBooking.id}</div>
                                </div>
                                
                                <div class="info-row">
                                  <div class="info-label">Purchase Date:</div>
                                  <div class="info-value">${new Date(fullBooking.created_at || Date.now()).toLocaleString()}</div>
                                </div>
                              </div>
                              
                              <p style="margin-top: 30px; color: #374151;">
                                <strong>Next Steps:</strong><br>
                                1. Prepare the website folder for this customer<br>
                                2. Contact the customer at <a href="mailto:${fullBooking.email}">${fullBooking.email}</a> to deliver the website files<br>
                                3. The customer can now cancel their subscription and the website will remain live
                              </p>
                            </div>
                            <div class="footer">
                              <p>This is an automated notification from PTBoost</p>
                            </div>
                          </div>
                        </body>
                      </html>
                    `,
                  })
                  console.log('✅ Buyout notification email sent successfully')
                } catch (emailError) {
                  console.error('❌ Failed to send buyout notification email:', emailError)
                  // Don't fail the webhook if email fails
                }
              } else if (!process.env.RESEND_API_KEY) {
                console.warn('⚠️ RESEND_API_KEY not configured - skipping email notification')
              }
              
              // Log important information for the user
              console.log('📋 IMPORTANT: User can cancel subscription and website will remain live')
              console.log('📋 To remove website from PTBoost servers, email: alexander.ptboost@gmail.com')
            } else {
              console.warn(`⚠️ Update returned no results for booking ID: ${bookingToUpdate.id}`)
            }
          } else {
            console.warn(`⚠️ No booking found for email: ${customerEmail}`)
            console.warn('This might mean:')
            console.warn('  1. The email in Stripe does not match any booking in the database')
            console.warn('  2. The booking was created with a different email address')
            console.warn('  3. The booking does not exist yet')
          }
        } catch (error) {
          console.error('❌ Error in buyout processing:', error)
          console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
        }
      } else {
        console.warn('⚠️ No customer email found in session')
      }
    } else {
      console.log('ℹ️ Not a buyout payment - skipping')
    }
  }

  // Handle charge.succeeded as fallback
  if (event.type === 'charge.succeeded') {
    const charge = event.data.object as Stripe.Charge
    console.log('💳 Charge succeeded:', charge.id)
    console.log('Charge email:', charge.billing_details?.email)
    
    // Check if we can get checkout session from payment intent
    if (charge.payment_intent) {
      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(charge.payment_intent as string)
        
        // Try to find checkout session in metadata
        const checkoutSessionId = paymentIntent.metadata?.checkout_session_id || 
                                  paymentIntent.metadata?.checkout_session
        
        if (checkoutSessionId) {
          const session = await stripe.checkout.sessions.retrieve(checkoutSessionId as string)
          
          if (session.success_url?.includes('/website-purchased')) {
            console.log('🎉 Website buyout detected from charge.succeeded!')
            
            if (charge.billing_details?.email) {
              const customerEmail = charge.billing_details.email.trim()
              const { data: booking } = await supabase
                .from('bookings')
                .select('id')
                .eq('email', customerEmail)
                .order('created_at', { ascending: false })
                .limit(1)
                .single()

              if (booking) {
                await supabase
                  .from('bookings')
                  .update({ website_owned: true })
                  .eq('id', booking.id)
                
                console.log(`✅ Marked website as owned for: ${customerEmail}`)
                
                // Fetch full booking data and send email notification
                const { data: fullBooking } = await supabase
                  .from('bookings')
                  .select('*')
                  .eq('id', booking.id)
                  .single()

                // Send email notification to alexander.ptboost@gmail.com
                if (fullBooking && process.env.RESEND_API_KEY) {
                  try {
                    console.log('📧 Sending buyout notification email to alexander.ptboost@gmail.com')
                    await resend.emails.send({
                      from: 'PTBoost <noreply@ptboost.co.uk>',
                      to: ['alexander.ptboost@gmail.com'],
                      subject: `🚀 Website Buyout Purchase - ${fullBooking.business_name || fullBooking.full_name}`,
                      html: `
                        <!DOCTYPE html>
                        <html>
                          <head>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <style>
                              * {
                                margin: 0;
                                padding: 0;
                                box-sizing: border-box;
                              }
                              body {
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                                line-height: 1.6;
                                color: #1a1a1a;
                                background: linear-gradient(135deg, #fef3e7 0%, #fff5e6 50%, #ffe5e5 100%);
                                padding: 20px;
                              }
                              .email-container {
                                max-width: 650px;
                                margin: 0 auto;
                                background: #ffffff;
                                border-radius: 24px;
                                overflow: hidden;
                                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
                              }
                              .header {
                                background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%);
                                color: white;
                                padding: 50px 40px;
                                text-align: center;
                              }
                              .header h1 {
                                font-size: 32px;
                                font-weight: 800;
                                margin-bottom: 10px;
                              }
                              .content {
                                padding: 40px;
                              }
                              .alert-box {
                                background: #fef3e7;
                                border-left: 4px solid #f97316;
                                padding: 20px;
                                margin: 20px 0;
                                border-radius: 8px;
                              }
                              .info-section {
                                background: #f9fafb;
                                padding: 25px;
                                border-radius: 12px;
                                margin: 20px 0;
                              }
                              .info-row {
                                display: flex;
                                padding: 12px 0;
                                border-bottom: 1px solid #e5e7eb;
                              }
                              .info-row:last-child {
                                border-bottom: none;
                              }
                              .info-label {
                                font-weight: 600;
                                color: #374151;
                                width: 150px;
                                flex-shrink: 0;
                              }
                              .info-value {
                                color: #1f2937;
                                flex: 1;
                              }
                              .footer {
                                background: #f9fafb;
                                padding: 30px 40px;
                                text-align: center;
                                color: #6b7280;
                                font-size: 14px;
                              }
                            </style>
                          </head>
                          <body>
                            <div class="email-container">
                              <div class="header">
                                <h1>🚀 Website Buyout Purchase</h1>
                                <p style="font-size: 18px; opacity: 0.9;">Action Required: Prepare Website Folder</p>
                              </div>
                              <div class="content">
                                <div class="alert-box">
                                  <strong>⚠️ Action Required:</strong> A customer has purchased the website buyout. You need to prepare the website folder to give to the user.
                                </div>
                                
                                <div class="info-section">
                                  <h2 style="margin-bottom: 20px; color: #1f2937;">Customer Information</h2>
                                  
                                  <div class="info-row">
                                    <div class="info-label">Name:</div>
                                    <div class="info-value">${fullBooking.full_name || 'N/A'}</div>
                                  </div>
                                  
                                  <div class="info-row">
                                    <div class="info-label">Email:</div>
                                    <div class="info-value"><a href="mailto:${fullBooking.email}">${fullBooking.email || 'N/A'}</a></div>
                                  </div>
                                  
                                  <div class="info-row">
                                    <div class="info-label">Phone:</div>
                                    <div class="info-value">${fullBooking.phone || 'N/A'}</div>
                                  </div>
                                  
                                  <div class="info-row">
                                    <div class="info-label">Business:</div>
                                    <div class="info-value">${fullBooking.business_name || 'N/A'}</div>
                                  </div>
                                  
                                  <div class="info-row">
                                    <div class="info-label">Location:</div>
                                    <div class="info-value">${fullBooking.location || 'N/A'}</div>
                                  </div>
                                  
                                  <div class="info-row">
                                    <div class="info-label">Specialization:</div>
                                    <div class="info-value">${fullBooking.specialization || 'N/A'}</div>
                                  </div>
                                  
                                  ${fullBooking.website_goals ? `
                                  <div class="info-row">
                                    <div class="info-label">Website Goals:</div>
                                    <div class="info-value">${fullBooking.website_goals}</div>
                                  </div>
                                  ` : ''}
                                  
                                  ${fullBooking.preferred_colors ? `
                                  <div class="info-row">
                                    <div class="info-label">Preferred Colors:</div>
                                    <div class="info-value">${fullBooking.preferred_colors}</div>
                                  </div>
                                  ` : ''}
                                  
                                  ${fullBooking.additional_notes ? `
                                  <div class="info-row">
                                    <div class="info-label">Additional Notes:</div>
                                    <div class="info-value">${fullBooking.additional_notes}</div>
                                  </div>
                                  ` : ''}
                                  
                                  <div class="info-row">
                                    <div class="info-label">Booking ID:</div>
                                    <div class="info-value">${fullBooking.id}</div>
                                  </div>
                                  
                                  <div class="info-row">
                                    <div class="info-label">Purchase Date:</div>
                                    <div class="info-value">${new Date(fullBooking.created_at || Date.now()).toLocaleString()}</div>
                                  </div>
                                </div>
                                
                                <p style="margin-top: 30px; color: #374151;">
                                  <strong>Next Steps:</strong><br>
                                  1. Prepare the website folder for this customer<br>
                                  2. Contact the customer at <a href="mailto:${fullBooking.email}">${fullBooking.email}</a> to deliver the website files<br>
                                  3. The customer can now cancel their subscription and the website will remain live
                                </p>
                              </div>
                              <div class="footer">
                                <p>This is an automated notification from PTBoost</p>
                              </div>
                            </div>
                          </body>
                        </html>
                      `,
                    })
                    console.log('✅ Buyout notification email sent successfully')
                  } catch (emailError) {
                    console.error('❌ Failed to send buyout notification email:', emailError)
                    // Don't fail the webhook if email fails
                  }
                } else if (!process.env.RESEND_API_KEY) {
                  console.warn('⚠️ RESEND_API_KEY not configured - skipping email notification')
                }
              }
            }
          }
        }
      } catch (error) {
        console.log('Could not process charge.succeeded:', error)
      }
    }
  }

  return NextResponse.json({ received: true })
}

