"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart2,
  FileText,
  FolderInput,
  LogOut,
  Settings,
  ChevronLeft,
  ChevronRight,
  PieChart,
  Coffee,
  Scale,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Sidebar() {
  const [isCompact, setIsCompact] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleSidebar = () => setIsCompact(!isCompact)

  const NavItem = ({
    href,
    icon: Icon,
    children,
  }: { href: string; icon: typeof BarChart2; children: React.ReactNode }) => {
    const isActive =
      pathname === href ||
      (href !== "/" && pathname.startsWith(href)) ||
      (href.includes("?") && pathname.startsWith(href.split("?")[0]))

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-sm rounded-lg",
              isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100",
              isCompact && "justify-center",
            )}
          >
            <Icon className="w-4 h-4" />
            {!isCompact && <span>{children}</span>}
          </Link>
        </TooltipTrigger>
        {isCompact && <TooltipContent side="right">{children}</TooltipContent>}
      </Tooltip>
    )
  }

  if (!mounted) {
    return null // or a loading placeholder
  }

  return (
    <TooltipProvider>
      <div
        className={cn(
          "bg-white border-r h-screen p-4 transition-all duration-300 flex flex-col",
          isCompact ? "w-16" : "w-64",
          "max-h-screen overflow-y-auto",
        )}
      >
        <div className="flex items-center justify-between mb-8">
          {!isCompact && <h1 className="text-xl font-bold">Admin</h1>}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto"
            aria-label={isCompact ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCompact ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        <nav className="space-y-2 flex-grow overflow-y-auto">
          <NavItem href="/" icon={BarChart2}>
            Dashboard
          </NavItem>
          <NavItem href="/foodtypes/all?page=1" icon={FileText}>
            Food types
          </NavItem>
          <NavItem href="/foodmeasures/all?page=1" icon={Scale}>
            Food Measures
          </NavItem>
          <NavItem href="/restaurants/all?page=1" icon={Coffee}>
            Restaurants
          </NavItem>
          <NavItem href="/statistics" icon={PieChart}>
            Statistics
          </NavItem>
          <NavItem href="/reports" icon={BarChart2}>
            Reports
          </NavItem>
          <NavItem href="/imports" icon={FolderInput}>
            File Imports
          </NavItem>
        </nav>
        <div className="mt-auto pt-4 space-y-2 flex-shrink-0">
          <NavItem href="/settings" icon={Settings}>
            Settings
          </NavItem>
          <NavItem href="/logout" icon={LogOut}>
            Logout
          </NavItem>
        </div>
      </div>
    </TooltipProvider>
  )
}