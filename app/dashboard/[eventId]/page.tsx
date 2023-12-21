import getCurrentUser from "@/app/actions/getCurrentUser";
import getEventById from "@/app/actions/getEventById";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";

interface IParams {
    eventId?: string;
}

const DashboardDetails = async (
    { params } : { params: IParams}
) => {
    const event = await getEventById(params);
    const currentUser = await getCurrentUser();
    if (event?.userId !== currentUser?.id){
        return (
            <EmptyState
                title="Unauthorised access"
                subtitle="You are not authorized to view this event"
            />
        )
    }

    return ( 
        <Container>
            <div>
                {event?.title}
            </div>
        </Container>
    );
}
 
export default DashboardDetails;