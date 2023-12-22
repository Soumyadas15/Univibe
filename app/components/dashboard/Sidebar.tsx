"use client"

import { SafeEvent, SafeUser } from "@/app/types";
import Avatar from "../navbar/Avatar";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";
import { Users } from "lucide-react";
import { BarChart4 } from "lucide-react";
import { Pencil } from "lucide-react";
import Logo from "../navbar/Logo";
import { ModeToggle } from "../toggle/ThemeToggle";

interface SidebarProps {
    currentUser: SafeUser | null;
    event: SafeEvent | null;
}
const Sidebar: React.FC<SidebarProps> = ({
    currentUser,
    event
}) => {
    const pathname = usePathname();
    return ( 
        <div className="
                bg-neutral-200
                dark:bg-black
                w-60
                h-screen
                flex
                items-center
                justify-center

        ">
            <div className="h-[90%] w-[90%]  flex flex-col items-center gap-6 text-lg font-semiboold  justify-between ">
                
                <div className=" flex flex-col gap-6 w-full items-center ">
                    <div className="w-[90%] flex flex-col items-start">
                        <Logo/>
                    </div>
                    <hr className="border-1 border-neutral-500 w-[90%]"/>
                    <div className="flex flex-col items-center gap-4 w-[90%]">
                    
                        <SidebarItem 
                            label="Details" 
                            event={event!} 
                            path="" 
                            isActive={pathname === `/dashboard/${event?.id}`}
                            icon={{ component: <Pencil />, style: { color: 'red' }}}
                        />
                        
                        <SidebarItem 
                            label="Analytics" 
                            event={event!} 
                            path="analytics" 
                            isActive={pathname === `/dashboard/${event?.id}/analytics`}
                            icon={{ component: <BarChart4 />, style: { color: 'red' }}}
                        />
                        
                        <SidebarItem 
                            label="Registrations" 
                            event={event!} 
                            path="registrations" 
                            isActive={pathname === `/dashboard/${event?.id}/registrations`}
                            icon={{ component: <Users />, style: { color: 'red' }}}
                        />
                    </div>
                </div>
                <div className="w-[90%] flex">
                    <ModeToggle/>
                </div>
            </div>
        </div>
     );
}
 
export default Sidebar;