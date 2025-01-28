import { notFound } from "next/navigation"
import { EditFoodMeasureForm } from "@/components/edit-food-measure-form"
import base_url from "@/lib/base_url"

interface FoodMeasure {
  id: string
  name: string
  description: string
}

async function getFoodMeasure(id: string): Promise<FoodMeasure> {
  console.log(`${base_url}/foodmeasure/foodmeasure/${id}`)
  const res = await fetch(`${base_url}/foodmeasure/foodmeasure/${id}`, { cache: "no-store" })
  if (!res.ok) {
    throw new Error("Failed to fetch food measure")
  }
  return res.json()
}

export default async function EditFoodMeasurePage({ params }: { params: { id: string } }) {
  let foodMeasure: FoodMeasure

  try {
    foodMeasure = await getFoodMeasure(params?.id)
  } catch (error) {
    notFound()
  }

  return (
    <main className="flex-1 p-8 bg-gray-50 overflow-auto">
      <h1 className="text-2xl font-bold mb-8">Edit Food Measure</h1>
      <div className="bg-white rounded-lg border p-8 shadow max-w-md mx-auto">
        <EditFoodMeasureForm foodMeasure={foodMeasure} />
      </div>
    </main>
  )
}