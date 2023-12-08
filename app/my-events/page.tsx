import getCurrentUser from "../actions/getCurrentUser";
import getEvents from "../actions/getEvents";
import getLikedEvents from "../actions/getLikedEvents";
import EmptyState from "../components/EmptyState";
import MyEventsClient from "./MyEventsClient";

const MyEventsPage = async () => {
    const currentUser = await getCurrentUser();

    const myEvents = await getEvents({
        userId: (currentUser?.id)
    });

    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized access"
                subtitle="Please sign in"
            />
        )
    }
    
    if (myEvents.length === 0){
        return (
            <EmptyState
                title="Work underway"
                subtitle="This page will be made soon"
            />
        )
    }
    return ( 
        <div>
            <MyEventsClient
                events={myEvents}
                currentUser={currentUser}
            />
        </div>
     );
}
 
export default MyEventsPage;