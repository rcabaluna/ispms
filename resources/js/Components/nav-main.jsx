"use client";

import { ChevronRight } from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "@inertiajs/react";

export function NavMain({ items }) {
    return (
        <SidebarGroup className="text-white">
            <SidebarGroupLabel className="text-white">
                Modules
            </SidebarGroupLabel>
            <SidebarMenu className="text-white">
                {items.map((item) => (
                    <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={item.isActive}
                        className="group/collapsible text-white"
                    >
                        <SidebarMenuItem className="text-white">
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton
                                    tooltip={item.title}
                                    className="text-white
                                               hover:bg-[hsl(var(--primary-light))] 
                                               transition-colors duration-200"
                                >
                                    {item.icon && (
                                        <item.icon className="text-white" />
                                    )}
                                    <span>{item.title}</span>
                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-white" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub className="text-white">
                                    {item.items?.map((subItem) => (
                                        <SidebarMenuSubItem
                                            key={subItem.title}
                                            className="text-white"
                                        >
                                            <SidebarMenuSubButton
                                                asChild
                                                className="text-white
                                                           hover:bg-[hsl(var(--primary-light))] 
                                                           transition-colors duration-200"
                                            >
                                                <Link
                                                    href={subItem.url}
                                                    className="block w-full px-3 py-2 text-white"
                                                >
                                                    <span>{subItem.title}</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
