"use client"

import useWelcomeModal from "@/app/hooks/useWelcomeModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Lottie from "lottie-react";
import animationData from '../../../public/assets/animation_ln7mb1dg.json'
import { useConfettiStore } from "@/app/hooks/useConfettiStore";
import useEmailModal from "@/app/hooks/useEmailModal";


const EmailModal = () => {
    const emailModal = useEmailModal();
    const confettiStore = useConfettiStore();

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Verify your email'
                // subtitle= 'You have successfully signed up'
                center
            />
            <div className="flex items-center justify-center">
                <Lottie animationData={animationData} className="h-[150px] w-[150px]"/>
            </div>
        </div>
    )

    return ( 
        <div>
            <Modal
                isOpen = {emailModal.isOpen}
                title= "You're almost there"
                actionLabel='Okay'
                onClose={emailModal.onClose}
                onSubmit={emailModal.onClose}
                body={bodyContent}
            />
        </div>
     );
}
 
export default EmailModal;