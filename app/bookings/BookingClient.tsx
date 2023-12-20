
import getCurrentUser from "../actions/getCurrentUser";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import Heading from "../components/Heading";
import EventCard from "../components/events/EventCard";
import TicketModal from "../events/[eventId]/TicketModal";
import { SafeEvent, SafeUser } from "../types";

interface BookingClientProps {
    events: SafeEvent[];
    currentUser?: SafeUser | null;
}

const BookingClient: React.FC<BookingClientProps> = ({
    events,
    currentUser,
}) => {

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
            <Heading
                title="Booked events"
                subtitle="Events you've registered for"
            />
            <div
                className="
                    mt-10
                    grid 
                    grid-cols-2 
                    sm:grid-cols-2 
                    md:grid-cols-2 
                    lg:grid-cols-4 
                    xl:grid-cols-6 
                    2xl:grid-cols-6 
                    gap-8
                "
            >
                {events.map((event) => (
                    <EventCard
                        currentUser={currentUser}
                        key={event.id}
                        data={event}
                    />
                ))}
            </div>

        </Container>
        
     );
}
 
export default BookingClient;