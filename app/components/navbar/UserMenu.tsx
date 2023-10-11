"use client"

import { ModeToggle } from "../toggle/ThemeToggle";
import Avatar from "./Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useWelcomeModal from "@/app/hooks/useWelcomeModal";
import useSuccessModal from "@/app/hooks/useSuccessModal";
import { useConfettiStore } from "@/app/hooks/useConfettiStore";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import toast from "react-hot-toast";
import useEmailModal from "@/app/hooks/useEmailModal";
import useCreateModal from "@/app/hooks/useCreateModal";
import { motion } from 'framer-motion';

const dropdownVariants = {
    hidden: { 
        opacity: 0, 
    },
    visible: { 
        opacity: 1, 
        transition: { 
            duration: 0.2,
            ease: "easeInOut",
        } 
    },
    exit: {
        opacity: 0,
        transition: { 
            duration: 0.2,
            ease: "easeInOut",
        } 
    }
};

interface UserMenuProps {
    currentUser?: SafeUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({
    currentUser,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const registerModal = useRegisterModal();
    const welcomeModal = useWelcomeModal();
    const confettiStore = useConfettiStore()
    const successModal = useSuccessModal();
    const loginModal = useLoginModal();
    const router = useRouter();
    const emailModal = useEmailModal()
    const createModal = useCreateModal();

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const addEventToggle = useCallback(() => {
        createModal.onOpen();
        setIsOpen(false);
    }, []);

    const loginToggle = useCallback(() => {
        loginModal.onOpen();
        setIsOpen(false);
    }, []);

    const signUpToggle = useCallback(() => {
        registerModal.onOpen();
        setIsOpen(false);
    }, []);

    const onCreate = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }
        createModal.onOpen();

    }, [currentUser, loginModal])

    return ( 
        <div className="relative">
            <div className="
                flex
                flex-row
                items-center
                gap-3
            ">
                <div 
                    onClick={onCreate}
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full

                        text-white
                        dark:text-black

                        bg-neutral-800
                        dark:bg-neutral-100

                        hover:opacity-75
                        transition
                        cursor-pointer
                ">
                    Create an event
                </div>
                <div
                    onClick={toggleOpen}
                    className="
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        transition
                        
                    "
                >
                    <Avatar/>
                </div>
                <ModeToggle/>
            </div>
            {isOpen && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit='exit'
                    variants={dropdownVariants}
                >
                <div
                className="
                    absolute 
                    rounded-xl 
                    shadow-md
                    w-[40vw]
                    md:w-3/4 
                    bg-white
                    dark:bg-black
                    overflow-hidden 
                    right-0 
                    top-12 
                    text-sm
                    text-black
                    dark:text-gray-200
                    "
                >
                    <div className="flex flex-col cursor-pointer">
                       
                    {currentUser ? (
                        <>
                            <MenuItem label="My favorites" onClick={() => {}} />
                            <MenuItem label="My registrations" onClick={() => {}} />
                            <MenuItem label="My events" onClick={() => {}} />
                            <MenuItem label="Add event" onClick={addEventToggle} />
                            <MenuItem label="Logout" onClick={() => signOut()} />
                        </>
                        ) : (
                        <>
                            <MenuItem label="Login" onClick={loginToggle} />
                            <MenuItem label="Sign up" onClick={signUpToggle} />
                        </>
                        )}
                    </div>
                </div>
                </motion.div>
            )}
        </div>
     );
}
 
export default UserMenu;