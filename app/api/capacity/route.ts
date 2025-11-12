import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Helper function to decrement capacity by 1
export async function decrementCapacity(): Promise<{ success: boolean; error?: string }> {
  try {
    // Get current capacity
    const { data: currentData, error: fetchError } = await supabase
      .from('capacity_status')
      .select('capacity_count')
      .eq('id', 1)
      .single()

    if (fetchError || !currentData) {
      console.error('Error fetching current capacity:', fetchError)
      return { success: false, error: 'Failed to fetch current capacity' }
    }

    const newCapacity = Math.max(0, currentData.capacity_count - 1)

    // Update capacity
    const { error: updateError } = await supabase
      .from('capacity_status')
      .update({
        capacity_count: newCapacity,
        updated_at: new Date().toISOString(),
      })
      .eq('id', 1)

    if (updateError) {
      console.error('Error decrementing capacity:', updateError)
      return { success: false, error: 'Failed to decrement capacity' }
    }

    console.log(`✅ Capacity decremented: ${currentData.capacity_count} → ${newCapacity}`)
    return { success: true }
  } catch (error) {
    console.error('Error in decrementCapacity:', error)
    return { success: false, error: 'Failed to decrement capacity' }
  }
}

// GET - Fetch capacity status
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('capacity_status')
      .select('*')
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch capacity status', capacityCount: 0 },
        { status: 500 }
      )
    }

    return NextResponse.json({
      capacityCount: data.capacity_count,
      isAtCapacity: data.capacity_count <= 0,
      updatedAt: data.updated_at
    })
  } catch (error) {
    console.error('Error fetching capacity:', error)
    return NextResponse.json(
      { error: 'Failed to fetch capacity status', capacityCount: 0 },
      { status: 500 }
    )
  }
}

// POST - Update capacity count (for admin use)
export async function POST(request: Request) {
  try {
    const { capacityCount, adminPassword } = await request.json()

    // Simple password protection for admin endpoint
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Validate capacity count
    if (typeof capacityCount !== 'number' || capacityCount < 0) {
      return NextResponse.json(
        { error: 'Invalid capacity count' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('capacity_status')
      .update({ 
        capacity_count: capacityCount,
        updated_at: new Date().toISOString()
      })
      .eq('id', 1)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to update capacity count' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      capacityCount: data.capacity_count,
      isAtCapacity: data.capacity_count <= 0,
      updatedAt: data.updated_at
    })
  } catch (error) {
    console.error('Error updating capacity:', error)
    return NextResponse.json(
      { error: 'Failed to update capacity count' },
      { status: 500 }
    )
  }
}

