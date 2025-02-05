"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import base_url from "@/lib/base_url"

interface Foodtype {
  id: string
  name: string
  nameUz: string
  nameRu: string
  description?: string
  descriptionUz?: string
  descriptionRu?: string
}

export function EditFoodTypeForm({ foodType }: { foodType: Foodtype }) {
  const [formData, setFormData] = useState({
    name: foodType.name,
    nameUz: foodType.nameUz || "",
    nameRu: foodType.nameRu || "",
    description: foodType.description || "",
    descriptionUz: foodType.descriptionUz || "",
    descriptionRu: foodType.descriptionRu || "",
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
      const response = await fetch(`${base_url}/foodtype/foodtypes/${foodType.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to update food type")
      }

      router.push("/foodtypes/all")
      router.refresh()
    } catch (error) {
      console.error("Error updating food type:", error)
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
        <Label htmlFor="nameUz">Name (Uzbek)</Label>
        <Input id="nameUz" name="nameUz" value={formData.nameUz} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="nameRu">Name (Russian)</Label>
        <Input id="nameRu" name="nameRu" value={formData.nameRu} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input id="description" name="description" value={formData.description} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="descriptionUz">Description (Uzbek)</Label>
        <Input id="descriptionUz" name="descriptionUz" value={formData.descriptionUz} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="descriptionRu">Description (Russian)</Label>
        <Input id="descriptionRu" name="descriptionRu" value={formData.descriptionRu} onChange={handleChange} />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Updating..." : "Update Food Type"}
      </Button>
    </form>
  )
}

