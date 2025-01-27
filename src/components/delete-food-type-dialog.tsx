"use client";

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import base_url from "@/lib/base_url"

interface DeleteFoodTypeDialogProps {
  foodTypeId: string
  foodTypeName: string
}

export function DeleteFoodTypeDialog({ foodTypeId, foodTypeName }: DeleteFoodTypeDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`${base_url}/foodtype/foodtypes/${foodTypeId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete food type")
      }

      toast({
        title: "Food Type Deleted",
        description: `${foodTypeName} has been successfully deleted.`,
      })
      setIsOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error deleting food type:", error)
      toast({
        title: "Error",
        description: "Failed to delete food type. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this food type?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
