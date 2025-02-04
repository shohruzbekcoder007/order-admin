type Status = "success" | "error" | "loading"

export type ApiResponse<T, G> = {
  status?: Status
  data: T
  message?: string
} & G

export type ApiResponsePagination<T> = {
  data: T[]
} & Pagination

export type Pagination = {
  total: number
  currentPage: number
  totalPages: number
}

export type User = {
  id: string
  name: string
  email: string
  age: number
  firstName?: string
  lastName?: string
  fatherName?: string
  connects: number
  password: string
}

export type Restaurant = {
  id: string
  name: string
  address?: string
  latitude?: number
  longitude?: number
  about?: string
  phone?: number
}

export type Foodtype = {
  id: string
  name: string
  nameUz: string
  nameRu: string
  description?: string
  descriptionUz?: string
  descriptionRu?: string
}

export type FoodMeasure = {
  id: string
  name: string
  nameUz: string
  nameRu: string
  description: string
  descriptionUz: string
  descriptionRu: string
}

export type RestaurantType = {
  id: string
  name: string
  address?: string
  latitude?: number
  longitude?: number
  about?: string
  aboutUz?: string
  aboutRu?: string
  phone?: number
}

