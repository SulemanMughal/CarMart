"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Check, Upload, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function AddListingPage() {
  const { toast } = useToast()
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    condition: "used",
    year: "",
    make: "",
    model: "",
    mileage: "",
    fuel: "",
    transmission: "",
    color: "",
    body: "",
    doors: "",
    seats: "",
    features: [] as string[],
    location: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    images: [] as string[],
  })

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleFeature = (feature: string) => {
    if (formData.features.includes(feature)) {
      updateFormData(
        "features",
        formData.features.filter((f) => f !== feature),
      )
    } else {
      updateFormData("features", [...formData.features, feature])
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, you would upload the image to a server
    // For this demo, we'll just use placeholder images
    if (formData.images.length >= 5) {
      toast({
        title: "Maximum images reached",
        description: "You can upload a maximum of 5 images.",
        variant: "destructive",
      })
      return
    }

    updateFormData("images", [
      ...formData.images,
      `/placeholder.svg?height=200&width=300&text=Image ${formData.images.length + 1}`,
    ])
  }

  const removeImage = (index: number) => {
    updateFormData(
      "images",
      formData.images.filter((_, i) => i !== index),
    )
  }

  const nextStep = () => {
    // Validate current step
    if (step === 1) {
      if (!formData.title || !formData.price || !formData.condition) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        return
      }
    } else if (step === 2) {
      if (!formData.year || !formData.make || !formData.model || !formData.mileage) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        return
      }
    } else if (step === 3) {
      if (formData.images.length === 0) {
        toast({
          title: "Missing images",
          description: "Please upload at least one image.",
          variant: "destructive",
        })
        return
      }
    } else if (step === 4) {
      if (!formData.contactName || !formData.contactEmail || !formData.contactPhone) {
        toast({
          title: "Missing contact information",
          description: "Please fill in all contact information.",
          variant: "destructive",
        })
        return
      }
    }

    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = () => {
    // In a real app, you would submit the form data to a server
    toast({
      title: "Listing submitted successfully!",
      description: "Your car listing has been submitted and is pending review.",
    })

    // Redirect to home page after a short delay
    setTimeout(() => {
      router.push("/")
    }, 2000)
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">
                Listing Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g. 2021 Toyota Camry SE"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your car in detail..."
                className="min-h-[150px]"
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price">
                  Price <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g. 25000"
                  value={formData.price}
                  onChange={(e) => updateFormData("price", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Condition <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={formData.condition}
                  onValueChange={(value) => updateFormData("condition", value)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new">New</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="used" id="used" />
                    <Label htmlFor="used">Used</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="year">
                  Year <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="e.g. 2021"
                  value={formData.year}
                  onChange={(e) => updateFormData("year", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mileage">
                  Mileage <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mileage"
                  type="number"
                  placeholder="e.g. 15000"
                  value={formData.mileage}
                  onChange={(e) => updateFormData("mileage", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="make">
                  Make <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.make} onValueChange={(value) => updateFormData("make", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select make" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toyota">Toyota</SelectItem>
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="ford">Ford</SelectItem>
                    <SelectItem value="chevrolet">Chevrolet</SelectItem>
                    <SelectItem value="nissan">Nissan</SelectItem>
                    <SelectItem value="bmw">BMW</SelectItem>
                    <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                    <SelectItem value="audi">Audi</SelectItem>
                    <SelectItem value="tesla">Tesla</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">
                  Model <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="model"
                  placeholder="e.g. Camry"
                  value={formData.model}
                  onChange={(e) => updateFormData("model", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fuel">Fuel Type</Label>
                <Select value={formData.fuel} onValueChange={(value) => updateFormData("fuel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gasoline">Gasoline</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="plugin_hybrid">Plug-in Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission</Label>
                <Select value={formData.transmission} onValueChange={(value) => updateFormData("transmission", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="cvt">CVT</SelectItem>
                    <SelectItem value="semi-automatic">Semi-Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  placeholder="e.g. White"
                  value={formData.color}
                  onChange={(e) => updateFormData("color", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="doors">Doors</Label>
                <Select value={formData.doors} onValueChange={(value) => updateFormData("doors", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select doors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Doors</SelectItem>
                    <SelectItem value="3">3 Doors</SelectItem>
                    <SelectItem value="4">4 Doors</SelectItem>
                    <SelectItem value="5">5 Doors</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">Body Type</Label>
                <Select value={formData.body} onValueChange={(value) => updateFormData("body", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedan</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="coupe">Coupe</SelectItem>
                    <SelectItem value="truck">Truck</SelectItem>
                    <SelectItem value="hatchback">Hatchback</SelectItem>
                    <SelectItem value="wagon">Wagon</SelectItem>
                    <SelectItem value="convertible">Convertible</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Features</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {[
                  "Navigation System",
                  "Bluetooth",
                  "Backup Camera",
                  "Heated Seats",
                  "Sunroof",
                  "Leather Seats",
                  "Keyless Entry",
                  "Cruise Control",
                  "Climate Control",
                  "Parking Sensors",
                  "Apple CarPlay",
                  "Android Auto",
                ].map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature.toLowerCase().replace(/\s+/g, "-")}
                      checked={formData.features.includes(feature)}
                      onCheckedChange={() => toggleFeature(feature)}
                    />
                    <Label htmlFor={feature.toLowerCase().replace(/\s+/g, "-")}>{feature}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g. New York, NY"
                value={formData.location}
                onChange={(e) => updateFormData("location", e.target.value)}
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>
                Upload Images <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-gray-500">
                Upload up to 5 images of your car. The first image will be used as the main image.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Car image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                    {index === 0 && (
                      <span className="absolute top-1 left-1 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                        Main
                      </span>
                    )}
                  </div>
                ))}

                {formData.images.length < 5 && (
                  <div className="aspect-video bg-gray-100 rounded-md flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">Upload Image</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                      onChange={handleImageUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById("image-upload")?.click()}
                    >
                      Browse
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="contactName">
                Contact Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactName"
                placeholder="Your name"
                value={formData.contactName}
                onChange={(e) => updateFormData("contactName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="Your email"
                value={formData.contactEmail}
                onChange={(e) => updateFormData("contactEmail", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">
                Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactPhone"
                placeholder="Your phone number"
                value={formData.contactPhone}
                onChange={(e) => updateFormData("contactPhone", e.target.value)}
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center gap-3">
              <div className="bg-green-100 rounded-full p-1">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-green-800">Your listing is ready to submit</h3>
                <p className="text-green-600 text-sm">Please review your information before submitting.</p>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-4">Car Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Title</p>
                        <p className="font-medium">{formData.title}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="font-medium">${Number.parseInt(formData.price).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Condition</p>
                        <p className="font-medium">{formData.condition === "new" ? "New" : "Used"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Year</p>
                        <p className="font-medium">{formData.year}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Make & Model</p>
                        <p className="font-medium">
                          {formData.make.charAt(0).toUpperCase() + formData.make.slice(1)} {formData.model}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Mileage</p>
                        <p className="font-medium">{Number.parseInt(formData.mileage).toLocaleString()} mi</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{formData.contactName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{formData.contactEmail}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{formData.contactPhone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-bold text-lg mb-4">Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Car image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {formData.description && (
                  <div className="mt-6">
                    <h3 className="font-bold text-lg mb-2">Description</h3>
                    <p className="text-gray-700">{formData.description}</p>
                  </div>
                )}

                {formData.features.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-bold text-lg mb-2">Features</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {formData.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="py-12 flex-grow bg-gray-50">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Add Car Listing</h1>

          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-4 bg-gray-50 border-b">
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5].map((stepNumber) => (
                  <div
                    key={stepNumber}
                    className={`flex flex-col items-center ${
                      stepNumber < step ? "text-orange-500" : stepNumber === step ? "text-orange-500" : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                        stepNumber < step
                          ? "bg-orange-500 text-white"
                          : stepNumber === step
                            ? "border-2 border-orange-500 text-orange-500"
                            : "border-2 border-gray-300 text-gray-400"
                      }`}
                    >
                      {stepNumber < step ? <Check className="h-4 w-4" /> : stepNumber}
                    </div>
                    <span className="text-xs hidden md:block">
                      {stepNumber === 1
                        ? "Basic Info"
                        : stepNumber === 2
                          ? "Car Details"
                          : stepNumber === 3
                            ? "Images"
                            : stepNumber === 4
                              ? "Contact"
                              : "Review"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6">
              <form>
                {renderStepContent()}

                <div className="flex justify-between mt-8">
                  {step > 1 ? (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  {step < 5 ? (
                    <Button type="button" className="bg-orange-500 hover:bg-orange-600" onClick={nextStep}>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="button" className="bg-orange-500 hover:bg-orange-600" onClick={handleSubmit}>
                      Submit Listing
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
