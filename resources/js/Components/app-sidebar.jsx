import * as React from "react";
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
    user: {
        name: "Supply Officer",
        email: "supply@region10.dost.gov.ph",
        avatar: "",
    },
    teams: [
        {
            name: "ISPMS",
            logo: GalleryVerticalEnd,
            plan: "DOST 10",
        },
    ],
    navMain: [
        {
            title: "Inventory",
            url: "#",
            icon: BookOpen,
            isActive: true,
            items: [
                {
                    title: "Stock In",
                    url: "/inventory/stock-in",
                },
                {
                    title: "Requests",
                    url: "/inventory/requests",
                },
                {
                    title: "Items",
                    url: "/inventory/items",
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="bg-slate-200">
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent className="bg-slate-200">
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter className="bg-slate-200">
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
