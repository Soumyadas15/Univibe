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
            <Heading
                title='Show this during entry'
                center
            />
            <div className="flex items-center justify-center">
                <img src={qrUrl} alt="Ticket QR Code" />
            </div>
        </div>
    )

    return ( 
        <div>
            <Modal
                isOpen = {ticketModal.isOpen}
                title= {`Your ticket for ${currEvent?.title}`}
                actionLabel='Okay'
                onClose={ticketModal.onClose}
                onSubmit={ticketModal.onClose}
                body={bodyContent}
            />
        </div>
     );
}
 
export default TicketModal;