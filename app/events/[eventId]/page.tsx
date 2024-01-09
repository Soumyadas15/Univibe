import getEventById from "@/app/actions/getEventById";
import EmptyState from "@/app/components/EmptyState";
import EventClient from "./EventClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getUserById from "@/app/actions/getUserById";
import getRegistrationData from "@/app/actions/getRegistrationDetails";
import EventClient2 from "./EventClient2";
import { getTicketDetails } from "@/app/actions/getTicketDetails";
import generateQRCode from "@/app/utils/generateQRCode";

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
    //@ts-ignore
    const ticket = await getTicketDetails(currentUser?.id, event?.id);
    const qrUrl = await generateQRCode(ticket);

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
                    isRegistered={registered.hasRegistered}
                    //@ts-ignore
                    hasPaid={registered.hasPaid}
                    event={event}
                    currentUser={currentUser}
                    ticketData={qrUrl}
                />
            </div>
     </>
     );
}
 
export default EventPage;