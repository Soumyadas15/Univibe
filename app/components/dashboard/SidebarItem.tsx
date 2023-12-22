"use client"

import { SafeEvent } from "@/app/types";
import { useRouter } from "next/navigation";

interface Icon {
    component: React.ReactElement;
    style?: React.CSSProperties;
}

interface SidebarItemProps {
    label?: string;
    path?: string;
    event?: SafeEvent;
    isActive?: boolean;
    icon?: Icon;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    label,
    path,
    event,
    isActive,
    icon
}) => {
    const router = useRouter();
    return ( 
        <div className = {`
                p-2
                w-full 
                rounded-lg 
                cursor-pointer
                flex
                items-center
                justify-center
                ${isActive ? 'bg-neutral-300 dark:bg-neutral-700' : 'bg-neutral-200 dark:bg-black'}
            `}
            onClick={() => {router.push(`/dashboard/${event?.id}/${path}`)}}
        >
            <div className="w-[90%] h-[90%] flex justify-start gap-3">
                {icon && (
                    <div style={icon.style} className="">
                        {icon.component}
                    </div>
                )}
                <div className="text-md">{label}</div>
            </div>
            
        </div>
     );
}
 
export default SidebarItem;