import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Fetch payment links
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('payment_links')
      .select('*')
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { 
          error: 'Failed to fetch payment links',
          subscriptionLink: '',
          resubscriptionLink: '',
          buyoutLink: ''
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      subscriptionLink: data.subscription_link || '',
      resubscriptionLink: data.resubscription_link || '',
      buyoutLink: data.buyout_link || '',
      updatedAt: data.updated_at
    })
  } catch (error) {
    console.error('Error fetching payment links:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch payment links',
        subscriptionLink: '',
        resubscriptionLink: '',
        buyoutLink: ''
      },
      { status: 500 }
    )
  }
}

// POST - Update payment links (for admin use)
export async function POST(request: Request) {
  try {
    const { subscriptionLink, resubscriptionLink, buyoutLink, adminPassword } = await request.json()

    // Simple password protection for admin endpoint
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Validate URLs
    if (subscriptionLink && !isValidStripeUrl(subscriptionLink)) {
      return NextResponse.json(
        { error: 'Invalid subscription link URL. Must be a Stripe payment link.' },
        { status: 400 }
      )
    }

    if (resubscriptionLink && !isValidStripeUrl(resubscriptionLink)) {
      return NextResponse.json(
        { error: 'Invalid resubscription link URL. Must be a Stripe payment link.' },
        { status: 400 }
      )
    }

    if (buyoutLink && !isValidStripeUrl(buyoutLink)) {
      return NextResponse.json(
        { error: 'Invalid buyout link URL. Must be a Stripe payment link.' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('payment_links')
      .update({ 
        subscription_link: subscriptionLink || null,
        resubscription_link: resubscriptionLink || null,
        buyout_link: buyoutLink || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', 1)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to update payment links' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      subscriptionLink: data.subscription_link,
      resubscriptionLink: data.resubscription_link,
      buyoutLink: data.buyout_link,
      updatedAt: data.updated_at
    })
  } catch (error) {
    console.error('Error updating payment links:', error)
    return NextResponse.json(
      { error: 'Failed to update payment links' },
      { status: 500 }
    )
  }
}

// Helper function to validate Stripe payment link URLs
function isValidStripeUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false
  // Stripe payment links typically look like: https://buy.stripe.com/...
  const stripePattern = /^https:\/\/buy\.stripe\.com\/[a-zA-Z0-9]+$/
  return stripePattern.test(url.trim())
}

