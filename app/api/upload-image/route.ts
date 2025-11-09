import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file size (5MB limit)
    const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit` },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `bookings/temp/${fileName}`

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('order-images')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      console.error('Error uploading to Supabase Storage:', error)
      
      // Provide more specific error messages
      if (error.message?.includes('Bucket not found') || error.message?.includes('does not exist')) {
        return NextResponse.json(
          { 
            error: 'Storage bucket not configured. Please create the "order-images" bucket in Supabase Storage.',
            details: error.message
          },
          { status: 500 }
        )
      }
      
      if (error.message?.includes('new row violates row-level security policy')) {
        return NextResponse.json(
          { 
            error: 'Storage bucket policies not configured. Please set up anonymous upload policies.',
            details: error.message
          },
          { status: 500 }
        )
      }
      
      return NextResponse.json(
        { 
          error: 'Failed to upload image',
          details: error.message || 'Unknown error'
        },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('order-images')
      .getPublicUrl(filePath)

    return NextResponse.json({ 
      url: urlData.publicUrl,
      path: filePath
    })
  } catch (error) {
    console.error('Error in upload-image:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { 
        error: 'Failed to upload image',
        details: errorMessage
      },
      { status: 500 }
    )
  }
}

