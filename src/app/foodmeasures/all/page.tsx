import { ChevronLeft, ChevronRight, Plus, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AddFoodMeasureForm } from "@/components/add-food-measure-form"
import Link from "next/link"
import base_url from "../../../lib/base_url"
import type { ApiResponsePagination } from "@/lib/module_types"
import { DeleteFoodMeasureDialog } from "@/components/delete-food-measure-dialog"

interface FoodMeasure {
  id: string
  name: string
  description: string
}

interface FoodMeasureProps {
  searchParams: { page?: string; limit?: string }
}

async function fetchData(page: number, limit: number): Promise<ApiResponsePagination<FoodMeasure>> {
  console.log(`Fetching data from: ${base_url}/foodmeasure/foodmeasures?page=${page}&limit=${limit}`)

  try {
    const response = await fetch(`${base_url}/foodmeasure/foodmeasures?page=${page}&limit=${limit}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, statusText: ${response.statusText}`)
    }

    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Unexpected content type: ${contentType}`)
    }

    const result = await response.json()

    if (!result.data || !Array.isArray(result.data)) {
      throw new Error(`Invalid data structure: ${JSON.stringify(result)}`)
    }

    return result
  } catch (error) {
    console.error("Error in fetchData:", error)
    throw error
  }
}

export default async function FoodMeasurePage({ searchParams }: FoodMeasureProps) {
  const currentPage = Number.parseInt(searchParams.page || "1", 10)
  const countLimit = Number.parseInt(searchParams.limit || "5", 10)

  let data: FoodMeasure[] = []
  let total = 0
  let totalPages = 0
  let error: Error | null = null

  try {
    const result = await fetchData(currentPage, countLimit)
    data = result.data
    total = result.total
    totalPages = result.totalPages
  } catch (e) {
    error = e instanceof Error ? e : new Error("An unknown error occurred")
    console.error("Error in FoodMeasurePage:", error)
  }

  if (error) {
    return (
      <main className="flex-1 p-8 bg-gray-50 overflow-auto">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold mb-4">Error Loading Food Measures</h1>
          <p className="text-red-500 mb-2">An error occurred while fetching food measures.</p>
          <p className="text-gray-700 mb-4">{error.message}</p>
          <p className="text-gray-500">Please try again later or contact support if the problem persists.</p>
          <pre className="mt-4 p-4 bg-gray-100 rounded-md overflow-auto text-left">
            <code>{JSON.stringify({ error: error.message, stack: error.stack }, null, 2)}</code>
          </pre>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 p-8 bg-gray-50 overflow-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Food Measures</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Food Measure
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Food Measure</DialogTitle>
            </DialogHeader>
            <AddFoodMeasureForm />
          </DialogContent>
        </Dialog>
      </div>

      {data.length > 0 ? (
        <div className="bg-white rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-sm">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((foodMeasure, index) => (
                  <tr key={foodMeasure.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-3 px-4">{foodMeasure.id}</td>
                    <td className="py-3 px-4">{foodMeasure.name}</td>
                    <td className="py-3 px-4">{foodMeasure.description}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Link href={`/foodmeasures/${foodMeasure.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </Link>
                        <DeleteFoodMeasureDialog foodMeasureId={foodMeasure.id} foodMeasureName={foodMeasure.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-4 py-3 border-t">
            <div className="text-sm text-gray-500">
              Showing {data.length} of {total} entries
            </div>
            <div className="flex gap-2">
              {currentPage > 1 && (
                <Link href={`/foodmeasures/all?page=${currentPage - 1}&limit=${countLimit}`}>
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </Link>
              )}
              {currentPage < totalPages && (
                <Link href={`/foodmeasures/all?page=${currentPage + 1}&limit=${countLimit}`}>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No food measures found.</p>
          <p className="text-gray-500">Try adding some food measures or check back later.</p>
        </div>
      )}
    </main>
  )
}