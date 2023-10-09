import getEventById from "@/app/actions/getEventById";
import EmptyState from "@/app/components/EmptyState";
import EventClient from "./EventClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getUserById from "@/app/actions/getUserById";

interface IParams {
    eventId?: string;
}
const EventPage = async (
    { params } : { params: IParams}
) => {
    const event = await getEventById(params);
    const currentUser = await getCurrentUser();

    if (!event) {
        return (
            <EmptyState/>
        )
    }
    return ( 
        <div>
           <EventClient
               event={event}
               currentUser={currentUser}
           />
        </div>
     );
}
 
export default EventPage;