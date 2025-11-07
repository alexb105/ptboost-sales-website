import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    console.log('Payment successful:', session.id)

    // Decrement capacity count
    try {
      // First, get the current capacity
      const { data: currentData, error: fetchError } = await supabase
        .from('capacity_status')
        .select('capacity_count')
        .single()

      if (fetchError) {
        console.error('Error fetching capacity:', fetchError)
        return NextResponse.json(
          { error: 'Failed to fetch capacity' },
          { status: 500 }
        )
      }

      const newCapacity = Math.max(0, currentData.capacity_count - 1)

      // Update the capacity
      const { error: updateError } = await supabase
        .from('capacity_status')
        .update({
          capacity_count: newCapacity,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1)

      if (updateError) {
        console.error('Error updating capacity:', updateError)
        return NextResponse.json(
          { error: 'Failed to update capacity' },
          { status: 500 }
        )
      }

      console.log(`Capacity decremented from ${currentData.capacity_count} to ${newCapacity}`)
    } catch (error) {
      console.error('Error handling capacity decrement:', error)
      // Don't fail the webhook if capacity update fails
      // The payment still went through
    }
  }

  return NextResponse.json({ received: true })
}

