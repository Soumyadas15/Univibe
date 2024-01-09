import getCurrentUser from "@/app/actions/getCurrentUser";
import getEventById from "@/app/actions/getEventById";
import { getNames } from "@/app/actions/getNames";
import { getRegistrations } from "@/app/actions/getRegistrationDetails";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import Heading from "@/app/components/Heading";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Pagination from "@/app/components/dashboard/registrations/Pagination";
import Search from "@/app/components/dashboard/registrations/Search";
import Table from "@/app/components/dashboard/registrations/Table";
import Image from "next/image";


interface SearchParams {
    q?: string; 
}

interface IParams {
    eventId?: string;
    searchParams?: SearchParams;
}


const DashboardRegistrations = async ({ params, searchParams }: { params: IParams, searchParams: SearchParams }) => {

    const event = await getEventById(params);


    console.log(searchParams)

    const currentUser = await getCurrentUser();

    //@ts-ignore
    const users = await getNames({eventId: event?.id, q: searchParams.q});


    const registratins = await getRegistrations(params);


    if (event?.userId !== currentUser?.id){
        return (
            <EmptyState
                title="Unauthorised access"
                subtitle="You are not authorized to view this event"
            />
        )
    }

    return ( 
        
        <div className="flex w-full gap-4 h-screen">
            <div className="hidden md:block">
                <div className="sticky h-screen top-0 flex items-center">
                        <Sidebar
                            currentUser={currentUser}
                            event={event}
                        />
                </div>
            </div>
            <div className=" w-full h-[95%] flex flex-col gap-4 overflow-hidden overflow-x-scroll pb-5">
                <div className="pt-10">
                    <Heading
                        title={`${event?.title!} registrations`}
                        subtitle="Manage registrations"
                    />
                </div>
                
                <div className="w-[99%] h-full flex items-start gap-4 flex-col">
                    <div className="pt-5 w-full flex items-center px-3 justify-between">
                        <Search placeholder="Search"/>
                        <div className="w-[18%]">
                            <Pagination/>
                        </div>
                    </div>
                    <div className="w-full h-[90%] overflow-y-scroll bg-neutral-300 dark:bg-neutral-800">
                        <Table 
                            //@ts-ignore
                            data={users} 
                            //@ts-ignore
                            event={event}/>
                    </div>
                    
                </div>
                
            </div>
        </div>
        
    );
}
 
export default DashboardRegistrations;