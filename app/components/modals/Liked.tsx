import useLikesModal from "@/app/hooks/useLikesModal";
import { SafeEvent } from "@/app/types";
import Heading from "../Heading";
import Modal from "./Modal";


export default async function Liked(
    { event }: { event: SafeEvent }
){
    const likesModal = useLikesModal();
    // let likedBy = [...(event?.likedBy || [])];

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='People who are interested'
                center
            />
            <div>
            <h3>Liked By:</h3>
            <ul>
            {/* {likedBy.map((user, index) => (
                        <li key={index}>
                            {user}
                        </li>
                    ))} */}
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