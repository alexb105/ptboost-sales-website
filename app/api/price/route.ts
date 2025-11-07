import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'your-secure-password'

export async function GET() {
  try {
    // Get price from settings table
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'package_price')
      .single()

    if (error) {
      // If setting doesn't exist, return default price
      if (error.code === 'PGRST116') {
        return NextResponse.json({ price: 2997 })
      }
      throw error
    }

    const price = parseFloat(data.value)
    return NextResponse.json({ price })
  } catch (error) {
    console.error('Error fetching price:', error)
    return NextResponse.json(
      { error: 'Failed to fetch price' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { price, adminPassword } = await request.json()

    // Verify admin password
    if (adminPassword !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!price || price <= 0) {
      return NextResponse.json(
        { error: 'Invalid price' },
        { status: 400 }
      )
    }

    // Update or insert price in settings table
    const { error } = await supabase
      .from('settings')
      .upsert({
        key: 'package_price',
        value: price.toString(),
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'key'
      })

    if (error) {
      console.error('Error updating price:', error)
      throw error
    }

    return NextResponse.json({ 
      price,
      success: true 
    })
  } catch (error) {
    console.error('Error in price update:', error)
    return NextResponse.json(
      { error: 'Failed to update price' },
      { status: 500 }
    )
  }
}

