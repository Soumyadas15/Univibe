"use client"

import Modal from "../../components/modals/Modal";
import Heading from "../../components/Heading";
import Lottie from "lottie-react";
import animationData from '../../../public/assets/animation_ln457zq4.json'
import useTicketModal from "@/app/hooks/useTicketModal";
import { SafeEvent, SafeUser } from "@/app/types";
import moment from "moment";

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

    const formattedDate = moment(currEvent?.date).format("MMMM D, YYYY");
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const [month, day, year] = formattedDate.split(' ');
    const abbreviatedMonth = month.substring(0, 3);
    const trimmedDay = day.slice(0, -1);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <div className="flex items-center justify-center">
                <div className="w-[20rem] h-[35rem] rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] flex items-center justify-center bg-gradient-to-b from-pink-600 to-violet-600">
                    <div className="w-[95%] h-[95%] flex flex-col items-center justify-between">
                        <div className="w-full h-[50%] flex items-center justify-center ">
                            <div className="">
                                <img src={qrUrl} alt="QR" height={150} width={150}/>
                            </div>
                            
                        </div>
                        <hr className="border-1 border-white w-[90%]"/>
                        <div className="w-full h-[55%] rounded-lg flex items-end">
                            <div className="w-full h-[90%] flex flex-col items-center justify-between">
                                <div className="text-2xl font-semibold text-white">{currEvent?.title}</div>
                                <div className="w-[90%] h-[80%] flex flex-col gap-6">
                                    <div className="flex flex-col gap-2">
                                        <div className="text-white text-sm">{trimmedDay} {abbreviatedMonth} {year}</div> 
                                        <div className="text-white text-sm">{currEvent?.college}</div> 
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="text-white text-sm">Booked by: {currentUser?.name}</div> 
                                        <div className="text-white text-sm">{currEvent?.college}</div> 
                                    </div>
                                </div>
                            </div>
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