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
import Image from "next/image";
import Avatar from "../navbar/Avatar";
import { categories } from "@/app/utils/categories";
import CategoryInput from "../inputs/CategoryInput";
import EmptyState from "../EmptyState";
import EmptySignIn from "../EmptySignIn";

interface LikesModalProps {
    likedBy: SafeUser[],
}

const LikesModal: React.FC<LikesModalProps> = ({
    likedBy,
}) => {
    const likesModal = useLikesModal();

    let bodyContent = (
        <div className="object-fit">
                
                <div className="flex flex-col gap-8">
                <Heading
                    title='People who are interested'
                    center
                />
                <div className="flex flex-col gap-6">
                    <div className="font-semibold">Liked by</div>
                    <hr className="border-t-1 border-neutral-500 dark:border-neutral-800" />
                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-1
                            gap-3
                            max-h-[50vh]
                            overflow-y-auto
                        "
                    >
                        {likedBy.map((user, index) => (
                                <div key={index} className="">
                                <div className="flex gap-2 items-center">
                                        <Avatar/>
                                        <div>
                                            {user?.name}
                                        </div>
                                </div>
                                </div>
                        ))}
                        
                        </div>
                </div>
            </div>
        </div>
    )

    if (likedBy.length == 0){

        bodyContent = (
            <div className="object-fit">
                    
                    <div className="flex flex-col gap-8">
                        <Heading
                            title='People who are interested'
                            center
                        />
                        <EmptySignIn
                            title="No likes yet"
                            subtitle=""
                        />
                </div>
            </div>
        )
    }

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