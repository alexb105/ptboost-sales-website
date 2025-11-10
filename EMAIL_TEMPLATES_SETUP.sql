-- Create email_templates table for storing editable email templates
CREATE TABLE IF NOT EXISTS email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  template_key TEXT UNIQUE NOT NULL,
  template_name TEXT NOT NULL,
  template_type TEXT NOT NULL CHECK (template_type IN ('customer', 'developer')),
  subject TEXT NOT NULL,
  html_content TEXT NOT NULL,
  description TEXT
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_email_templates_key ON email_templates(template_key);
CREATE INDEX IF NOT EXISTS idx_email_templates_type ON email_templates(template_type);

-- Insert default customer email templates
INSERT INTO email_templates (template_key, template_name, template_type, subject, html_content, description) VALUES
('customer_booking_confirmation', 'Order Confirmation', 'customer', '🎉 Your Website Order is Confirmed!', '', 'Sent to customers when payment is completed'),
('customer_waiting_list_notification', 'Waiting List Notification', 'customer', '🎉 Great News! Spots Are Now Available at PTBoost', '', 'Sent to customers when spots open up'),
('customer_pending_followup', 'Pending Order Follow-up', 'customer', '⏰ Complete Your Website Order - Limited Time Offer!', '', 'Sent to customers with pending orders'),
('customer_waiting_list_confirmation', 'Waiting List Confirmation', 'customer', 'You''re on the List! 🎉', '', 'Sent to customers when they sign up for waiting list')
ON CONFLICT (template_key) DO NOTHING;

-- Insert default developer email templates
INSERT INTO email_templates (template_key, template_name, template_type, subject, html_content, description) VALUES
('developer_new_booking', 'New Order Notification', 'developer', 'New Website Order - {businessName}', '', 'Sent to developer when a new order is completed'),
('developer_waiting_list_signup', 'Waiting List Signup Notification', 'developer', '🔔 New Lead: Someone Wants to Be Notified!', '', 'Sent to developer when someone signs up for waiting list'),
('developer_buyout_purchase', 'Buyout Purchase Notification', 'developer', '🚀 Website Buyout Purchase - {businessName}', '', 'Sent to developer when a buyout purchase is made')
ON CONFLICT (template_key) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_email_templates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_email_templates_updated_at
  BEFORE UPDATE ON email_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_email_templates_updated_at();

