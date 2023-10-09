"use client"

import useWelcomeModal from "@/app/hooks/useWelcomeModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Lottie from "lottie-react";
import animationData from '../../../public/assets/animation_ln457zq4.json'
import { useConfettiStore } from "@/app/hooks/useConfettiStore";
import useSuccessModal from "@/app/hooks/useSuccessModal";
import useLikesModal from "@/app/hooks/useLikesModal";
import React, { useEffect, useState } from "react";
import Likes from "../Likes";
import { SafeEvent, SafeUser } from "@/app/types";
import getUserById from "@/app/actions/getUserById";

interface LikesModalProps {
    user?: SafeUser,
    event: SafeEvent,
}

const LikesModal: React.FC<LikesModalProps> = ({
    user,
    event,
}) => {
    const likesModal = useLikesModal();
    let likedBy = [...(event?.likedBy || [])];


    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='People who are interested'
                center
            />
            <div>
            <h3>Liked By:</h3>
            <ul>
                {likedBy?.map((item, index) => (
                    <li key={index}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
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