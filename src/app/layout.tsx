import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ClientSidebar } from "@/components/dynamic-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Register Dashboard",
  description: "Modern dashboard for record management",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
          <ClientSidebar />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  )
}