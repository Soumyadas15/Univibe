"use client"

import { SafeEvent } from "@/app/types";
import { useRouter } from "next/navigation";

interface SidebarItemProps {
    label?: string;
    path?: string;
    event?: SafeEvent;
    isActive?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    label,
    path,
    event,
    isActive
}) => {
    const router = useRouter();
    return ( 
        <div className = {`
                bg-neutral-300
                p-2 
                w-full 
                rounded-lg 
                cursor-pointer
                ${isActive ? 'bg-neutral-300' : 'bg-neutral-200'}
            `}
            onClick={() => {router.push(`/dashboard/${event?.id}/${path}`)}}
        >
            <div className="px-5">{label}</div>
        </div>
     );
}
 
export default SidebarItem;