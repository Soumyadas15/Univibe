import getEventById from "@/app/actions/getEventById";
import EmptyState from "@/app/components/EmptyState";
import EventClient from "./EventClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getUserById from "@/app/actions/getUserById";
import getRegistrationData from "@/app/actions/getRegistrationDetails";
import EventClient2 from "./EventClient2";


interface IParams {
    eventId?: string;
}
const EventPage = async (
    { params } : { params: IParams}
) => {
    const event = await getEventById(params);
    const currentUser = await getCurrentUser();
    // const registrationDetails = await getRegistrationDetails(currentUser.id, event.id);

    //@ts-ignore
    const registered = await getRegistrationData(event?.id);

    console.log("Drive")
    if (!event) {
        return (
            <EmptyState/>
        )
    }
    return ( 
        <>
            <div className="block md:hidden">
                <EventClient
                        //@ts-ignore
                        isRegistered={registered}
                    event={event}
                    currentUser={currentUser}
                />
            </div>
            <div className="hidden md:block">
                <EventClient2
                    //@ts-ignore
                    isRegistered={registered}
                    event={event}
                    currentUser={currentUser}
                />
            </div>
     </>
     );
}
 
export default EventPage;