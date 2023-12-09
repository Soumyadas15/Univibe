"use client"

import useWelcomeModal from "@/app/hooks/useWelcomeModal";

import Lottie from "lottie-react";
import animationData from '../../../public/assets/animation_ln457zq4.json'
import { useConfettiStore } from "@/app/hooks/useConfettiStore";
// import { useRegisterSuccess } from '@/app/hooks/useRegisterSuccess'
import useSuccessModal from "@/app/hooks/useSuccessModal";
import Heading from "../../components/Heading";
import Modal from "../../components/modals/Modal";
import useEventRegistrationModal from "@/app/hooks/useEventRegistrationModal";
import useRegisterSuccess from "@/app/hooks/useRegisterSuccess";


const RegistrationSuccessModal = () => {
    const registerSuccess = useRegisterSuccess();
    const confettiStore = useConfettiStore();

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Successfully registered for event!'
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
                isOpen = {registerSuccess.isOpen}
                title= "Hurray!"
                actionLabel='Finish'
                onClose={registerSuccess.onClose}
                onSubmit={registerSuccess.onClose}
                body={bodyContent}
            />
        </div>
     );
}
 
export default RegistrationSuccessModal;