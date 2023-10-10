import getEventById from "@/app/actions/getEventById";
import EventRegiatrationModal from "./EventRegistrationForm";
import LikesModal from "@/app/components/modals/LikesModal";
import getUserById from "@/app/actions/getUserById";
import Liked from "@/app/components/modals/Liked";
import LocoScroll from "@/app/components/LocoScroll";

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

    return ( 
        
            <div className="h-full">
            <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
                <EventRegiatrationModal currEvent={event}/>
                <LikesModal 
                    //@ts-ignore
                    event={event}
                />
            </div>
            <main className="md:pl-[72px] h-full">
                <LocoScroll>
                {children}
                </LocoScroll>
            </main>
            </div>
       
    );
}
 
export default MainLayout;