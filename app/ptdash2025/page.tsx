"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Lock, CheckCircle, XCircle, Loader2, Users, Mail, Calendar, Phone, MapPin, Briefcase, Settings, Info, Trash2, Send, Link2, Eye, Image as ImageIcon, User, Download, CreditCard } from "lucide-react"
import { createClient } from '@supabase/supabase-js'
import type { BookingData, WaitingListEntry } from '@/lib/supabase-types'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")
  const [capacityCount, setCapacityCount] = useState(0)
  const [newCapacityCount, setNewCapacityCount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [updateStatus, setUpdateStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [adminPassword, setAdminPassword] = useState("")
  const [completedOrders, setCompletedOrders] = useState<BookingData[]>([])
  const [pendingOrders, setPendingOrders] = useState<BookingData[]>([])
  const [waitingList, setWaitingList] = useState<WaitingListEntry[]>([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(false)
  const [isLoadingPendingOrders, setIsLoadingPendingOrders] = useState(false)
  const [isLoadingWaitingList, setIsLoadingWaitingList] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [entryToDelete, setEntryToDelete] = useState<WaitingListEntry | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [viewedTabs, setViewedTabs] = useState<Set<string>>(new Set(['capacity'])) // capacity is default tab
  const [activeTab, setActiveTab] = useState('capacity')
  const [sendingEmailTo, setSendingEmailTo] = useState<string | null>(null) // Track which email is being sent
  const [emailStatus, setEmailStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [rememberMe, setRememberMe] = useState(true)
  const [subscriptionLink, setSubscriptionLink] = useState("")
  const [buyoutLink, setBuyoutLink] = useState("")
  const [newSubscriptionLink, setNewSubscriptionLink] = useState("")
  const [newBuyoutLink, setNewBuyoutLink] = useState("")
  const [isLoadingLinks, setIsLoadingLinks] = useState(false)
  const [linksUpdateStatus, setLinksUpdateStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [linksLastUpdated, setLinksLastUpdated] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<BookingData | null>(null)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [deleteOrderDialogOpen, setDeleteOrderDialogOpen] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState<BookingData | null>(null)
  const [isDeletingOrder, setIsDeletingOrder] = useState(false)

  // Load saved password on mount (but don't auto-login)
  useEffect(() => {
    const savedPassword = localStorage.getItem('adminPassword')
    if (savedPassword) {
      setPassword(savedPassword)
      setRememberMe(true)
    }
  }, [])

  // Load viewed tabs from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('adminViewedTabs')
    if (stored) {
      try {
        const viewedArray = JSON.parse(stored)
        setViewedTabs(new Set(viewedArray))
      } catch (error) {
        console.error('Error loading viewed tabs:', error)
      }
    }
  }, [])

  // Save viewed tabs to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('adminViewedTabs', JSON.stringify(Array.from(viewedTabs)))
  }, [viewedTabs])

  // Fetch current capacity status
  useEffect(() => {
    if (isAuthenticated) {
      fetchCapacityStatus()
      fetchCompletedOrders()
      fetchPendingOrders()
      fetchWaitingList()
      fetchPaymentLinks()
    }
  }, [isAuthenticated])

  // Track previous counts to detect new entries
  const [prevOrdersCount, setPrevOrdersCount] = useState(0)
  const [prevPendingCount, setPrevPendingCount] = useState(0)
  const [prevWaitingCount, setPrevWaitingCount] = useState(0)

  // Reset viewed status when new entries arrive
  useEffect(() => {
    const totalOrders = completedOrders.length + pendingOrders.length
    const prevTotal = prevOrdersCount + prevPendingCount
    
    if (totalOrders > prevTotal && prevTotal > 0) {
      setViewedTabs(prev => {
        const newSet = new Set(prev)
        newSet.delete('orders')
        return newSet
      })
    }
    setPrevOrdersCount(completedOrders.length)
    setPrevPendingCount(pendingOrders.length)
  }, [completedOrders.length, pendingOrders.length])

  useEffect(() => {
    if (waitingList.length > prevWaitingCount && prevWaitingCount > 0) {
      setViewedTabs(prev => {
        const newSet = new Set(prev)
        newSet.delete('waiting')
        return newSet
      })
    }
    setPrevWaitingCount(waitingList.length)
  }, [waitingList.length])

  // Mark tab as viewed when it becomes active
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setViewedTabs(prev => new Set(prev).add(value))
  }

  const fetchCapacityStatus = async () => {
    try {
      const response = await fetch('/api/capacity')
      const data = await response.json()
      setCapacityCount(data.capacityCount)
      setNewCapacityCount(data.capacityCount.toString())
      setLastUpdated(data.updatedAt)
    } catch (error) {
      console.error('Error fetching capacity:', error)
    }
  }

  const fetchCompletedOrders = async () => {
    setIsLoadingOrders(true)
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('payment_status', 'completed')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching completed orders:', error)
      } else {
        // Ensure images array is properly parsed (handle PostgreSQL array format)
        const processedData = (data || []).map(order => {
          let images = []
          if (Array.isArray(order.images)) {
            images = order.images
          } else if (typeof order.images === 'string') {
            try {
              images = JSON.parse(order.images || '[]')
            } catch (e) {
              console.warn('Failed to parse images for', order.full_name, ':', e)
              images = []
            }
          }
          
          // Filter out any null/undefined/empty image URLs
          images = images.filter((url: string) => url && typeof url === 'string' && url.trim().length > 0)
          
          return {
            ...order,
            images
          }
        })
        
        // Debug logging
        const ordersWithImages = processedData.filter(o => o.images && o.images.length > 0)
        if (ordersWithImages.length > 0) {
          console.log('Orders with images:', ordersWithImages.map(o => ({
            name: o.full_name,
            imageCount: o.images.length,
            firstImageUrl: o.images[0]?.substring(0, 100) + '...'
          })))
        }
        
        setCompletedOrders(processedData)
      }
    } catch (error) {
      console.error('Error fetching completed orders:', error)
    } finally {
      setIsLoadingOrders(false)
    }
  }

  const handleDeleteOrder = async () => {
    if (!orderToDelete || !orderToDelete.id) return

    setIsDeletingOrder(true)
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', orderToDelete.id)

      if (error) {
        console.error('Error deleting order:', error)
        alert('Failed to delete order. Please try again.')
      } else {
        // Remove from local state
        setCompletedOrders(prev => prev.filter(order => order.id !== orderToDelete.id))
        setDeleteOrderDialogOpen(false)
        setOrderToDelete(null)
      }
    } catch (error) {
      console.error('Error deleting order:', error)
      alert('Failed to delete order. Please try again.')
    } finally {
      setIsDeletingOrder(false)
    }
  }

  const fetchPendingOrders = async () => {
    setIsLoadingPendingOrders(true)
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('payment_status', 'pending')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching pending orders:', error)
      } else {
        setPendingOrders(data || [])
      }
    } catch (error) {
      console.error('Error fetching pending orders:', error)
    } finally {
      setIsLoadingPendingOrders(false)
    }
  }

  const fetchWaitingList = async () => {
    setIsLoadingWaitingList(true)
    try {
      const { data, error } = await supabase
        .from('waiting_list')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching waiting list:', error)
      } else {
        setWaitingList(data || [])
      }
    } catch (error) {
      console.error('Error fetching waiting list:', error)
    } finally {
      setIsLoadingWaitingList(false)
    }
  }

  const fetchPaymentLinks = async () => {
    try {
      const response = await fetch('/api/payment-links')
      const data = await response.json()
      setSubscriptionLink(data.subscriptionLink || '')
      setBuyoutLink(data.buyoutLink || '')
      setNewSubscriptionLink(data.subscriptionLink || '')
      setNewBuyoutLink(data.buyoutLink || '')
      setLinksLastUpdated(data.updatedAt)
    } catch (error) {
      console.error('Error fetching payment links:', error)
    }
  }

  const handleUpdatePaymentLinks = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoadingLinks(true)
    setLinksUpdateStatus('idle')

    try {
      const response = await fetch('/api/payment-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          subscriptionLink: newSubscriptionLink.trim() || null,
          buyoutLink: newBuyoutLink.trim() || null,
          adminPassword 
        })
      })

      if (response.ok) {
        const data = await response.json()
        setSubscriptionLink(data.subscriptionLink || '')
        setBuyoutLink(data.buyoutLink || '')
        setNewSubscriptionLink(data.subscriptionLink || '')
        setNewBuyoutLink(data.buyoutLink || '')
        setLinksLastUpdated(data.updatedAt)
        setLinksUpdateStatus('success')
        setTimeout(() => setLinksUpdateStatus('idle'), 3000)
      } else {
        if (response.status === 401) {
          setAuthError("Invalid password. Please log in again.")
          setIsAuthenticated(false)
          setPassword("")
          setAdminPassword("")
          localStorage.removeItem('adminPassword')
        } else {
          const errorData = await response.json()
          setLinksUpdateStatus('error')
          setTimeout(() => setLinksUpdateStatus('idle'), 5000)
          alert(errorData.error || 'Failed to update payment links')
        }
      }
    } catch (error) {
      console.error('Error updating payment links:', error)
      setLinksUpdateStatus('error')
      setTimeout(() => setLinksUpdateStatus('idle'), 5000)
    } finally {
      setIsLoadingLinks(false)
    }
  }

  const handleDeleteClick = (entry: WaitingListEntry) => {
    setEntryToDelete(entry)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!entryToDelete) return
    
    setIsDeleting(true)
    try {
      const response = await fetch('/api/waiting-list/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: entryToDelete.id,
          adminPassword 
        })
      })

      if (response.ok) {
        // Remove from local state
        setWaitingList(prev => prev.filter(entry => entry.id !== entryToDelete.id))
        setDeleteDialogOpen(false)
        setEntryToDelete(null)
      } else {
        if (response.status === 401) {
          setAuthError("Invalid password. Please log in again.")
          setIsAuthenticated(false)
          setPassword("")
          setAdminPassword("")
          localStorage.removeItem('adminPassword')
        }
        alert('Failed to delete entry. Please try again.')
      }
    } catch (error) {
      console.error('Error deleting entry:', error)
      alert('Failed to delete entry. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleSendNotification = async (entry: WaitingListEntry) => {
    setSendingEmailTo(entry.email)
    setEmailStatus(null)

    try {
      const response = await fetch('/api/notify-waiting-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: entry.name,
          email: entry.email 
        })
      })

      if (response.ok) {
        setEmailStatus({ 
          type: 'success', 
          message: `Notification sent successfully to ${entry.name}!` 
        })
        setTimeout(() => setEmailStatus(null), 5000)
      } else {
        const error = await response.json()
        setEmailStatus({ 
          type: 'error', 
          message: `Failed to send email: ${error.error || 'Unknown error'}` 
        })
        setTimeout(() => setEmailStatus(null), 5000)
      }
    } catch (error) {
      console.error('Error sending notification:', error)
      setEmailStatus({ 
        type: 'error', 
        message: 'Failed to send notification. Please try again.' 
      })
      setTimeout(() => setEmailStatus(null), 5000)
    } finally {
      setSendingEmailTo(null)
    }
  }

  const handleSendFollowUp = async (order: BookingData) => {
    if (!subscriptionLink) {
      setEmailStatus({ 
        type: 'error', 
        message: 'Subscription link not configured. Please set it in Payment Links tab first.' 
      })
      setTimeout(() => setEmailStatus(null), 5000)
      return
    }

    setSendingEmailTo(order.email)
    setEmailStatus(null)

    try {
      const response = await fetch('/api/send-pending-followup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          bookingId: order.id,
          subscriptionLink: subscriptionLink
        })
      })

      if (response.ok) {
        setEmailStatus({ 
          type: 'success', 
          message: `Follow-up email sent successfully to ${order.full_name}!` 
        })
        setTimeout(() => setEmailStatus(null), 5000)
      } else {
        const error = await response.json()
        setEmailStatus({ 
          type: 'error', 
          message: `Failed to send email: ${error.error || 'Unknown error'}` 
        })
        setTimeout(() => setEmailStatus(null), 5000)
      }
    } catch (error) {
      console.error('Error sending follow-up email:', error)
      setEmailStatus({ 
        type: 'error', 
        message: 'Failed to send follow-up email. Please try again.' 
      })
      setTimeout(() => setEmailStatus(null), 5000)
    } finally {
      setSendingEmailTo(null)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError("")
    
    // Store password for API calls
    setAdminPassword(password)
    
    // Save to localStorage if remember me is checked
    if (rememberMe) {
      localStorage.setItem('adminPassword', password)
    }
    
    // Simple client-side check (the real auth happens on the API)
    // We'll verify this works when they make their first update
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword("")
    setAdminPassword("")
    localStorage.removeItem('adminPassword')
  }

  const handleUpdateCapacity = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setUpdateStatus('idle')

    const count = parseInt(newCapacityCount)
    if (isNaN(count) || count < 0) {
      setUpdateStatus('error')
      setTimeout(() => setUpdateStatus('idle'), 3000)
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/capacity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          capacityCount: count,
          adminPassword 
        })
      })

      if (response.ok) {
        const data = await response.json()
        setCapacityCount(data.capacityCount)
        setNewCapacityCount(data.capacityCount.toString())
        setLastUpdated(data.updatedAt)
        setUpdateStatus('success')
        setTimeout(() => setUpdateStatus('idle'), 3000)
      } else {
        if (response.status === 401) {
          setAuthError("Invalid password. Please log in again.")
          setIsAuthenticated(false)
          setPassword("")
          setAdminPassword("")
          localStorage.removeItem('adminPassword')
        }
        setUpdateStatus('error')
        setTimeout(() => setUpdateStatus('idle'), 3000)
      }
    } catch (error) {
      console.error('Error updating capacity:', error)
      setUpdateStatus('error')
      setTimeout(() => setUpdateStatus('idle'), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/5 via-orange-500/5 to-red-500/5 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center">
                <Lock className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Admin Access</CardTitle>
            <CardDescription className="text-center">
              Enter your admin password to manage capacity settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                />
                <Label htmlFor="remember-me" className="cursor-pointer">
                  Remember me on this device
                </Label>
              </div>
              {authError && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>{authError}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/5 via-orange-500/5 to-red-500/5 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your website capacity and view customers</p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex-shrink-0"
          >
            <Lock className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="capacity" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Capacity</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
              {((pendingOrders.length > 0 || completedOrders.length > 0) && !viewedTabs.has('orders')) && (
                <span className="ml-1 bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full">
                  {pendingOrders.length + completedOrders.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="waiting" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Waiting List</span>
              {waitingList.length > 0 && !viewedTabs.has('waiting') && (
                <span className="ml-1 bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full">
                  {waitingList.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="payment-links" className="flex items-center gap-2">
              <Link2 className="h-4 w-4" />
              <span className="hidden sm:inline">Payment Links</span>
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">Info</span>
            </TabsTrigger>
          </TabsList>

          {/* Capacity Management Tab */}
          <TabsContent value="capacity" className="space-y-6">
          {/* Capacity Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>Capacity Status</CardTitle>
              <CardDescription>
                Control whether new clients can book through the website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleUpdateCapacity} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity-count" className="text-lg font-bold">
                    Available Spots
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Set the number of spots available. Count decrements automatically with each purchase.
                  </p>
                  <div className="flex gap-3">
                    <Input
                      id="capacity-count"
                      type="number"
                      min="0"
                      value={newCapacityCount}
                      onChange={(e) => setNewCapacityCount(e.target.value)}
                      className="text-lg font-bold h-12"
                      disabled={isLoading}
                    />
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="h-12 px-8"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        'Update'
                      )}
                    </Button>
                  </div>
                </div>

                {/* Quick Preset Buttons */}
                <div className="flex flex-wrap gap-2">
                  <p className="text-sm text-muted-foreground w-full mb-1">Quick presets:</p>
                  {[0, 1, 3, 5, 10].map((count) => (
                    <Button
                      key={count}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setNewCapacityCount(count.toString())}
                      disabled={isLoading}
                    >
                      {count === 0 ? 'Sold Out' : `${count} spots`}
                    </Button>
                  ))}
                </div>
              </form>

              {lastUpdated && (
                <div className="text-sm text-muted-foreground">
                  Last updated: {new Date(lastUpdated).toLocaleString()}
                </div>
              )}

              {updateStatus === 'success' && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Capacity updated successfully!
                  </AlertDescription>
                </Alert>
              )}

              {updateStatus === 'error' && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>
                    Failed to update capacity. Please check your input and try again.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Current Status Display */}
          <Card>
            <CardHeader>
              <CardTitle>Current Website Status</CardTitle>
              <CardDescription>
                What visitors see on your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`p-6 rounded-lg border-2 ${
                capacityCount === 0 
                  ? 'bg-red-500/10 border-red-500/50' 
                  : capacityCount <= 3
                  ? 'bg-yellow-500/10 border-yellow-500/50'
                  : 'bg-green-500/10 border-green-500/50'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full animate-pulse ${
                    capacityCount === 0 
                      ? 'bg-red-500' 
                      : capacityCount <= 3
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`} />
                  <span className="text-lg font-bold">
                    {capacityCount === 0 
                      ? 'Sold Out - No Spots Available' 
                      : capacityCount === 1
                      ? '1 Spot Available'
                      : `${capacityCount} Spots Available`
                    }
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {capacityCount === 0
                    ? "The booking button is disabled. Visitors can sign up to be notified when spots open."
                    : "The booking button is active. Visitors can click through to purchase. Capacity will decrease by 1 with each successful payment."
                  }
                </p>
              </div>
            </CardContent>
          </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
          {/* Email Status Alert */}
          {emailStatus && (
            <Alert className={emailStatus.type === 'success' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}>
              {emailStatus.type === 'success' ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={emailStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                {emailStatus.message}
              </AlertDescription>
            </Alert>
          )}

          {/* Pending Orders Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-orange-500" />
                    Pending Orders
                  </CardTitle>
                  <CardDescription>
                    Customers who started but haven't completed payment
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={fetchPendingOrders}
                  disabled={isLoadingPendingOrders}
                >
                  {isLoadingPendingOrders ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Refresh'
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingPendingOrders ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : pendingOrders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>No pending orders</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingOrders.map((order) => (
                    <div 
                      key={order.id} 
                      className="p-4 border-2 border-orange-200 rounded-lg hover:bg-orange-50/50 transition-colors bg-orange-50/30"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-lg">{order.full_name}</h3>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-500 text-white">
                              PENDING
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {order.business_name}
                          </p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3 inline mr-1" />
                          {new Date(order.created_at || '').toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="grid gap-2 text-sm mb-3">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <a href={`mailto:${order.email}`} className="hover:text-accent">
                            {order.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <a href={`tel:${order.phone}`} className="hover:text-accent">
                            {order.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {order.location}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-orange-200">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleSendFollowUp(order)}
                          disabled={sendingEmailTo === order.email || !subscriptionLink}
                          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                        >
                          {sendingEmailTo === order.email ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Send Follow-Up Email
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="text-center text-sm text-muted-foreground pt-2">
                    Total: {pendingOrders.length} {pendingOrders.length === 1 ? 'pending order' : 'pending orders'}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Completed Orders Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Completed Orders
                  </CardTitle>
                  <CardDescription>
                    Customers who have successfully purchased
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={fetchCompletedOrders}
                  disabled={isLoadingOrders}
                >
                  {isLoadingOrders ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Refresh'
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingOrders ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : completedOrders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>No completed orders yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {completedOrders.map((order) => (
                    <div 
                      key={order.id} 
                      className="p-4 border rounded-lg hover:bg-accent/5 transition-colors"
                    >
                      {/* Name */}
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="font-bold text-lg">{order.full_name}</h3>
                        {order.website_owned && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-sm">
                            ✓ WEBSITE OWNED
                          </span>
                        )}
                      </div>
                      
                      {/* Contact Info */}
                      <div className="space-y-2 text-sm mb-3">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4 flex-shrink-0" />
                          <a href={`mailto:${order.email}`} className="hover:text-accent truncate">
                            {order.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-4 w-4 flex-shrink-0" />
                          <a href={`tel:${order.phone}`} className="hover:text-accent">
                            {order.phone}
                          </a>
                        </div>
                      </div>

                      {/* Subscription Indicator */}
                      {order.stripe_customer_id && (
                        <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-md">
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                            <span className="text-blue-900 font-medium">Active Subscription</span>
                            <span className="text-blue-700 text-xs">(Customer ID: {order.stripe_customer_id.substring(0, 12)}...)</span>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(order)
                            setDetailsDialogOpen(true)
                          }}
                          className="flex-1"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setOrderToDelete(order)
                            setDeleteOrderDialogOpen(true)
                          }}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="text-center text-sm text-muted-foreground pt-2">
                    Total: {completedOrders.length} {completedOrders.length === 1 ? 'order' : 'orders'}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          </TabsContent>

          {/* Waiting List Tab */}
          <TabsContent value="waiting" className="space-y-6">
          {/* Email Status Alert */}
          {emailStatus && (
            <Alert className={emailStatus.type === 'success' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}>
              {emailStatus.type === 'success' ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={emailStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                {emailStatus.message}
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Waiting List
                  </CardTitle>
                  <CardDescription>
                    People who signed up for notifications when spots open
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={fetchWaitingList}
                  disabled={isLoadingWaitingList}
                >
                  {isLoadingWaitingList ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Refresh'
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingWaitingList ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : waitingList.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Mail className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>No one on the waiting list yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {waitingList.map((entry) => (
                    <div 
                      key={entry.id} 
                      className="p-4 border rounded-lg hover:bg-accent/5 transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="font-semibold text-foreground">{entry.name}</span>
                          </div>
                          <div className="flex items-center gap-2 ml-6 mb-2">
                            <Mail className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <a href={`mailto:${entry.email}`} className="text-sm hover:text-accent truncate">
                              {entry.email}
                            </a>
                          </div>
                          <div className="text-sm text-muted-foreground ml-6">
                            <Calendar className="h-3 w-3 inline mr-1" />
                            {new Date(entry.created_at || '').toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSendNotification(entry)}
                            disabled={sendingEmailTo === entry.email}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-accent hover:text-accent hover:bg-accent/10"
                            title="Send availability notification"
                          >
                            {sendingEmailTo === entry.email ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Send className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(entry)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                            title="Delete entry"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-center text-sm text-muted-foreground pt-2">
                    Total: {waitingList.length} {waitingList.length === 1 ? 'person' : 'people'}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          </TabsContent>

          {/* Payment Links Tab */}
          <TabsContent value="payment-links" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="h-5 w-5" />
                Stripe Payment Links
              </CardTitle>
              <CardDescription>
                Manage your Stripe payment links for subscriptions and buyouts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleUpdatePaymentLinks} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subscription-link" className="text-lg font-bold">
                      Subscription Payment Link
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Used for monthly subscription payments (booking form)
                    </p>
                    <Input
                      id="subscription-link"
                      type="url"
                      placeholder="https://buy.stripe.com/..."
                      value={newSubscriptionLink}
                      onChange={(e) => setNewSubscriptionLink(e.target.value)}
                      className="text-base font-mono"
                      disabled={isLoadingLinks}
                    />
                    {subscriptionLink && (
                      <div className="text-sm text-muted-foreground">
                        Current: <a href={subscriptionLink} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all">{subscriptionLink}</a>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="buyout-link" className="text-lg font-bold">
                      Buyout Payment Link
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Used for one-time website purchases
                    </p>
                    <Input
                      id="buyout-link"
                      type="url"
                      placeholder="https://buy.stripe.com/..."
                      value={newBuyoutLink}
                      onChange={(e) => setNewBuyoutLink(e.target.value)}
                      className="text-base font-mono"
                      disabled={isLoadingLinks}
                    />
                    {buyoutLink && (
                      <div className="text-sm text-muted-foreground">
                        Current: <a href={buyoutLink} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all">{buyoutLink}</a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    type="submit" 
                    disabled={isLoadingLinks}
                    className="flex-1"
                  >
                    {isLoadingLinks ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Link2 className="h-4 w-4 mr-2" />
                        Update Links
                      </>
                    )}
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={fetchPaymentLinks}
                    disabled={isLoadingLinks}
                  >
                    {isLoadingLinks ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Refresh'
                    )}
                  </Button>
                </div>
              </form>

              {linksLastUpdated && (
                <div className="text-sm text-muted-foreground">
                  Last updated: {new Date(linksLastUpdated).toLocaleString()}
                </div>
              )}

              {linksUpdateStatus === 'success' && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Payment links updated successfully!
                  </AlertDescription>
                </Alert>
              )}

              {linksUpdateStatus === 'error' && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>
                    Failed to update payment links. Please check your URLs and try again.
                  </AlertDescription>
                </Alert>
              )}

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">How to get your Stripe Payment Links:</p>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Go to your Stripe Dashboard</li>
                  <li>Navigate to Products → Payment Links</li>
                  <li>Copy the payment link URL (starts with https://buy.stripe.com/...)</li>
                  <li>Paste it in the corresponding field above</li>
                  <li>Click "Update Links" to save</li>
                </ol>
              </div>
            </CardContent>
          </Card>
          </TabsContent>

          {/* Info Tab */}
          <TabsContent value="info" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-1.5" />
                <p>
                  Set the number of available spots. When someone successfully completes a purchase, the capacity automatically decreases by 1.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-1.5" />
                <p>
                  When capacity reaches <strong>0</strong>, the CTA button is disabled and visitors see a "Get Notified" form instead.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-1.5" />
                <p>
                  Visitors can see how many spots remain (creates urgency when count is low!).
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-1.5" />
                <p>
                  You can manually reset or adjust the capacity count anytime from this dashboard.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-accent rounded-full mt-1.5" />
                <p>
                  All changes take effect immediately on your live website.
                </p>
              </div>
            </CardContent>
          </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-center">
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/'}
          >
            ← Back to Website
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Waiting List Entry?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove <strong>{entryToDelete?.name}</strong> ({entryToDelete?.email}) from the waiting list? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Full Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {selectedOrder?.full_name} - Full Order Details
            </DialogTitle>
            <DialogDescription>
              Complete customer information and uploaded images
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6 mt-4">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
                <div className="grid gap-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Full Name:</span>
                    <span>{selectedOrder.full_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Email:</span>
                    <a href={`mailto:${selectedOrder.email}`} className="text-accent hover:underline">
                      {selectedOrder.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Phone:</span>
                    <a href={`tel:${selectedOrder.phone}`} className="text-accent hover:underline">
                      {selectedOrder.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Business Information</h3>
                <div className="grid gap-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Business Name:</span>
                    <span>{selectedOrder.business_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Location:</span>
                    <span>{selectedOrder.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Specialization:</span>
                    <span>{selectedOrder.specialization}</span>
                  </div>
                </div>
              </div>

              {/* Website Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Website Preferences</h3>
                <div className="grid gap-3">
                  <div>
                    <span className="font-medium">Preferred Colors:</span>
                    <p className="text-muted-foreground mt-1">
                      {selectedOrder.preferred_colors || 'Not specified'}
                    </p>
                  </div>
                  {selectedOrder.website_goals && selectedOrder.website_goals !== 'Not specified' && (
                    <div>
                      <span className="font-medium">Website Goals:</span>
                      <p className="text-muted-foreground mt-1 whitespace-pre-wrap">
                        {selectedOrder.website_goals}
                      </p>
                    </div>
                  )}
                  {selectedOrder.additional_notes && selectedOrder.additional_notes !== 'Not specified' && (
                    <div>
                      <span className="font-medium">Additional Notes:</span>
                      <p className="text-muted-foreground mt-1 whitespace-pre-wrap">
                        {selectedOrder.additional_notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Uploaded Images */}
              {selectedOrder.images && Array.isArray(selectedOrder.images) && selectedOrder.images.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <ImageIcon className="h-5 w-5" />
                      Uploaded Images ({selectedOrder.images.length})
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        try {
                          // Download all images
                          for (let i = 0; i < selectedOrder.images!.length; i++) {
                            const imageUrl = selectedOrder.images![i]
                            const response = await fetch(imageUrl)
                            const blob = await response.blob()
                            const url = window.URL.createObjectURL(blob)
                            const a = document.createElement('a')
                            a.href = url
                            // Extract filename from URL or use index
                            const urlParts = imageUrl.split('/')
                            const filename = urlParts[urlParts.length - 1] || `image-${i + 1}.jpg`
                            a.download = `${selectedOrder.full_name.replace(/\s+/g, '-')}-${filename}`
                            document.body.appendChild(a)
                            a.click()
                            document.body.removeChild(a)
                            window.URL.revokeObjectURL(url)
                            // Small delay between downloads to avoid browser blocking
                            if (i < selectedOrder.images!.length - 1) {
                              await new Promise(resolve => setTimeout(resolve, 300))
                            }
                          }
                        } catch (error) {
                          console.error('Error downloading images:', error)
                          alert('Failed to download some images. Please try downloading them individually.')
                        }
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download All
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedOrder.images.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden border border-muted bg-muted/50">
                          <img
                            src={imageUrl}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                            onClick={() => window.open(imageUrl, '_blank')}
                            onError={(e) => {
                              console.error('Failed to load image:', imageUrl)
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                              const parent = target.parentElement
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="flex items-center justify-center h-full text-muted-foreground text-sm p-2 text-center">
                                    Image failed to load<br/>
                                    <a href="${imageUrl}" target="_blank" class="text-accent hover:underline mt-1">Open URL</a>
                                  </div>
                                `
                              }
                            }}
                            loading="lazy"
                          />
                        </div>
                        <a
                          href={imageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                        >
                          <span className="text-white text-sm">View Full Size</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Metadata */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold border-b pb-2">Order Information</h3>
                <div className="grid gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Order Date:</span>
                    <span>{new Date(selectedOrder.created_at || '').toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Payment Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      selectedOrder.payment_status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : selectedOrder.payment_status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedOrder.payment_status.toUpperCase()}
                    </span>
                  </div>
                  {selectedOrder.stripe_session_id && (
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Stripe Session ID:</span>
                      <span className="font-mono text-xs break-all">{selectedOrder.stripe_session_id}</span>
                    </div>
                  )}
                  {selectedOrder.stripe_customer_id && (
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Stripe Customer ID:</span>
                      <span className="font-mono text-xs break-all">{selectedOrder.stripe_customer_id}</span>
                    </div>
                  )}
                  {selectedOrder.website_owned && (
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-sm">
                        ✓ WEBSITE OWNED
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Order Confirmation Dialog */}
      <AlertDialog open={deleteOrderDialogOpen} onOpenChange={setDeleteOrderDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the order for <strong>{orderToDelete?.full_name}</strong>?
              <br /><br />
              This action cannot be undone. This will permanently delete the order and all associated data.
              {orderToDelete?.stripe_customer_id && (
                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-sm">
                  ⚠️ Warning: This customer has an active subscription (Customer ID: {orderToDelete.stripe_customer_id}). 
                  Deleting this order will not cancel their Stripe subscription.
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeletingOrder}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteOrder}
              disabled={isDeletingOrder}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeletingOrder ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Order
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

