import getEventById from "@/app/actions/getEventById";
import EventRegiatrationModal from "./EventRegistrationForm";
import LikesModal from "@/app/components/modals/LikesModal";
import getUserById from "@/app/actions/getUserById";
import Liked from "@/app/components/modals/Liked";
import LocoScroll from "@/app/components/LocoScroll";
import Incomplete from "@/app/components/modals/Incomplete";
import { SafeUser } from "@/app/types";
import getCurrentUser from "@/app/actions/getCurrentUser";
import TicketModal from "@/app/events/[eventId]/TicketModal";
import { getTicketDetails } from "@/app/actions/getTicketDetails";
import generateQRCode from "@/app/utils/generateQRCode";

interface IParams {
    eventId?: string;
}

const MainLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: IParams;
}) => {
    const event = await getEventById(params);
    let users: SafeUser[] = [];
    const currentUser = await getCurrentUser();
    //@ts-ignore
    const ticket = await getTicketDetails(currentUser?.id, event?.id);
    const qrUrl = await generateQRCode(ticket);
    
    
    // if (likedBy && likedBy.length > 0) {
    //     await Promise.all(likedBy.map(async (userId) => {
    //         if (userId) {
    //             try {
    //                 const likedUser = await getUserById({ userId });
    //                 if (likedUser && likedUser) {
    //                     users.push(likedUser);
    //                 }
    //             } catch (error) {
    //                 console.error(`Error fetching user with ID ${userId}`);
    //             }
    //         }
    //     }));
    // }
    console.log(users);

    return ( 
        
            <main className="h-full">
                <EventRegiatrationModal currEvent={event} currentUser={currentUser}/>
                {/* <LikesModal 
                    likedBy={users}
                /> */}
                <TicketModal currEvent={event} currentUser={currentUser} qrUrl={qrUrl}/>
                <Incomplete/>
                <LocoScroll>
                {children}
                </LocoScroll>
            </main>
    );
}
 
export default MainLayout;