"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import base_url from "@/lib/base_url"

interface FoodMeasure {
  id: string
  name: string
  description: string
}

export function EditFoodMeasureForm({ foodMeasure }: { foodMeasure: FoodMeasure }) {
  const [formData, setFormData] = useState({
    name: foodMeasure.name,
    description: foodMeasure.description || "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${base_url}/foodmeasure/foodmeasure/${foodMeasure.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to update food measure")
      }

      toast({
        title: "Food Measure Updated",
        description: `${formData.name} has been successfully updated.`,
      })
      router.push("/foodmeasures/all")
      router.refresh()
    } catch (error) {
      console.error("Error updating food measure:", error)
      toast({
        title: "Error",
        description: "Failed to update food measure. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input id="description" name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Updating..." : "Update Food Measure"}
      </Button>
    </form>
  )
}