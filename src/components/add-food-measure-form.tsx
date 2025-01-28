"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogFooter } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import base_url from "@/lib/base_url"

export function AddFoodMeasureForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
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
      const response = await fetch(`${base_url}/foodmeasure/foodmeasures`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to add food measure")
      }

      toast({
        title: "Food Measure Added",
        description: `${formData.name} has been successfully added.`,
      })
      router.refresh()
      setFormData({ name: "", description: "" })
    } catch (error) {
      console.error("Error adding food measure:", error)
      toast({
        title: "Error",
        description: "Failed to add food measure. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Food Measure"}
        </Button>
      </DialogFooter>
    </form>
  )
}

