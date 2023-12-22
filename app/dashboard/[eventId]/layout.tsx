import getEventById from "@/app/actions/getEventById";
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
import Sidebar from "@/app/components/dashboard/Sidebar";

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
    
    console.log(users);

    return ( 
        
            <main className="flex w-full">
                    <div className="w-full h-[30rem]">
                        {children}
                    </div>
                
            </main>
    );
}
 
export default MainLayout;