import React from "react";
import Container from "../components/Container";
import { SafeEvent, SafeUser } from "../types";
import Heading from "../components/Heading";
import DashboardEventCard from "../components/dashboard/DashboardEventCard";

interface DashboardClientProps {
    events: SafeEvent[];
    currentUser?: SafeUser | null;
}
const DashboardClient: React.FC<DashboardClientProps> = ({
    events,
    currentUser
}) => {
    return ( 
        <Container>
            <Heading
                title="Manage your events"
                subtitle="Events you have created"
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
                    <DashboardEventCard
                        currentUser={currentUser}
                        key={event.id}
                        data={event}
                    />
                ))}
            </div>
        </Container>
     );
}
 
export default DashboardClient;