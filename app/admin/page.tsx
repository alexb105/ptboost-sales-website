"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, CheckCircle, XCircle, Loader2 } from "lucide-react"

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

  // Fetch current capacity status
  useEffect(() => {
    if (isAuthenticated) {
      fetchCapacityStatus()
    }
  }, [isAuthenticated])

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError("")
    
    // Store password for API calls
    setAdminPassword(password)
    
    // Simple client-side check (the real auth happens on the API)
    // We'll verify this works when they make their first update
    setIsAuthenticated(true)
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
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your website capacity settings</p>
        </div>

        <div className="grid gap-6">
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

          {/* Info Card */}
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
        </div>

        <div className="mt-8 flex justify-center">
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/'}
          >
            ← Back to Website
          </Button>
        </div>
      </div>
    </div>
  )
}

