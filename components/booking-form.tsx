"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, ArrowLeft, Loader2, User, Briefcase, Globe, MessageSquare } from "lucide-react"
import { toast } from "sonner"

interface BookingFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface FormData {
  // Step 1: Personal Information
  fullName: string
  email: string
  phone: string
  
  // Step 2: Business Information
  businessName: string
  location: string
  specialization: string
  
  // Step 3: Website Preferences
  preferredColors: string
  websiteGoals: string
  additionalNotes: string
}

export function BookingForm({ open, onOpenChange }: BookingFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    location: "",
    specialization: "",
    preferredColors: "",
    websiteGoals: "",
    additionalNotes: "",
  })

  const totalSteps = 3

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.fullName.trim()) {
          toast.error("Please enter your full name")
          return false
        }
        if (!formData.email.trim() || !formData.email.includes("@")) {
          toast.error("Please enter a valid email address")
          return false
        }
        if (!formData.phone.trim()) {
          toast.error("Please enter your phone number")
          return false
        }
        return true
      
      case 2:
        if (!formData.businessName.trim()) {
          toast.error("Please enter your business name")
          return false
        }
        if (!formData.location.trim()) {
          toast.error("Please enter your location")
          return false
        }
        if (!formData.specialization.trim()) {
          toast.error("Please enter your specialization")
          return false
        }
        return true
      
      case 3:
        // Step 3 fields are optional, but at least one should be filled
        return true
      
      default:
        return true
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return
    }

    setIsSubmitting(true)

    try {
      // Save booking data to Supabase
      const response = await fetch("/api/save-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to save booking data")
      }

      const { bookingId } = await response.json()
      
      // Store booking ID in localStorage so we can retrieve it after payment
      localStorage.setItem('pending_booking_id', bookingId)
      
      // Redirect to Stripe subscription payment link
      window.location.href = "https://buy.stripe.com/4gMcN63JM9tN0xr1JJ0co04"
    } catch (error) {
      console.error("Error:", error)
      toast.error("Something went wrong. Please try again.")
      setIsSubmitting(false)
    }
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${
              step === currentStep
                ? "bg-gradient-to-r from-accent to-orange-500 text-white scale-110"
                : step < currentStep
                ? "bg-green-500 text-white"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {step}
          </div>
          {step < 3 && (
            <div
              className={`w-12 h-1 mx-2 rounded transition-all ${
                step < currentStep ? "bg-green-500" : "bg-muted"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
          <User className="h-5 w-5 text-accent" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Personal Information</h3>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name *</Label>
        <Input
          id="fullName"
          placeholder="John Smith"
          value={formData.fullName}
          onChange={(e) => updateFormData("fullName", e.target.value)}
          className="h-12"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => updateFormData("email", e.target.value)}
          className="h-12"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+44 7XXX XXXXXX"
          value={formData.phone}
          onChange={(e) => updateFormData("phone", e.target.value)}
          className="h-12"
        />
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
          <Briefcase className="h-5 w-5 text-accent" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Business Information</h3>
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessName">Business Name *</Label>
        <Input
          id="businessName"
          placeholder="John's Fitness Training"
          value={formData.businessName}
          onChange={(e) => updateFormData("businessName", e.target.value)}
          className="h-12"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location *</Label>
        <Input
          id="location"
          placeholder="London, UK"
          value={formData.location}
          onChange={(e) => updateFormData("location", e.target.value)}
          className="h-12"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialization">Your Specialization *</Label>
        <Input
          id="specialization"
          placeholder="e.g., Weight Loss, Strength Training, Sports Performance"
          value={formData.specialization}
          onChange={(e) => updateFormData("specialization", e.target.value)}
          className="h-12"
        />
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
          <Globe className="h-5 w-5 text-accent" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Website Preferences</h3>
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferredColors">Preferred Colors (Optional)</Label>
        <Input
          id="preferredColors"
          placeholder="e.g., Blue and Orange, Dark Theme, Minimalist Black"
          value={formData.preferredColors}
          onChange={(e) => updateFormData("preferredColors", e.target.value)}
          className="h-12"
        />
        <p className="text-xs text-muted-foreground">What colors or style do you envision?</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="websiteGoals">Main Website Goals (Optional)</Label>
        <Textarea
          id="websiteGoals"
          placeholder="e.g., Get more client bookings, showcase my transformation results, establish credibility..."
          value={formData.websiteGoals}
          onChange={(e) => updateFormData("websiteGoals", e.target.value)}
          className="min-h-24"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
        <Textarea
          id="additionalNotes"
          placeholder="Any other information you'd like to share about your website vision?"
          value={formData.additionalNotes}
          onChange={(e) => updateFormData("additionalNotes", e.target.value)}
          className="min-h-24"
        />
      </div>
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Let's Build Your Website
          </DialogTitle>
          <p className="text-center text-muted-foreground">
            Tell us about yourself and your vision
          </p>
        </DialogHeader>

        <div className="py-6">
          {renderStepIndicator()}

          <div className="min-h-[400px]">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </div>

          <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={isSubmitting}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}

            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-500/90"
                style={currentStep === 1 ? { marginLeft: 'auto' } : {}}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-500/90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Payment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

