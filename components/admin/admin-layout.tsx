"use client"

import type { ReactNode } from "react"
import { AdminSidebar } from "./admin-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

interface AdminLayoutProps {
  children: ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1">
          <div className="p-4 border-b flex items-center">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-xl font-semibold">Admin Panel</h1>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </SidebarProvider>
  )
}
