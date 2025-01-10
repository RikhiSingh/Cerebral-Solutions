"use client"

import * as React from "react"
import {
  Building2Icon,
  Contact2Icon,
  FileChartLineIcon,
  FileTextIcon,
  FolderSearch2Icon,
  Frame,
  HammerIcon,
  HeartHandshakeIcon,
  LayoutDashboardIcon,
  MailPlusIcon,
  Map,
  PieChart,
  ReceiptTextIcon,
  SettingsIcon,
  WalletMinimalIcon,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/owner",
      icon: LayoutDashboardIcon
    },
    {
      title: "Properties",
      url: "#",
      icon: Building2Icon,
      // isActive: true,
      items: [
        {
          title: "All Properties",
          url: "/owner/properties",
        },
        {
          title: "All Units",
          url: "/owner/properties/units",
        },
        {
          title: "Own Properties",
          url: "/owner/properties/own-properties",
        },
        {
          title: "Lease Properties",
          url: "/owner/properties/lease-properties",
        },
      ],
    },
    {
      title: "Tenants",
      url: "#",
      icon: Contact2Icon,
      items: [
        {
          title: "All Tenants",
          url: "/owner/tenants",
        },
        {
          title: "Tenant History",
          url: "/owner/tenants/tenant-history",
        },
      ],
    },
    {
      title: "Billing Center",
      url: "#",
      icon: WalletMinimalIcon,
      items: [
        {
          title: "All Invoices",
          url: "/owner/invoices",
        },
        {
          title: "Recurring Setting",
          url: "/owner/invoices/recurring-setting",
        },
      ],
    },
    {
      title: "Expenses",
      url: "/owner/expenses",
      icon: ReceiptTextIcon,
    },
    {
      title: "Documents",
      url: "/owner/documents",
      icon: FileTextIcon,
    },
    {
      title: "Information",
      url: "/owner/information",
      icon: FolderSearch2Icon,
    },
    {
      title: "Maintainers",
      url: "#",
      icon: HammerIcon,
      items: [
        {
          title: "All Maintainers",
          url: "/owner/maintainers",
        },
        {
          title: "Maintenance Requests",
          url: "/owner/maintainers/maintenance-requests",
        }
      ]
    },
    {
      title: "Report",
      url: "#",
      icon: FileChartLineIcon,
      items: [
        {
          title: "Earnings",
          url: "/owner/reports/earnings",
        },
        {
          title: "Loss/Profit by Month",
          url: "/owner/reports/loss-profit-by-month",
        },
        {
          title: "Expenses",
          url: "/owner/reports/expenses",
        },
        {
          title: "Occupancy",
          url: "/owner/reports/occupancy",
        },
        {
          title: "Maintenance",
          url: "/owner/reports/maintenance",
        },
        {
          title: "Tenant",
          url: "/owner/reports/tenant",
        }
      ]
    },
    {
      title: "Settings",
      url: "/owner/settings",
      icon: SettingsIcon,
    },
    {
      title: "Bulk SMS / Mail",
      url: "#",
      icon: MailPlusIcon,
      items: [
        {
          title: "SMS",
          url: "/owner/sms",
        },
        {
          title: "E-Mail",
          url: "/owner/email",
        },
        {
          title: "E-Mail Templates",
          url: "/owner/email/email-templates",
        }
      ]
    },
    {
      title: "Agreements",
      url: "/owner/agreements",
      icon: HeartHandshakeIcon
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function OwnerSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="icon" {...props} className="">
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
