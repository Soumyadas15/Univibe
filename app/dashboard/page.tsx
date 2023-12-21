import getAdminStatus from "../actions/getAdminStatus";
import getCurrentUser from "../actions/getCurrentUser";
import getEvents from "../actions/getEvents";
import Container from "../components/Container"
import EmptyState from "../components/EmptyState";
import DashboardClient from "./DashboardClient";

const DashboardPage = async () => {

    const response = await getAdminStatus();
    const currentUser = await getCurrentUser();
    const myEvents = await getEvents({
        userId: (currentUser?.id)
    });

    if (!response){
        return (
            // <EmptyState
            //     title="Unauthorised access"
            //     subtitle="You are not an admin"
            // />
            <DashboardClient
                events={myEvents}
                currentUser={currentUser}
            />
        )
    }

    return ( 
        <DashboardClient
                events={myEvents}
                currentUser={currentUser}
        />
    );
}
 
export default DashboardPage;