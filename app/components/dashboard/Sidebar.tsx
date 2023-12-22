"use client"

import { SafeEvent, SafeUser } from "@/app/types";
import Avatar from "../navbar/Avatar";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";

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
                w-60
                h-screen
                flex
                items-center
                -mt-10
                justify-center

        ">
            <div className="h-[90%] w-[90%]  flex flex-col items-center gap-6 text-lg font-semiboold">
                <div className="p-2 w-full flex gap-4 items-center">
                    <div className="scale-[1.2]">
                        <Avatar/>
                    </div>
                    
                    <div className="flex flex-col">
                        <div className="font-semibold">{currentUser?.name}</div>
                        <div className="text-sm">Administrator</div>
                    </div>
                </div>
                <hr className="border-1 border-neutral-500 w-[90%]"/>
                <div className="flex flex-col items-center gap-4 w-[90%]">
                   
                    <SidebarItem label="Details" event={event!} path="" isActive={pathname === `/dashboard/${event?.id}`}/>
                    
                    <SidebarItem label="Analytics" event={event!} path="analytics" isActive={pathname === `/dashboard/${event?.id}/analytics`}/>
                    
                    <SidebarItem label="Registrations" event={event!} path="registrations" isActive={pathname === `/dashboard/${event?.id}/registrations`}/>
                </div>
                
            </div>
        </div>
     );
}
 
export default Sidebar;