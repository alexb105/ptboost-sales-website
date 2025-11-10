// email template: internal alert when a subscription is cancelled (to you)
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
})

const resend = new Resend(process.env.RESEND_API_KEY)

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  console.log('🔔 Webhook received!')
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

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    console.log('Payment successful:', session.id)
    console.log('Customer ID:', session.customer)
    console.log('Customer email:', session.customer_details?.email)
    console.log('Amount total:', session.amount_total)
    console.log('Metadata:', session.metadata)
    console.log('Payment link:', session.payment_link)
    console.log('Mode:', session.mode)
    console.log('Subscription:', session.subscription)

    // Check if this is a website buyout purchase
    // We detect by checking the payment link URL, not the amount (since price can change)
    // Update these IDs if you create new buyout payment links
    const buyoutLinkIds = [
      '28EfZi2FIgWf93Xdsr0co06',  // Current buyout link: https://buy.stripe.com/14AdRafsueO70xr3RR0co05
      '14AdRafsueO70xr3RR0co05'   // Previous buyout link (if any)
    ]
    
    const hasBuyoutMetadata = session.metadata?.type === 'website_buyout' || 
                              session.metadata?.buyout === 'true' ||
                              session.metadata?.purchase_type === 'website_buyout'
    
    // Check payment link URL - this is the primary way to detect buyouts
    let isBuyoutLink = false
    if (session.payment_link) {
      try {
        const paymentLink = await stripe.paymentLinks.retrieve(session.payment_link as string)
        console.log('Payment link URL:', paymentLink.url)
        isBuyoutLink = buyoutLinkIds.some(id => paymentLink.url?.includes(id)) || false
        console.log('Is buyout link:', isBuyoutLink)
      } catch (error) {
        console.log('Could not retrieve payment link:', error)
        // If we can't retrieve the payment link, try checking the payment_link ID directly
        isBuyoutLink = buyoutLinkIds.some(id => session.payment_link?.toString().includes(id)) || false
        console.log('Fallback: Is buyout link (by ID):', isBuyoutLink)
      }
    }

    // Also check if the success URL indicates it's a buyout
    const successUrlIsBuyout = session.success_url?.includes('/website-purchased') || false
    
    // Check if success URL contains the buyout link ID (backup check)
    const successUrlHasBuyoutId = buyoutLinkIds.some(id => 
      session.success_url?.includes(id)
    ) || false

    // Check line items for buyout keywords (product name or description)
    let lineItemsIndicateBuyout = false
    if (session.line_items) {
      try {
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 10 })
        console.log('Line items:', JSON.stringify(lineItems.data, null, 2))
        lineItemsIndicateBuyout = lineItems.data.some(item => {
          const description = item.description?.toLowerCase() || ''
          const productName = item.price?.product ? 
            (typeof item.price.product === 'string' ? item.price.product : (item.price.product as any).name?.toLowerCase() || '') : ''
          return description.includes('buyout') || 
                 description.includes('own your website') ||
                 description.includes('website') ||
                 productName.includes('buyout') ||
                 productName.includes('website')
        }) || false
        console.log('Line items indicate buyout:', lineItemsIndicateBuyout)
      } catch (error) {
        console.log('Could not retrieve line items:', error)
      }
    }

    // Website buyout is detected if:
    // 1. Payment link matches buyout link, OR
    // 2. Success URL is /website-purchased, OR
    // 3. Success URL contains buyout link ID, OR
    // 4. Line items contain buyout keywords, OR
    // 5. Metadata indicates buyout
    const isWebsiteBuyout = isBuyoutLink || successUrlIsBuyout || successUrlHasBuyoutId || lineItemsIndicateBuyout || hasBuyoutMetadata

    console.log('Buyout detection:', {
      hasBuyoutMetadata,
      isBuyoutLink,
      successUrlIsBuyout,
      successUrlHasBuyoutId,
      lineItemsIndicateBuyout,
      isWebsiteBuyout,
      amountTotal: session.amount_total,
      paymentLinkId: session.payment_link,
      successUrl: session.success_url
    })

    if (isWebsiteBuyout) {
      console.log('🎉 Website buyout detected!')
      
      // Mark the customer's booking as website_owned = true
      if (session.customer_details?.email) {
        const customerEmail = session.customer_details.email.trim()
        console.log(`Looking for booking with email: ${customerEmail}`)
        
        try {
          // First, find bookings with this email (try exact match first, then case-insensitive)
          let existingBookings = null
          let fetchError = null
          
          // Try exact match first
          const { data: exactMatch, error: exactError } = await supabase
            .from('bookings')
            .select('id, email, full_name, payment_status, website_owned')
            .eq('email', customerEmail)
            .order('created_at', { ascending: false })

          if (exactMatch && exactMatch.length > 0) {
            existingBookings = exactMatch
            console.log(`Found ${exactMatch.length} bookings with exact email match`)
          } else {
            // Try case-insensitive match using ilike
            const { data: caseInsensitiveMatch, error: caseError } = await supabase
              .from('bookings')
              .select('id, email, full_name, payment_status, website_owned')
              .ilike('email', customerEmail)
              .order('created_at', { ascending: false })
            
            if (caseInsensitiveMatch && caseInsensitiveMatch.length > 0) {
              existingBookings = caseInsensitiveMatch
              console.log(`Found ${caseInsensitiveMatch.length} bookings with case-insensitive email match`)
            } else {
              fetchError = caseError || exactError
            }
          }

          if (fetchError) {
            console.error('Error fetching bookings:', fetchError)
          } else if (existingBookings) {
            console.log(`Found ${existingBookings.length} bookings for ${customerEmail}:`, existingBookings)
          }

          // Update the most recent booking by ID
          if (existingBookings && existingBookings.length > 0) {
            const bookingToUpdate = existingBookings[0]
            console.log(`Updating booking ID: ${bookingToUpdate.id}`)
            
            const { data: updatedBooking, error: updateError } = await supabase
              .from('bookings')
              .update({ website_owned: true })
              .eq('id', bookingToUpdate.id)
              .select()

            if (updateError) {
              console.error('❌ Error marking website as owned:', updateError)
              console.error('Update error details:', JSON.stringify(updateError, null, 2))
            } else if (updatedBooking && updatedBooking.length > 0) {
              console.log(`✅ Marked website as owned for: ${customerEmail}`)
              console.log(`✅ Updated booking ID: ${updatedBooking[0].id}`)
              console.log(`✅ New website_owned value: ${updatedBooking[0].website_owned}`)
            } else {
              console.warn(`⚠️ Update returned no results for booking ID: ${bookingToUpdate.id}`)
            }
          } else {
            console.warn(`⚠️ No booking found for email: ${customerEmail}`)
            console.warn('This might mean:')
            console.warn('  1. The email in Stripe does not match any booking in the database')
            console.warn('  2. The booking was created with a different email address')
            console.warn('  3. The booking does not exist yet')
            console.warn(`  4. Email in database might be: "${customerEmail}" (check for typos)`)
          }
        } catch (error) {
          console.error('❌ Error updating website_owned:', error)
          console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
        }
      } else {
        console.warn('⚠️ No customer email found in session')
        console.warn('Session customer_details:', JSON.stringify(session.customer_details, null, 2))
      }
      
      // Don't decrement capacity for website buyouts (they already have a subscription)
      return NextResponse.json({ received: true })
    }

    // Update the existing booking for this customer
    // Find the most recent pending booking and update it to completed with customer ID
    if (session.customer_details?.email) {
      try {
        const customerEmail = session.customer_details.email.trim()
        console.log(`Looking for booking to update for email: ${customerEmail}`)
        
        // First, find the most recent pending booking for this email
        const { data: pendingBookings, error: fetchError } = await supabase
          .from('bookings')
          .select('id, payment_status, stripe_customer_id')
          .eq('email', customerEmail)
          .eq('payment_status', 'pending')
          .order('created_at', { ascending: false })
          .limit(1)

        if (fetchError) {
          console.error('Error fetching pending booking:', fetchError)
        } else if (pendingBookings && pendingBookings.length > 0) {
          // Found a pending booking - update it to completed with customer ID
          const bookingId = pendingBookings[0].id
          console.log(`Found pending booking ${bookingId}, updating to completed`)
          
          const updateData: any = {
            payment_status: 'completed',
            stripe_session_id: session.id,
            updated_at: new Date().toISOString()
          }
          
          // Add customer ID if available
          if (session.customer) {
            updateData.stripe_customer_id = session.customer as string
          }
          
          const { error: updateError } = await supabase
            .from('bookings')
            .update(updateData)
            .eq('id', bookingId)

          if (updateError) {
            console.error('Error updating booking to completed:', updateError)
          } else {
            console.log(`✅ Updated booking ${bookingId} to completed with customer ID`)
          }
        } else {
          // No pending booking found - check if there's a completed one that needs customer ID
          console.log('No pending booking found, checking for completed booking that needs customer ID')
          
          if (session.customer) {
            const { data: completedBookings } = await supabase
              .from('bookings')
              .select('id')
              .eq('email', customerEmail)
              .eq('payment_status', 'completed')
              .is('stripe_customer_id', null)
              .order('created_at', { ascending: false })
              .limit(1)

            if (completedBookings && completedBookings.length > 0) {
              const bookingId = completedBookings[0].id
              console.log(`Found completed booking ${bookingId} without customer ID, updating`)
              
              const { error: updateError } = await supabase
                .from('bookings')
                .update({
                  stripe_customer_id: session.customer as string,
                  stripe_session_id: session.id,
                  updated_at: new Date().toISOString()
                })
                .eq('id', bookingId)

              if (updateError) {
                console.error('Error updating customer ID for completed booking:', updateError)
              } else {
                console.log(`✅ Updated customer ID for booking ${bookingId}`)
              }
            } else {
              console.warn(`⚠️ No booking found for email: ${customerEmail}`)
              console.warn('This might mean the booking was created with a different email or does not exist yet')
            }
          }
        }
      } catch (error) {
        console.error('Error updating booking:', error)
      }
    }

    // Decrement capacity count (only for successful checkouts)
    try {
      const { data: currentData, error: fetchError } = await supabase
        .from('capacity_status')
        .select('capacity_count')
        .single()

      if (fetchError) {
        console.error('Error fetching capacity:', fetchError)
      } else {
        const newCapacity = Math.max(0, currentData.capacity_count - 1)

        const { error: updateError } = await supabase
          .from('capacity_status')
          .update({
            capacity_count: newCapacity,
            updated_at: new Date().toISOString()
          })
          .eq('id', 1)

        if (updateError) {
          console.error('Error updating capacity:', updateError)
        } else {
          console.log(`Capacity decremented from ${currentData.capacity_count} to ${newCapacity}`)
        }
      }
    } catch (error) {
      console.error('Error handling capacity decrement:', error)
      // Don't fail the webhook if capacity update fails
    }
  }

  // Handle subscription created event (for Payment Links that create subscriptions)
  if (event.type === 'customer.subscription.created') {
    const subscription = event.data.object as Stripe.Subscription
    console.log('Subscription created:', subscription.id)
    console.log('Customer ID:', subscription.customer)

    // Try to find and update existing booking with this customer ID
    if (subscription.customer) {
      try {
        // Get customer details to find by email
        const customer = await stripe.customers.retrieve(subscription.customer as string)
        if (customer && !customer.deleted && 'email' in customer && customer.email) {
          const customerEmail = customer.email.trim()
          
          // Find the most recent booking for this email (pending or completed)
          const { data: bookings } = await supabase
            .from('bookings')
            .select('id, stripe_customer_id')
            .eq('email', customerEmail)
            .order('created_at', { ascending: false })
            .limit(1)

          if (bookings && bookings.length > 0) {
            const bookingId = bookings[0].id
            
            // Only update if customer ID is missing
            if (!bookings[0].stripe_customer_id) {
              const { error: updateError } = await supabase
                .from('bookings')
                .update({
                  stripe_customer_id: subscription.customer as string,
                  updated_at: new Date().toISOString()
                })
                .eq('id', bookingId)

              if (updateError) {
                console.error('Error updating customer ID from subscription:', updateError)
              } else {
                console.log(`✅ Updated customer ID ${subscription.customer} for booking ${bookingId} (${customerEmail})`)
              }
            } else {
              console.log(`Booking ${bookingId} already has customer ID, skipping update`)
            }
          } else {
            console.warn(`⚠️ No booking found for email: ${customerEmail} when processing subscription.created`)
          }
        }
      } catch (error) {
        console.error('Error handling subscription created:', error)
      }
    }
  }

  // Handle charge.succeeded events (for payment links that don't trigger checkout.session.completed)
  if (event.type === 'charge.succeeded') {
    const charge = event.data.object as Stripe.Charge
    console.log('Charge succeeded:', charge.id)
    console.log('Charge amount:', charge.amount)
    console.log('Charge email:', charge.billing_details?.email)
    console.log('Payment intent:', charge.payment_intent)

    // Try to get the checkout session from the payment intent
    if (charge.payment_intent) {
      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(charge.payment_intent as string)
        console.log('Payment intent metadata:', paymentIntent.metadata)
        console.log('Payment intent description:', paymentIntent.description)

        // Check if this is a buyout by checking metadata or description
        const hasBuyoutMetadata = paymentIntent.metadata?.type === 'website_buyout' ||
                                  paymentIntent.metadata?.buyout === 'true' ||
                                  paymentIntent.description?.toLowerCase().includes('buyout') ||
                                  paymentIntent.description?.toLowerCase().includes('own your website') ||
                                  false

        // Also check if we can get the checkout session
        let checkoutSessionId = paymentIntent.metadata?.checkout_session_id
        if (!checkoutSessionId && typeof paymentIntent.metadata?.checkout_session === 'string') {
          checkoutSessionId = paymentIntent.metadata.checkout_session
        }

        if (checkoutSessionId) {
          try {
            const session = await stripe.checkout.sessions.retrieve(checkoutSessionId)
            console.log('Found checkout session:', session.id)
            console.log('Session success URL:', session.success_url)
            
            // Check if success URL indicates buyout
            const successUrlIsBuyout = session.success_url?.includes('/website-purchased') || false
            
            if (successUrlIsBuyout || hasBuyoutMetadata) {
              console.log('🎉 Website buyout detected from charge.succeeded!')
              
              // Update database
              if (charge.billing_details?.email) {
                const customerEmail = charge.billing_details.email.trim()
                console.log(`Looking for booking with email: ${customerEmail}`)
                
                // Find and update booking (same logic as checkout.session.completed)
                const { data: exactMatch } = await supabase
                  .from('bookings')
                  .select('id, email, full_name, payment_status, website_owned')
                  .eq('email', customerEmail)
                  .order('created_at', { ascending: false })

                if (exactMatch && exactMatch.length > 0) {
                  const bookingToUpdate = exactMatch[0]
                  const { data: updatedBooking, error: updateError } = await supabase
                    .from('bookings')
                    .update({ website_owned: true })
                    .eq('id', bookingToUpdate.id)
                    .select()

                  if (updateError) {
                    console.error('❌ Error marking website as owned:', updateError)
                  } else if (updatedBooking && updatedBooking.length > 0) {
                    console.log(`✅ Marked website as owned for: ${customerEmail}`)
                    console.log(`✅ Updated booking ID: ${updatedBooking[0].id}`)
                  }
                } else {
                  console.warn(`⚠️ No booking found for email: ${customerEmail}`)
                }
              }
            }
          } catch (error) {
            console.log('Could not retrieve checkout session:', error)
          }
        } else if (hasBuyoutMetadata) {
          // If we have buyout metadata but no checkout session, still try to update
          console.log('🎉 Website buyout detected from payment intent metadata!')
          
          if (charge.billing_details?.email) {
            const customerEmail = charge.billing_details.email.trim()
            const { data: exactMatch } = await supabase
              .from('bookings')
              .select('id')
              .eq('email', customerEmail)
              .order('created_at', { ascending: false })
              .limit(1)

            if (exactMatch && exactMatch.length > 0) {
              await supabase
                .from('bookings')
                .update({ website_owned: true })
                .eq('id', exactMatch[0].id)
              
              console.log(`✅ Marked website as owned for: ${customerEmail}`)
            }
          }
        }
      } catch (error) {
        console.error('Error retrieving payment intent:', error)
      }
    }
  }

  // Handle subscription cancellation events
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription
    console.log('Subscription cancelled:', subscription.id)
    console.log('Customer ID:', subscription.customer)

    // Send email notification to alexander.ptboost@gmail.com
    if (subscription.customer && process.env.RESEND_API_KEY) {
      try {
        // Get customer details from Stripe
        const customer = await stripe.customers.retrieve(subscription.customer as string)
        const customerEmail = customer && !customer.deleted && 'email' in customer ? customer.email : null
        const customerName = customer && !customer.deleted && 'name' in customer ? customer.name : null

        // Try to get booking information from database
        let bookingInfo = null
        if (customerEmail) {
          const { data: bookings } = await supabase
            .from('bookings')
            .select('id, full_name, business_name, email, location, specialization')
            .eq('email', customerEmail)
            .order('created_at', { ascending: false })
            .limit(1)
          
          if (bookings && bookings.length > 0) {
            bookingInfo = bookings[0]
          }
        }

        // Send notification email
        await resend.emails.send({
          from: 'PTBoost Notifications <noreply@ptboost.co.uk>',
          to: 'alexander.ptboost@gmail.com',
          subject: '⚠️ Subscription Cancelled - Customer Notification',
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
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
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
                    background: linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #f97316 100%);
                    color: white;
                    padding: 50px 40px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                  }
                  .header::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -20%;
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
                    border-radius: 50%;
                  }
                  .header-content {
                    position: relative;
                    z-index: 1;
                  }
                  .header h1 {
                    font-size: 36px;
                    font-weight: 900;
                    margin: 0 0 15px 0;
                    letter-spacing: -0.5px;
                    text-shadow: 0 2px 10px rgba(0,0,0,0.1);
                  }
                  .header p {
                    font-size: 20px;
                    font-weight: 600;
                    margin: 0;
                    opacity: 0.95;
                  }
                  .content {
                    padding: 40px;
                    background: #ffffff;
                  }
                  .alert-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%);
                    color: white;
                    padding: 12px 24px;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 14px;
                    margin-bottom: 30px;
                    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
                  }
                  .section {
                    background: #ffffff;
                    padding: 30px;
                    border-radius: 16px;
                    margin-bottom: 25px;
                    border: 2px solid #f3f4f6;
                  }
                  .section-title {
                    font-size: 20px;
                    font-weight: 800;
                    color: #1a1a1a;
                    margin: 0 0 20px 0;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                  }
                  .section-title::before {
                    content: '';
                    width: 4px;
                    height: 24px;
                    background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%);
                    border-radius: 2px;
                  }
                  .details-grid {
                    display: grid;
                    gap: 15px;
                    margin-top: 20px;
                  }
                  .detail-item {
                    padding: 18px;
                    background: #f9fafb;
                    border-radius: 12px;
                    border-left: 4px solid #dc2626;
                  }
                  .detail-label {
                    font-size: 12px;
                    font-weight: 700;
                    color: #6b7280;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 8px;
                  }
                  .detail-value {
                    font-size: 16px;
                    font-weight: 600;
                    color: #1a1a1a;
                    word-break: break-word;
                  }
                  .detail-value a {
                    color: #dc2626;
                    text-decoration: none;
                    font-weight: 700;
                  }
                  .detail-value a:hover {
                    text-decoration: underline;
                  }
                  .footer {
                    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                    color: white;
                    padding: 40px;
                    text-align: center;
                  }
                  .footer-brand {
                    font-size: 24px;
                    font-weight: 900;
                    background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 10px;
                  }
                  .footer-text {
                    font-size: 15px;
                    color: #d1d5db;
                    margin: 10px 0 0 0;
                    line-height: 1.6;
                  }
                  @media only screen and (max-width: 600px) {
                    .email-container {
                      border-radius: 0;
                    }
                    .header {
                      padding: 40px 30px;
                    }
                    .header h1 {
                      font-size: 28px;
                    }
                    .header p {
                      font-size: 18px;
                    }
                    .content {
                      padding: 30px 25px;
                    }
                  }
                </style>
              </head>
              <body>
                <div class="email-container">
                  <div class="header">
                    <div class="header-content">
                      <h1>⚠️ Subscription Cancelled</h1>
                      <p>A customer has cancelled their subscription</p>
                    </div>
                  </div>
                  
                  <div class="content">
                    <div class="alert-badge">
                      ⚡ Action Required
                    </div>

                    <div class="section">
                      <h2 class="section-title">📋 Subscription Details</h2>
                      <div class="details-grid">
                        <div class="detail-item">
                          <div class="detail-label">Subscription ID</div>
                          <div class="detail-value">${subscription.id}</div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-label">Customer ID</div>
                          <div class="detail-value">${subscription.customer}</div>
                        </div>
                        <div class="detail-item">
                          <div class="detail-label">Cancelled At</div>
                          <div class="detail-value">${new Date(subscription.canceled_at ? subscription.canceled_at * 1000 : Date.now()).toLocaleString()}</div>
                        </div>
                        ${'current_period_end' in subscription && (subscription as any).current_period_end ? `
                        <div class="detail-item">
                          <div class="detail-label">Access Until</div>
                          <div class="detail-value">${new Date((subscription as any).current_period_end * 1000).toLocaleString()}</div>
                        </div>
                        ` : ''}
                      </div>
                    </div>

                    ${customerEmail ? `
                    <div class="section">
                      <h2 class="section-title">👤 Customer Information</h2>
                      <div class="details-grid">
                        <div class="detail-item">
                          <div class="detail-label">Email</div>
                          <div class="detail-value"><a href="mailto:${customerEmail}">${customerEmail}</a></div>
                        </div>
                        ${customerName ? `
                        <div class="detail-item">
                          <div class="detail-label">Name (from Stripe)</div>
                          <div class="detail-value">${customerName}</div>
                        </div>
                        ` : ''}
                      </div>
                    </div>
                    ` : ''}

                    ${bookingInfo ? `
                    <div class="section">
                      <h2 class="section-title">📝 Booking Information</h2>
                      <div class="details-grid">
                        ${bookingInfo.full_name ? `
                        <div class="detail-item">
                          <div class="detail-label">Full Name</div>
                          <div class="detail-value">${bookingInfo.full_name}</div>
                        </div>
                        ` : ''}
                        ${bookingInfo.business_name ? `
                        <div class="detail-item">
                          <div class="detail-label">Business Name</div>
                          <div class="detail-value">${bookingInfo.business_name}</div>
                        </div>
                        ` : ''}
                        ${bookingInfo.location ? `
                        <div class="detail-item">
                          <div class="detail-label">Location</div>
                          <div class="detail-value">${bookingInfo.location}</div>
                        </div>
                        ` : ''}
                        ${bookingInfo.specialization ? `
                        <div class="detail-item">
                          <div class="detail-label">Specialization</div>
                          <div class="detail-value">${bookingInfo.specialization}</div>
                        </div>
                        ` : ''}
                        <div class="detail-item">
                          <div class="detail-label">Booking ID</div>
                          <div class="detail-value">${bookingInfo.id}</div>
                        </div>
                      </div>
                    </div>
                    ` : ''}
                  </div>

                  <div class="footer">
                    <div class="footer-brand">PTBoost</div>
                    <p class="footer-text">
                      This is an automated notification from your PTBoost system.
                    </p>
                  </div>
                </div>
              </body>
            </html>
          `,
        })
        console.log(`✅ Subscription cancellation notification email sent to alexander.ptboost@gmail.com for subscription: ${subscription.id}`)
      } catch (emailError) {
        console.error('Error sending subscription cancellation notification email:', emailError)
        // Don't fail the webhook if email fails
      }
    }

    // Optional: Update your database to mark subscription as cancelled
    // You could add a subscription_status column and update it here
  }

  // Log unhandled event types for debugging
  if (event.type !== 'checkout.session.completed' && 
      event.type !== 'charge.succeeded' &&
      event.type !== 'customer.subscription.created' &&
      event.type !== 'customer.subscription.deleted') {
    console.log(`ℹ️ Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

