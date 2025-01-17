"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { BarChart2, FileText, FolderInput, LogOut, Settings, ChevronLeft, ChevronRight, PieChart, Coffee } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Sidebar() {
  const [isCompact, setIsCompact] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => setIsCompact(!isCompact)

  const NavItem = ({ href, icon: Icon, children }: { href: string; icon: typeof BarChart2; children: React.ReactNode }) => {
  const pathname = usePathname()

  const hrefWithoutQuery = href.split('?')[0]

  const isActive = pathname === hrefWithoutQuery || (href !== '/' && pathname.startsWith(href))

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={cn(
            "flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100",
            isActive && "bg-blue-50 text-blue-600",
            isCompact && "justify-center"
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

  return (
    <TooltipProvider>
      <div className={cn(
        "bg-white border-r h-screen p-4 transition-all duration-300 flex flex-col",
        isCompact ? "w-16" : "w-64"
      )}>
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
        <nav className="space-y-2 flex-grow">
          <NavItem href="/" icon={BarChart2}>Dashboard</NavItem>
          <NavItem href="/foodtypes?page=1" icon={FileText}>Food types</NavItem>
          <NavItem href="/restaurants?page=1" icon={Coffee}>Restaurants</NavItem>
          <NavItem href="/statistics" icon={PieChart}>Statistics</NavItem>
          <NavItem href="/reports" icon={BarChart2}>Reports</NavItem>
          <NavItem href="/imports" icon={FolderInput}>File Imports</NavItem>
        </nav>
        <div className="mt-auto pt-4 space-y-2">
          <NavItem href="/settings" icon={Settings}>Settings</NavItem>
          <NavItem href="/logout" icon={LogOut}>Logout</NavItem>
        </div>
      </div>
    </TooltipProvider>
  )
}

