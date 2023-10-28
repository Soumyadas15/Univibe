import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";

const BookingsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="Unauthorized access"
                subtitle="Please sign in"
            />
        )
    }

    return ( 
        <div>
            <EmptyState
                title="Work underway"
                subtitle="This page will be made soon"
            />
        </div>
     );
}
 
export default BookingsPage;