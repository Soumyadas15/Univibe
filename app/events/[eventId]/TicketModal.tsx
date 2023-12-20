"use client"

import Modal from "../../components/modals/Modal";
import Heading from "../../components/Heading";
import Lottie from "lottie-react";
import animationData from '../../../public/assets/animation_ln457zq4.json'
import useTicketModal from "@/app/hooks/useTicketModal";
import { SafeEvent, SafeUser } from "@/app/types";

interface TicketModalProps {
    currentUser?: SafeUser | null;
    currEvent?: SafeEvent | null;
    qrUrl?: any;
}

const TicketModal: React.FC<TicketModalProps> = ({
    currentUser,
    currEvent,  
    qrUrl  
}) => {
    const ticketModal = useTicketModal();

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <div className="flex items-center justify-center">
                <div className="w-[20rem] h-[35rem] rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] flex items-center justify-center ">
                    <div className="w-[95%] h-[95%] flex flex-col items-center justify-between">
                        <div className="w-full h-[50%] flex items-center justify-center ">
                            <div className="">
                                <img src={qrUrl} alt="QR" height={150} width={150}/>
                            </div>
                            
                        </div>
                        <hr className="border-1 border-black w-[90%]"/>
                        <div className="w-full h-[55%]  rounded-lg">
                            
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )

    return ( 
        <div>
            <Modal
                isOpen = {ticketModal.isOpen}
                title= {`Your ticket for ${currEvent?.title}`}
                
                onClose={ticketModal.onClose}
                onSubmit={ticketModal.onClose}
                body={bodyContent}
            />
        </div>
     );
}
 
export default TicketModal;