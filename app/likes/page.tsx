import getCurrentUser from "../actions/getCurrentUser";
import getLikedEvents from "../actions/getLikedEvents";
import EmptyState from "../components/EmptyState";
import LikesClient from "./LikesClient";

const LikePage = async () => {
    const likedEvents = await getLikedEvents();
    const currentUser = await getCurrentUser();
    
    if (likedEvents.length === 0){
        return (
            <EmptyState
                title="Work underway"
                subtitle="This page will be made soon"
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