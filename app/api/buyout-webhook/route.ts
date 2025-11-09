import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

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

