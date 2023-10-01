"use client"

import useWelcomeModal from "@/app/hooks/useWelcomeModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Lottie from "lottie-react";
import animationData from '../../../public/assets/animation_ln457zq4.json'
import { useConfettiStore } from "@/app/hooks/useConfettiStore";
import useSuccessModal from "@/app/hooks/useSuccessModal";


const SuccessModal = () => {
    const successModal = useSuccessModal();
    const confettiStore = useConfettiStore();

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Successfully created event!'
                // subtitle= 'You have successfully signed up'
                center
            />
            <div className="flex items-center justify-center">
                <Lottie animationData={animationData}/>
            </div>
        </div>
    )

    return ( 
        <div>
            <Modal
                isOpen = {successModal.isOpen}
                title= "Hurray!"
                actionLabel='Done'
                onClose={successModal.onClose}
                onSubmit={confettiStore.onOpen}
                body={bodyContent}
            />
        </div>
     );
}
 
export default SuccessModal;