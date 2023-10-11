"use client"

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";


interface BottomBarItem{
    icon: IconType;
    label: string;
    isActive?: boolean;
    circle?: boolean;
    link?: string;
    currentUser?: SafeUser | null;
}

const BottomBarItem: React.FC<BottomBarItem> = ({
    icon: Icon,
    label,
    isActive = false,
    circle,
    link,
    currentUser,
}) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const handleClick = () => {
        if (!currentUser){
            return loginModal.onOpen();
        }
        if(link){
            router.push(link);
        }
    }

    return ( 
        <div onClick={handleClick}>
                <div className="
                    flex
                    items-center
                    flex-col
                    gap-2
                ">
                    <div 
                        className={`
                            text-xl 
                            rounded-full 
                            cursor-pointer
                            ${circle ? 'bg-[#ff297f] p-2' : 'p-2'}
                            ${isActive ? 'dark:text-yellow-400 text-[#ff297f]' : ''}
                        `}
                    >
                        <Icon
                            size={24}
                            className='object-contain'
                        />
                    </div>

                    {/* <p className={`
                            
                            text-light-1 
                            max-sm:hidden
                            text-md
                            ${isActive ? 'text-yellow-400' : ''}
                        `}>
                        {label}
                    </p> */}
                </div>
            </div>
     );
}
 
export default BottomBarItem;