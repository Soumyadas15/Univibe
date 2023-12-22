import getCurrentUser from "@/app/actions/getCurrentUser";
import getEventById from "@/app/actions/getEventById";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import Heading from "@/app/components/Heading";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Image from "next/image";
import DataCard from "./DataCard";
import getTotalRegistrations from "@/app/actions/getTotalRegistrations";
import { Users } from "lucide-react";


interface IParams {
    eventId?: string;
}

const DashboardAnaltics = async (
    { params } : { params: IParams}
) => {
    const event = await getEventById(params);
    const registrations = await getTotalRegistrations(params);
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
        
        <div className="flex w-full gap-4">
            <div className="hidden md:block">
                <div className="sticky h-screen top-0 flex items-center">
                        <Sidebar
                            currentUser={currentUser}
                            event={event}
                        />
                </div>
            </div>
            
            <div className=" w-full h-[70rem] flex flex-col gap-4">
                <div className="pt-10">
                    <Heading
                        title={`${event?.title!} analytics`}
                    />
                </div>
                <div className=" w-full h-full flex flex-col justify-between p-5 gap-6">
                    <div className=" w-full h-full md:h-[40%] flex flex-col md:flex-row gap-3">
                       <DataCard 
                            label={registrations.length!} 
                            subtitle="Registrations"
                            icon={{ component: <Users size={80}/>, style: { color: 'red', opacity: '60%'}}}
                        />
                       <DataCard 
                            label="200" 
                            subtitle="new"
                            icon={{ component: <Users size={80}/>, style: { color: 'red', opacity: '60%'}}}
                        />
                       <DataCard 
                            label="200" 
                            subtitle="new"
                            icon={{ component: <Users size={80}/>, style: { color: 'red', opacity: '60%'}}}
                        />
                    </div>
                    <div className="bg-neutral-300 dark:bg-neutral-800 w-full h-[50%] flex flex-col md:flex-row rounded-lg">

                    </div>
                    <div className="bg-neutral-300 dark:bg-neutral-800 w-full h-[50%] flex flex-col md:flex-row rounded-lg">

                    </div>
                </div>
                
            </div>
            
        </div>
            
        
    );
}
 
export default DashboardAnaltics;