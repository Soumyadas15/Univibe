import getEventById from "@/app/actions/getEventById";
import EventRegiatrationModal from "./EventRegistrationForm";
import LikesModal from "@/app/components/modals/LikesModal";
import getUserById from "@/app/actions/getUserById";
import Liked from "@/app/components/modals/Liked";
import LocoScroll from "@/app/components/LocoScroll";
import Incomplete from "@/app/components/modals/Incomplete";
import { SafeUser } from "@/app/types";

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
    let likedBy = event?.likedBy;
    
    if (likedBy && likedBy.length > 0) {
        await Promise.all(likedBy.map(async (userId) => {
            if (userId) {
                try {
                    const likedUser = await getUserById({ userId });
                    if (likedUser && likedUser) {
                        users.push(likedUser);
                    }
                } catch (error) {
                    console.error(`Error fetching user with ID ${userId}`);
                }
            }
        }));
    }
    console.log(users);

    return ( 
        
            <main className="md:pl-[72px] h-full">
                <EventRegiatrationModal currEvent={event}/>
                <LikesModal 
                    likedBy={users}
                />
                <Incomplete/>
                <LocoScroll>
                {children}
                </LocoScroll>
            </main>
    );
}
 
export default MainLayout;