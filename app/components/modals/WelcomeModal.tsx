"use client"

import useWelcomeModal from "@/app/hooks/useWelcomeModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Lottie from "lottie-react";
import animationData from '../../../public/assets/animation_ln34g03s.json'
import { useConfettiStore } from "@/app/hooks/useConfettiStore";


const WelcomeModal = () => {
    const welcomeModal = useWelcomeModal();
    const confettiStore = useConfettiStore();

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Welcome to Univibe'
                subtitle= 'You have successfully signed up'
                center
            />
            <div className="flex items-center justify-center">
                <Lottie animationData={animationData} className="h-50 w-50 md:h-[150px] md:w-[150px]"/>
            </div>
        </div>
    )

    return ( 
        <div>
            <Modal
                isOpen = {welcomeModal.isOpen}
                title= "Hurray!"
                actionLabel='Done'
                onClose={welcomeModal.onClose}
                onSubmit={welcomeModal.onClose}
                body={bodyContent}
            />
        </div>
     );
}
 
export default WelcomeModal;