# Email Template Variables Reference

This document lists all available dynamic variables for each email template. Use these variables in your email templates by wrapping them in curly braces, e.g., `{fullName}`, `{businessName}`.

## Special Variables

These variables are available in **all** templates:

- **`{siteUrl}`** - The base URL of the website (e.g., `https://ptboost.co.uk`). Automatically removes trailing slashes.

## Conditional Variables

You can use conditional rendering for optional variables:

```
{if_preferredColors}
  <div>Preferred Colors: {preferredColors}</div>
{/if_preferredColors}
```

The content between `{if_variableName}` and `{/if_variableName}` will only be included if the variable has a value.

---

## Customer Email Templates

### 1. Booking Confirmation (`customer_booking_confirmation`)

**Description:** Sent to customers when payment is completed.

**Available Variables:**
- `{fullName}` - Customer's full name
- `{email}` - Customer's email address
- `{businessName}` - Business/studio name
- `{location}` - Business location
- `{specialization}` - Training specialization
- `{preferredColors}` - Preferred color scheme (optional)
- `{websiteGoals}` - Website goals/requirements (optional)
- `{additionalNotes}` - Additional notes from customer (optional)
- `{subscriptionPassword}` - Password for managing subscription
- `{sessionId}` - Stripe session ID (optional)
- `{siteUrl}` - Base website URL

**Example Usage:**
```
Hi {fullName},

Your order for {businessName} has been confirmed!

Location: {location}
Specialization: {specialization}

{if_preferredColors}
Preferred Colors: {preferredColors}
{/if_preferredColors}

Your subscription password: {subscriptionPassword}
```

---

### 2. Waiting List Notification (`customer_waiting_list_notification`)

**Description:** Sent to customers on the waiting list when spots become available.

**Available Variables:**
- `{name}` - Customer's name
- `{websiteLink}` - Link to the website CTA section (hardcoded to `https://ptboost.co.uk/#cta`)
- `{siteUrl}` - Base website URL

**Example Usage:**
```
Hi {name} 👋

Great news! A spot just became available.

<a href="{websiteLink}">Claim Your Spot Now</a>
```

---

### 3. Pending Order Follow-up (`customer_pending_followup`)

**Description:** Sent to customers who started but did not complete payment.

**Available Variables:**
- `{full_name}` - Customer's full name (note: uses underscore, not camelCase)
- `{subscriptionLink}` - Stripe subscription payment link to complete the order
- `{siteUrl}` - Base website URL

**Example Usage:**
```
Hi {full_name},

You started the process but haven't completed your payment yet.

<a href="{subscriptionLink}">Complete Your Order Now</a>
```

---

### 4. Waiting List Confirmation (`customer_waiting_list_confirmation`)

**Description:** Sent to customers after they sign up for the waiting list.

**Available Variables:**
- `{name}` - Customer's name
- `{siteUrl}` - Base website URL

**Example Usage:**
```
Thank You, {name}!

You're on the priority list. We'll notify you when spots open up.
```

---

## Developer Email Templates

### 5. New Booking Notification (`developer_new_booking`)

**Description:** Sent to developer when a new order is placed.

**Available Variables:**
- `{fullName}` - Customer's full name
- `{email}` - Customer's email address
- `{phone}` - Customer's phone number (optional)
- `{businessName}` - Business/studio name
- `{location}` - Business location
- `{specialization}` - Training specialization
- `{preferredColors}` - Preferred color scheme (optional)
- `{websiteGoals}` - Website goals/requirements (optional)
- `{additionalNotes}` - Additional notes from customer (optional)
- `{sessionId}` - Stripe session ID (optional)
- `{siteUrl}` - Base website URL

**Example Usage:**
```
New Website Order!

Customer: {fullName}
Email: {email}
Phone: {phone}
Business: {businessName}
Location: {location}

{if_additionalNotes}
Additional Notes: {additionalNotes}
{/if_additionalNotes}
```

---

### 6. Waiting List Signup Notification (`developer_waiting_list_signup`)

**Description:** Sent to developer when someone signs up for the waiting list.

**Available Variables:**
- `{name}` - Lead's name
- `{email}` - Lead's email address
- `{siteUrl}` - Base website URL

**Example Usage:**
```
New Lead: Someone Wants to Be Notified!

Name: {name}
Email: {email}
```

---

## Variable Format

All variables use the format `{variableName}` in your HTML templates. The system will automatically replace them with actual values when sending emails.

### Conditional Rendering

For optional variables, use conditional blocks:

```html
{if_preferredColors}
  <div>Colors: {preferredColors}</div>
{/if_preferredColors}
```

The content inside the conditional block will only be included if `preferredColors` has a value.

### Special Variables

- **`{siteUrl}`** - Automatically replaced with the base site URL (without trailing slash)

---

## Notes

- Variable names are case-sensitive: `{fullName}` is different from `{fullname}`
- Optional variables (like `{preferredColors}`) may be empty strings - use conditionals to hide sections when empty
- All variables are strings - format numbers/dates in your template if needed
- The `{siteUrl}` variable is automatically available in all templates

