# Tab Notification Badges Feature

## Overview

The admin dashboard tabs now have smart notification badges that:
- Show the count of orders and waiting list entries
- **Disappear once you view the tab**
- **Reappear when new entries arrive**

This helps you quickly see which tabs have new information that needs your attention.

## How It Works

### Initial State

When you first open the admin dashboard:
```
┌─────────────────────────────────────────────┐
│ ⚙️ Capacity  │  👥 Orders (9)  │  ✉️ Waiting List (1)  │  ℹ️ Info  │
└─────────────────────────────────────────────┘
        ↑              ↑                    ↑
    Current tab    Badge shows      Badge shows
    (no badge)     9 new orders     1 waiting
```

### After Viewing Tab

Once you click on the "Orders" tab:
```
┌─────────────────────────────────────────────┐
│ ⚙️ Capacity  │  👥 Orders  │  ✉️ Waiting List (1)  │  ℹ️ Info  │
└─────────────────────────────────────────────┘
                       ↑                    
                Badge removed         
               after viewing
```

### New Entry Arrives

If a new order comes in while you're viewing another tab:
```
┌─────────────────────────────────────────────┐
│ ⚙️ Capacity  │  👥 Orders (10)  │  ✉️ Waiting List  │  ℹ️ Info  │
└─────────────────────────────────────────────┘
                       ↑                    
                Badge reappears!         
             (count increased 9→10)
```

## Behavior Rules

### Badge Appears When:
✅ Tab has entries (orders or waiting list)  
✅ You haven't viewed the tab yet  
✅ New entries arrived since you last viewed  

### Badge Disappears When:
✅ You click on the tab  
✅ Tab is currently active  

### Badge Shows Count Of:
- **Orders Tab**: Number of completed orders
- **Waiting List Tab**: Number of people waiting

## Smart Features

### 1. **Persistent Across Session**
- If you view the Orders tab, the badge stays hidden
- Even if you switch to other tabs
- Badge only reappears when new data arrives

### 2. **Real-Time Updates**
- Click "Refresh" button on any tab
- If new entries are found, badge reappears
- Alerts you to check new information

### 3. **Delete Handling**
- Deleting from waiting list does NOT bring back badge
- Only increases in count trigger badge reappearance
- Prevents false notifications

