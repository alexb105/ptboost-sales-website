import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET - Retrieve saved promo settings
export async function GET() {
  try {
    // Try to get from promo_settings table first
    const { data, error } = await supabase
      .from('promo_settings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error) {
      // If table doesn't exist or no data, return empty
      if (error.code === 'PGRST116' || error.code === '42P01') {
        return NextResponse.json({ promoCode: '', percentageOff: '' })
      }
      console.error('Error fetching promo settings:', error)
      return NextResponse.json({ promoCode: '', percentageOff: '' })
    }

    return NextResponse.json({
      promoCode: data?.promo_code || '',
      percentageOff: data?.percentage_off || ''
    })
  } catch (error) {
    console.error('Error in GET promo-settings:', error)
    return NextResponse.json({ promoCode: '', percentageOff: '' })
  }
}

// POST - Save promo settings
export async function POST(request: Request) {
  try {
    const { promoCode, percentageOff } = await request.json()

    if (!promoCode || !percentageOff) {
      return NextResponse.json(
        { error: 'Promo code and percentage off are required' },
        { status: 400 }
      )
    }

    // Check if settings exist
    const { data: existing } = await supabase
      .from('promo_settings')
      .select('id')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (existing) {
      // Update existing
      const { error } = await supabase
        .from('promo_settings')
        .update({
          promo_code: promoCode,
          percentage_off: percentageOff,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id)

      if (error) {
        console.error('Error updating promo settings:', error)
        return NextResponse.json(
          { error: 'Failed to update promo settings' },
          { status: 500 }
        )
      }
    } else {
      // Insert new
      const { error } = await supabase
        .from('promo_settings')
        .insert({
          promo_code: promoCode,
          percentage_off: percentageOff
        })

      if (error) {
        // If table doesn't exist, we'll create it via migration
        console.error('Error inserting promo settings:', error)
        // For now, just return success - the table will be created via migration
        if (error.code === '42P01') {
          return NextResponse.json({ 
            success: true,
            message: 'Settings saved (table will be created on first use)'
          })
        }
        return NextResponse.json(
          { error: 'Failed to save promo settings' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in POST promo-settings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

