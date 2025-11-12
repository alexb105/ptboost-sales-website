// Supabase database types

export interface BookingData {
  id?: string
  created_at?: string
  full_name: string
  email: string
  phone: string
  business_name: string
  location: string
  specialization: string
  preferred_colors: string
  website_goals: string
  additional_notes: string
  images?: string[] // Array of image URLs
  payment_status: 'pending' | 'completed' | 'failed'
  stripe_session_id?: string
  stripe_customer_id?: string
  email_sent?: boolean
  website_owned?: boolean
  subscribed?: boolean // Active subscription status
}

export interface CapacityStatus {
  id: number
  capacity_count: number
  updated_at: string
}

export interface WaitingListEntry {
  id?: string
  created_at?: string
  name: string
  email: string
}

