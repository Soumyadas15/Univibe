import Container from "../components/Container";
import Heading from "../components/Heading";
import EventCard from "../components/events/EventCard";
import { SafeEvent, SafeUser } from "../types";


interface LikesClientProps {
    events: SafeEvent[];
    currentUser?: SafeUser | null;
}

const LikesClient: React.FC<LikesClientProps> = ({
    events,
    currentUser,
}) => {
    return ( 
        <Container>
            <Heading
                title="Liked events"
                subtitle="Events you're interested in"
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
 
export default LikesClient;