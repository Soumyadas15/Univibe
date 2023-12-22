import getCurrentUser from "@/app/actions/getCurrentUser";
import getEventById from "@/app/actions/getEventById";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import Heading from "@/app/components/Heading";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Image from "next/image";
import DashboardEventImage from "./DashboardEventImage";
import DashboardDescription from "./DashboardDescription";

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
        
            <div className="flex gap-4 w-full">
                <div className="w-[40rem] screen flex flex-col gap-5">
                    <Heading
                        title={event?.title!}
                    />
                    <div className="w-[90%]">
                        <DashboardDescription
                            event={event!}
                        />
                    </div>
                </div>
                <div className=" w-[47%] h-[30rem] sticky top-10">
                    <DashboardEventImage
                        //@ts-ignore
                        event={event}
                    />
                </div>
            </div>
            
        
    );
}
 
export default DashboardDetails;