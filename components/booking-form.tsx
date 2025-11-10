"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, ArrowLeft, Loader2, User, Briefcase, Globe, MessageSquare, Upload, X } from "lucide-react"
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
  images: string[] // Array of image URLs
}

export function BookingForm({ open, onOpenChange }: BookingFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscriptionLink, setSubscriptionLink] = useState("")
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
    images: [],
  })
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB in bytes
  const MAX_IMAGES = 10 // Maximum number of images

  const totalSteps = 3

  // Fetch payment links on mount
  useEffect(() => {
    fetchPaymentLinks()
  }, [])

  const fetchPaymentLinks = async () => {
    try {
      const response = await fetch('/api/payment-links')
      const data = await response.json()
      if (data.subscriptionLink) {
        setSubscriptionLink(data.subscriptionLink)
      } else {
        // Fallback to default if not set
        setSubscriptionLink("https://buy.stripe.com/eVqbJ2gwy49t5RL3RR0co03")
      }
    } catch (error) {
      console.error('Error fetching payment links:', error)
      // Fallback to default on error
      setSubscriptionLink("https://buy.stripe.com/eVqbJ2gwy49t5RL3RR0co03")
    }
  }

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

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const filesArray = Array.from(files)
    
    // Check total number of images
    if (uploadedImages.length + filesArray.length > MAX_IMAGES) {
      toast.error(`Maximum ${MAX_IMAGES} images allowed`)
      return
    }

    // Validate file sizes and types
    for (const file of filesArray) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} exceeds the ${MAX_FILE_SIZE / (1024 * 1024)}MB limit. Please choose a smaller file.`)
        return
      }
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not a valid image file`)
        return
      }
    }

    setIsUploading(true)
    const imageUrls: string[] = []

    try {
      // Upload each image
      for (const file of filesArray) {
        const uploadFormData = new FormData()
        uploadFormData.append('file', file)

        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: uploadFormData,
        })

        const responseData = await response.json()

        if (!response.ok) {
          const errorMessage = responseData.error || responseData.details || `Failed to upload ${file.name}`
          throw new Error(errorMessage)
        }

        const { url } = responseData
        if (!url) {
          throw new Error(`No URL returned for ${file.name}`)
        }
        imageUrls.push(url)
      }

      setUploadedImages(prev => [...prev, ...filesArray])
      setFormData(prev => ({ ...prev, images: [...prev.images, ...imageUrls] }))
      toast.success(`Successfully uploaded ${filesArray.length} image(s)`)
    } catch (error) {
      console.error('Error uploading images:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload images. Please try again.'
      toast.error(errorMessage)
      
      // If it's a configuration error, show a more helpful message
      if (errorMessage.includes('Storage bucket') || errorMessage.includes('policies')) {
        toast.error('Image upload is not configured. Please contact support.', { duration: 6000 })
      }
    } finally {
      setIsUploading(false)
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
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
      if (subscriptionLink) {
        window.location.href = subscriptionLink
      } else {
        toast.error("Payment link not configured. Please contact support.")
        setIsSubmitting(false)
      }
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
          placeholder="e.g., Get more leads, showcase my transformation results, establish credibility..."
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

      <div className="space-y-2">
        <Label htmlFor="images">Upload Images (Optional)</Label>
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-accent/50 transition-colors">
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={(e) => handleImageUpload(e.target.files)}
            className="hidden"
            disabled={isUploading || uploadedImages.length >= MAX_IMAGES}
          />
          <label
            htmlFor="images"
            className={`cursor-pointer flex flex-col items-center gap-2 ${isUploading || uploadedImages.length >= MAX_IMAGES ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Upload className="h-8 w-8 text-muted-foreground" />
            <div>
              <span className="text-sm font-medium text-foreground">
                Click to upload images
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                Maximum {MAX_IMAGES} images, {MAX_FILE_SIZE / (1024 * 1024)}MB per file
              </p>
            </div>
          </label>
        </div>

        {isUploading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Uploading images...
          </div>
        )}

        {uploadedImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            {uploadedImages.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border border-muted">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Personal trainer website image upload ${index + 1} - client photos for custom website design`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
                <p className="text-xs text-muted-foreground mt-1 truncate">{file.name}</p>
              </div>
            ))}
          </div>
        )}
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

