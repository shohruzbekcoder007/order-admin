import { notFound } from "next/navigation"
import { EditFoodTypeForm } from "@/components/edit-food-type-form"
import base_url from "@/lib/base_url"
import type { Foodtype } from "@/lib/module_types"

async function getFoodType(id: string): Promise<Foodtype> {
    console.log(`${base_url}/foodtype/foodtype/${id}`)
  const res = await fetch(`${base_url}/foodtype/foodtype/${id}`, { cache: "no-store" })
  if (!res.ok) {
    throw new Error("Failed to fetch food type")
  }
  return res.json()
}

export default async function EditFoodTypePage({ params }: { params: { id: string } }) {
  let foodType: Foodtype

  try {
    foodType = await getFoodType(params?.id)
  } catch (error) {
    notFound()
  }

  return (
    <main className="flex-1 p-8 bg-gray-50 overflow-auto">
      <h1 className="text-2xl font-bold mb-8">Edit Food Type</h1>
      <div className="bg-white rounded-lg border p-8 shadow max-w-md mx-auto">
        <EditFoodTypeForm foodType={foodType} />
      </div>
    </main>
  )
}

