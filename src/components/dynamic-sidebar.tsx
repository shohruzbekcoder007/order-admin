"use client"

import dynamic from "next/dynamic"

const DynamicSidebar = dynamic(() => import("./sidebar").then((mod) => mod.Sidebar), {
  ssr: false,
})

export function ClientSidebar() {
  return <DynamicSidebar />
}