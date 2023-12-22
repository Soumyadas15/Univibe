import getCurrentUser from "@/app/actions/getCurrentUser";
import getEventById from "@/app/actions/getEventById";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import Heading from "@/app/components/Heading";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Image from "next/image";


interface IParams {
    eventId?: string;
}

const DashboardAnaltics = async (
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
        
        <div className="flex w-full">
            <div className="sticky h-screen top-0 flex items-center">
                    <Sidebar
                        currentUser={currentUser}
                        event={event}
                    />
            </div>
        </div>
            
        
    );
}
 
export default DashboardAnaltics;