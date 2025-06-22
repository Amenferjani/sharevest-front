"use client"

import type * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    Building2,
    Calendar,
    Users,
    BarChart3,
    Bell,
    Download,
    Settings,
    LogOut,
    User,
    ChevronDown,
    Home,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/context/authContext"

// Navigation items
const navigationItems = [
    {
        title: "Dashboard",
        url: "/company-rep",
        icon: Home,
    },
    {
        title: "Companies",
        url: "/company-rep/companies",
        icon: Building2,
    },
    // {
    //     title: "Events",
    //     url: "/company-rep/events",
    //     icon: Calendar,
    // },
    // {
    //     title: "Investors",
    //     url: "/company-rep/investors",
    //     icon: Users,
    // },
]

const toolsItems = [
    // {
    //     title: "Analytics",
    //     url: "/company-rep/analytics",
    //     icon: BarChart3,
    // },
    {
        title: "Notifications",
        url: "/company-rep/notifications",
        icon: Bell,
        badge: "3",
    },
    // {
    //     title: "Bulk Operations",
    //     url: "/company-rep/bulk-operations",
    //     icon: Settings,
    // },
    // {
    //     title: "Exports",
    //     url: "/company-rep/exports",
    //     icon: Download,
    // },
]

function AppSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/hedge-manager">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <Building2 className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">RelVest</span>
                                    <span className="truncate text-xs">Company Portal</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigationItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Tools & Reports</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {toolsItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                            {item.badge && (
                                                <Badge variant="secondary" className="ml-auto">
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <UserDropdown />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

function UserDropdown() {
    const router = useRouter()
    const { logout, user } = useAuth()

    const handleLogout = async () => {
        logout();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarFallback className="rounded-lg">
                            {(user?.username &&
                                user.username.toUpperCase()
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")) || "?"}
                        </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">{user?.username}</span>
                        <span className="truncate text-xs">{user?.email}</span>
                    </div>
                    <ChevronDown className="ml-auto size-4" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarFallback className="rounded-lg ">
                                {(user?.username &&
                                    user.username.toUpperCase()
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")) || "?"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{user?.username}</span>
                            <span className="truncate text-xs">{user?.email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-red-600" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default function HedgeManagerLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    )
}

function Breadcrumb() {
    const pathname = usePathname()

    const getBreadcrumbText = () => {
        const segments = pathname.split("/").filter(Boolean)

        if (segments.length === 1) return "Dashboard"
        if (segments.length === 2) {
            const section = segments[1]
            return section.charAt(0).toUpperCase() + section.slice(1)
        }
        if (segments.length === 3) {
            const section = segments[1]
            const action = segments[2]
            if (action === "new" || action === "add") {
                return `Add ${section.slice(0, -1)}`
            }
            return `Edit ${section.slice(0, -1)}`
        }

        return "Company Portal"
    }

    return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Company Portal</span>
            {pathname !== "/company-rep" && (
                <>
                    <span>/</span>
                    <span className="text-foreground">{getBreadcrumbText()}</span>
                </>
            )}
        </div>
    )
}
