# Supabase Waiting List Table Setup

This document explains how to set up the `waiting_list` table in Supabase to store email addresses of people who want to be notified when spots open up.

## Overview

When the website is at full capacity (0 spots available), visitors can enter their email to be notified when spots open up. This table stores those email addresses.

## Create the Waiting List Table

### SQL Editor Setup (Recommended)

1. Go to your Supabase project
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the following SQL:

```sql
-- Create waiting_list table
CREATE TABLE IF NOT EXISTS public.waiting_list (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_waiting_list_email ON public.waiting_list(email);
CREATE INDEX IF NOT EXISTS idx_waiting_list_created_at ON public.waiting_list(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.waiting_list ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for the notify form)
CREATE POLICY "Allow anonymous inserts" ON public.waiting_list
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow reads (for admin dashboard)
CREATE POLICY "Allow anonymous reads" ON public.waiting_list
  FOR SELECT
  TO anon
  USING (true);
```

5. Click **Run** to execute the query
6. You should see "Success. No rows returned" - this is correct!

## Table Structure

### Fields

- `id` (UUID, Primary Key): Auto-generated unique identifier
- `created_at` (Timestamp with timezone): When the entry was created (auto-set)
- `name` (Text, Not Null): First name of the person wanting to be notified
- `email` (Text, Unique, Not Null): Email address of the person wanting to be notified

### Indexes

- `idx_waiting_list_email`: For fast email lookups
- `idx_waiting_list_created_at`: For sorting by date (newest first)

## How It Works

1. When capacity reaches 0, the booking button is replaced with a "Get Notified" form
2. Visitors go through a 2-step form:
   - Step 1: Enter their first name
   - Step 2: Enter their email address
3. The name and email are saved to the `waiting_list` table in Supabase
4. Personalized email notifications are sent to both the visitor and the business owner
5. The admin dashboard shows all waiting list entries with names and emails

## Viewing Waiting List in Admin Dashboard

The admin dashboard at `/admin` now includes a "Waiting List" tab that shows:
- Names of people on the waiting list
- Their email addresses (click-to-email)
- When each person signed up
- Total count of people waiting

You can refresh the list at any time using the "Refresh" button in the panel.

## Manually Contacting Waiting List

To reach out to people on the waiting list:

1. Log into the admin dashboard
2. View the "Waiting List" panel
3. Click on any email address to open your default email client
4. Send them a personal notification about available spots

## Notes

- Email addresses must be unique (duplicates are automatically prevented)
- The table uses Row Level Security (RLS) for security
- Anonymous users can insert and read (needed for the public website)
- You may want to periodically clean out old entries after contacting them

