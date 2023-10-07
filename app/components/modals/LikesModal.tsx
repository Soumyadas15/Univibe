"use client"

import useWelcomeModal from "@/app/hooks/useWelcomeModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Lottie from "lottie-react";
import animationData from '../../../public/assets/animation_ln457zq4.json'
import { useConfettiStore } from "@/app/hooks/useConfettiStore";
import useSuccessModal from "@/app/hooks/useSuccessModal";
import useLikesModal from "@/app/hooks/useLikesModal";
import React from "react";
import Likes from "../Likes";

interface LikesModalProps {
    likedBy: String[],
}
const LikesModal: React.FC<LikesModalProps> = ({
    likedBy,
}) => {
    const likesModal = useLikesModal();

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='People who are interested'
                center
            />
            
        </div>
    )

    return ( 
        <div>
            <Modal
                isOpen = {likesModal.isOpen}
                title= "Liked by"
                actionLabel='Done'
                onClose={likesModal.onClose}
                onSubmit={likesModal.onClose}
                body={bodyContent}
            />
        </div>
     );
}
 
export default LikesModal;