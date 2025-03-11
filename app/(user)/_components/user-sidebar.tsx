"use client";

import * as React from "react";
import {
  Building2Icon,
  LayoutDashboardIcon,
  SettingsIcon,
  VideoIcon,
  CalendarDaysIcon,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/user",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Reports",
      url: "#",
      icon: Building2Icon,
      // isActive: true,
      items: [
        {
          title: "Latest Reports",
          url: "/user/reports",
        },
        {
          title: "All Reports",
          url: "/user/all-reports",
        },
      ],
    },
    {
      title: "Video Chat",
      url: "/user/video-chat",
      icon: VideoIcon,
    },
    {
      title: "Schedule Appointment",
      url: "/user/schedule-appointment",
      icon: CalendarDaysIcon,
    },
    {
      title: "Settings",
      url: "/user/settings",
      icon: SettingsIcon,
    },
  ],
};

export function UserSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="">
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