### 4. **Default Tab**
- Capacity tab is active by default
- No badge on Capacity or Info tabs (they don't have notifications)

## Technical Implementation

### State Management

```typescript
const [viewedTabs, setViewedTabs] = useState<Set<string>>(new Set(['capacity']))
const [activeTab, setActiveTab] = useState('capacity')
const [prevOrdersCount, setPrevOrdersCount] = useState(0)
const [prevWaitingCount, setPrevWaitingCount] = useState(0)
```

### Tab Change Handler

```typescript
const handleTabChange = (value: string) => {
  setActiveTab(value)
  setViewedTabs(prev => new Set(prev).add(value))
}
```

This marks the tab as "viewed" when you click it.

### New Entry Detection

```typescript
useEffect(() => {
  if (completedOrders.length > prevOrdersCount && prevOrdersCount > 0) {
    // Remove 'orders' from viewed tabs - badge will reappear
    setViewedTabs(prev => {
      const newSet = new Set(prev)
      newSet.delete('orders')
      return newSet
    })
  }
  setPrevOrdersCount(completedOrders.length)
}, [completedOrders.length])
```

When count increases, tab is marked as "unviewed" again.

### Badge Display Logic

```typescript
{completedOrders.length > 0 && !viewedTabs.has('orders') && (
  <span className="badge">
    {completedOrders.length}
  </span>
)}
```

Badge only shows if:
- Count > 0
- Tab hasn't been viewed (`!viewedTabs.has('orders')`)

## User Experience Examples

### Example 1: New Admin Session

```
1. Log into admin dashboard
2. See: Orders (9) | Waiting List (1)
3. Click "Orders" tab
4. Badge disappears
5. View all orders
6. Switch to "Waiting List" tab
7. Badge disappears
8. Both tabs now have no badges
```

### Example 2: New Order Arrives

```
1. Currently viewing Capacity tab
2. Orders tab shows no badge (you viewed it earlier)
3. Click "Refresh" on Orders tab
4. New order found! (9 → 10)
5. Badge reappears: Orders (10)
6. Alerts you to check the new order
```

### Example 3: Delete from Waiting List

```
1. Waiting List tab shows: (5 entries)
2. View Waiting List - badge disappears
3. Delete 1 entry (5 → 4)
4. Badge DOES NOT reappear
5. Only increases trigger badge reappearance
```

### Example 4: Auto-Refresh Workflow

```
1. View Orders tab at 10:00 AM (9 orders)
2. Badge disappears
3. Work on other tabs
4. At 11:00 AM, click Refresh on Orders
5. New order arrived! (9 → 10)
6. Badge reappears: Orders (10)
7. Click Orders tab to view new order
8. Badge disappears again
```

## Benefits

### For Admin Users

✅ **Clear Notifications** - See which tabs need attention  
✅ **No Distraction** - Badge goes away after viewing  
✅ **Smart Alerts** - Only reappears when new data arrives  
✅ **Quick Scanning** - Glance at tabs to see what's new  
✅ **Efficient Workflow** - Focus on tabs with updates  

### For User Experience

✅ **Minimal UI** - Badges only when needed  
✅ **Intuitive** - Disappears when viewed (like notifications)  
✅ **Informative** - Shows exact count  
✅ **Non-Intrusive** - Doesn't require dismissal  

## Files Modified

- ✅ `app/admin/page.tsx` - Badge logic and state management

### Changes Made:

1. Added `viewedTabs` state (Set of viewed tab names)
2. Added `activeTab` state (current active tab)
3. Added `prevOrdersCount` and `prevWaitingCount` (track changes)
4. Added `handleTabChange` function (marks tabs as viewed)
5. Added useEffect hooks (detect new entries)
6. Updated `Tabs` component (controlled component with value)
7. Updated badge conditions (check if viewed)

## Testing Checklist

- [ ] Log into admin dashboard
- [ ] Verify badges show on Orders and Waiting List (if data exists)
- [ ] Click Orders tab - badge should disappear
- [ ] Click Waiting List tab - badge should disappear
- [ ] Switch between tabs - badges stay hidden
- [ ] Click Refresh on Orders - if new data, badge reappears
- [ ] Delete from Waiting List - badge should NOT reappear
- [ ] Log out and log back in - badges reset to initial state

## Edge Cases Handled

### Case 1: No Data
If there are 0 orders or 0 waiting list entries:
- **Result**: No badge shown
- **Reason**: Nothing to notify about

### Case 2: Data Decreases (Deletion)
If waiting list count decreases (4 → 3):
- **Result**: Badge does NOT reappear
- **Reason**: Only increases indicate new entries

### Case 3: Page Refresh
If you refresh the entire page:
- **Result**: Badges reset to initial state
- **Reason**: State is reset on page load
- **Expected**: This is desired behavior

### Case 4: Multiple Refreshes
If you click Refresh multiple times with same data:
- **Result**: Badge stays hidden
- **Reason**: Count didn't increase
- **Expected**: No false notifications

### Case 5: First Load
When first loading with existing data:
- **Result**: Badges show on unviewed tabs
- **Reason**: `prevCount` starts at 0, but check prevents false trigger
- **Logic**: `prevCount > 0` condition prevents initial load from resetting

## Future Enhancements

Possible additions:
- Persist viewed state in localStorage (survives page refresh)
- Different badge colors (red for urgent, blue for info)
- Animated badge appearance
- Sound notification when new entries arrive
- Pulse animation on badge
- "Mark all as read" button
- Timestamp of last viewed
- "New since: 2 minutes ago" tooltip

## Troubleshooting

### Badge not disappearing
**Check**: Click directly on the tab name
**Reason**: Tab must be active to mark as viewed

### Badge reappears immediately
**Check**: Is new data actually arriving?
**Solution**: Check if Refresh is being called automatically

### Badge never shows
**Check**: Is there data in that tab?
**Solution**: Add test data to verify

### Badge shows wrong count
**Check**: Count reflects actual database entries
**Solution**: Refresh the page to reset state

---

**Status**: ✅ Complete and ready to use!  
**UX Impact**: 🎯 Helps prioritize which tabs to check  
**Performance**: ⚡ No additional API calls needed

