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
import LogName from "../LogName";

interface LikesModalProps {
    user?: SafeUser,
    event: SafeEvent,
}
interface User {
    name: string | null;
}

const LikesModal: React.FC<LikesModalProps> = ({
    user,
    event,
}) => {
    const likesModal = useLikesModal();
    let likedBy = [...(event?.likedBy || [])];
    const [likedUsers, setLikedUsers] = useState<User[]>([]);
    const [userName, setUserName] = useState('Hey');

    useEffect(() => {
        const fetchData = async () => {
          try {
            const name = await LogName();
            console.log("LOL")
            console.log(name);
          } catch (error) {
            console.error("Error fetching user:", error);
          }
        };
    
        fetchData();
      }, []);


    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='People who are interested'
                center
            />
            <div>
            <h3>Liked By:</h3>
            <ul>
            {likedBy.map((user, index) => (
                        <li key={index}>
                            {user}
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