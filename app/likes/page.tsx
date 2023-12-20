import getCurrentUser from "../actions/getCurrentUser";
import getLikedEvents from "../actions/getLikedEvents";
import EmptyState from "../components/EmptyState";
import LikesClient from "./LikesClient";

const LikePage = async () => {
    const likedEvents = await getLikedEvents();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized access"
                subtitle="Please sign in"
            />
        )
    }
    
    if (likedEvents.length === 0){
        return (
            <EmptyState
                title="No Liked Events"
            />
        )
    }
    return ( 
        <div>
            <LikesClient
                events={likedEvents}
                currentUser={currentUser}
            />
        </div>
     );
}
 
export default LikePage;