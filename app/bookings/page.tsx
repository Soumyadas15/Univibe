import getBookedEvents, { IEventParams } from "../actions/getBookedEvents";
import getCurrentUser from "../actions/getCurrentUser";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import Heading from "../components/Heading";
import EventCard from "../components/events/EventCard";
import TicketModal from "../events/[eventId]/TicketModal";

const BookingsPage = async () => {
    const currentUser = await getCurrentUser();
    const eventParams: IEventParams = {
        userId: currentUser?.id
    };
    const events = await getBookedEvents(eventParams);

    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized access"
                subtitle="Please sign in"
            />
        )
    }

    if (events.length === 0){
        return (
            <EmptyState
                title="No bookings"
            />
        )
    }

    return ( 
        <Container>
            <div>
                <Heading
                    title="Your bookings"
                    subtitle="Events you've registered for"
                />
                <div className='pt-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-8'>
                {events.map((event: any) => (
                    <div key={event.id}>
                        <EventCard
                            currentUser={currentUser}
                            key={event.id}
                            data={event}
                        />
                    </div>
                        
                    ))}
                </div>
            </div>
        </Container>
        
     );
}
 
export default BookingsPage;