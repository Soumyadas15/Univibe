import getEventById from "@/app/actions/getEventById";
import EventRegiatrationModal from "./EventRegistrationForm";
import LikesModal from "@/app/components/modals/LikesModal";
import getUserById from "@/app/actions/getUserById";
import Liked from "@/app/components/modals/Liked";
import LocoScroll from "@/app/components/LocoScroll";
import Incomplete from "@/app/components/modals/Incomplete";

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
        
            <main className="md:pl-[72px] h-full">
                <EventRegiatrationModal currEvent={event}/>
                <LikesModal 
                    //@ts-ignore
                    event={event}
                />
                <Incomplete/>
                <LocoScroll>
                {children}
                </LocoScroll>
            </main>
    );
}
 
export default MainLayout;