"use client"

import useWelcomeModal from "@/app/hooks/useWelcomeModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Lottie from "lottie-react";
import animationData from '../../../public/assets/sad_doge.json'
import { useConfettiStore } from "@/app/hooks/useConfettiStore";
import useIncompleteModal from "@/app/hooks/useIncompleteModal";


const Incomplete = () => {
    const incompleteModal = useIncompleteModal();
    const confettiStore = useConfettiStore();

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='This feature is not complete yet'
                subtitle= 'And I am working'
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
                isOpen = {incompleteModal.isOpen}
                title= "I'm sorry"
                actionLabel='Okay!'
                onClose={incompleteModal.onClose}
                onSubmit={incompleteModal.onClose}
                body={bodyContent}
            />
        </div>
     );
}
 
export default Incomplete;