"use client";

import useCreateModal from "@/app/hooks/useCreateModal";
import { Plus, Users2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { AiFillHome, AiFillHeart, AiOutlinePlus} from 'react-icons/ai';
import { AiOutlineHome, AiOutlineHeart} from 'react-icons/ai';
import BottomBarItem from "./BottomBarItem";
import { FaTicketAlt } from 'react-icons/fa';
import { BiSolidParty } from 'react-icons/bi'
import useLoginModal from "@/app/hooks/useLoginModal";
import { useCallback } from "react";
import { SafeUser } from "@/app/types";

const homeIcon = AiFillHome;

interface BottomNavbarProps {
    currentUser?: SafeUser | null;
}

const BottomNavbar: React.FC<BottomNavbarProps> = ({
    currentUser,
}) => {
  const pathname = usePathname();
  const createModal = useCreateModal();
  const router = useRouter();

  const loginModal = useLoginModal();

  const onCreate = useCallback(() => {
    if (!currentUser) {
        return loginModal.onOpen();
    }
    createModal.onOpen();

}, [currentUser, loginModal])

  return (
    <div className="flex justify-center">
        <section className='
                    fixed 
                    bottom-0 
                    z-10 
                    
                    w-full
                    rounded-t-3xl
                    
                    bg-[#ffffff]
                    dark:bg-[#121212]
                    p-4 
                    
                    backdrop-filter
                    backdrop-blur-lg 
                    bg-opacity-40
                    dark:bg-opacity-40
                    xs:px-7 
                    md:hidden
            '>
            <div className='
                            flex 
                            items-center 
                            justify-between 
                            gap-3 
                            xs:gap-5
                '>
                <BottomBarItem
                    icon={AiFillHome}
                    label="Home"
                    link="/"
                    isActive = {pathname === '/'}
                    currentUser={currentUser}
                />

                <BottomBarItem
                    icon={AiFillHeart}
                    label="Favorites"
                    link="/likes"
                    isActive = {pathname === '/likes'}
                    currentUser={currentUser}
                />

                <div onClick={onCreate}>
                    <BottomBarItem
                        icon={AiOutlinePlus}
                        label="Add event"
                        circle
                        currentUser={currentUser}
                    />
                </div>

                <BottomBarItem
                    icon={FaTicketAlt}
                    label="My bookings"
                    link='/bookings'
                    isActive = {pathname === '/bookings'}
                    currentUser={currentUser}
                />
                <BottomBarItem
                    icon={BiSolidParty}
                    label="My events"
                    link='/my-events'
                    isActive = {pathname === '/my-events'}
                    currentUser={currentUser}
                />


            </div>
        </section>
    </div>
  );
}

export default BottomNavbar;