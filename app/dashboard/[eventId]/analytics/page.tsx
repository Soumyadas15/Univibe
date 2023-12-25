import getCurrentUser from "@/app/actions/getCurrentUser";
import getEventById from "@/app/actions/getEventById";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import Heading from "@/app/components/Heading";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Image from "next/image";
import DataCard from "../../../components/dashboard/analytics/DataCard";
import getTotalRegistrations, { getTodayRegistrations } from "@/app/actions/getTotalRegistrations";
import { Heart, MousePointerClick, Users } from "lucide-react";
import getTotalClicks, { getTodayClicks } from "@/app/actions/getTotalClicks";
import { getTodayLikes, getTotalLikes } from "@/app/actions/getLikedByUsers.ts";
import DashboardEventImage from "../DashboardEventImage";
import getTotalRegistrationsByDepartment from "@/app/actions/getTotalRegistrationsByDepartment";
import Button from "@/app/components/Button";
import BarGraph from "@/app/components/dashboard/analytics/BarGraph";


interface IParams {
    eventId?: string;
}

const DashboardAnaltics = async (
    { params } : { params: IParams}
) => {

    const event = await getEventById(params);

    const registrations = await getTotalRegistrations(params);
    const registrationsToday = await getTodayRegistrations(params);

    const clicks = await getTotalClicks(params);
    const clicksToday = await getTodayClicks(params);

    const likes = await getTotalLikes(params);
    const likesToday = await getTodayLikes(params);

    const registrationsByDepartment = await getTotalRegistrationsByDepartment(params);
    console.log(registrationsByDepartment)
    

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
            
            <div className=" w-full h-[90rem] flex flex-col gap-4">
                <div className="pt-10">
                    <Heading
                        title={`${event?.title!} analytics`}
                        subtitle="Control and analyze your event"
                    />
                </div>
                <div className="w-full h-full flex">
                    <div className=" w-[60%] h-full flex flex-col justify-between p-5 gap-8">
                        <div className=" w-full h-full md:h-[20%] flex flex-col md:flex-row gap-3">
                            <DataCard 
                                    label={clicks!} 
                                    subtitle="Clicks"
                                    gradient="bg-pink-200 dark:bg-pink-900 dark:bg-opacity-60 transition ease-in-out duration-100"
                                    increase={clicksToday}
                                    icon={{ component: <MousePointerClick size={30} className="dark:text-white text-black"/>, style: { color: 'black', opacity: '60%'}}}
                            />
                            <DataCard 
                                label={likes!}
                                subtitle="Likes"
                                increase={likesToday}
                                gradient="bg-indigo-200 dark:bg-indigo-800 dark:bg-opacity-50 transition ease-in-out duration-100"
                                icon={{ component: <Heart size={30} className="dark:text-white text-black"/>, style: { color: 'black', opacity: '60%'}}}
                            />
                            <DataCard 
                                label={registrations.length!} 
                                subtitle="Registrations"
                                gradient="bg-cyan-200 dark:bg-cyan-800 dark:bg-opacity-60 transition ease-in-out duration-100"
                                increase={registrationsToday}
                                icon={{ component: <Users size={30} className="dark:text-white text-black"/>}}
                            />
                        
                        </div>
                        <div className=" w-full h-[40%] flex flex-col rounded-lg items-center justify-center">
                            <div className="flex flex-col h-[10%] w-full text-2xl text-left">
                                Department wise registrations
                            </div>
                            <div className="h-[90%] flex items-center justify-center w-full rounded-xl">
                                <BarGraph data={registrationsByDepartment}/>
                            </div>
                            
                        </div>
                        <div className="bg-neutral-300 dark:bg-neutral-800 w-full h-[30%] flex flex-col md:flex-row rounded-lg">

                        </div>
                    </div>
                    <div className="w-[40%] h-full flex flex-col gap-6 -mt-10 items-center p-3">
                        <div className="w-full h-[40%] rounded-2xl overflow-hidden">
                        {/* <Image
                            //@ts-ignore
                            src={event?.imageSrc}
                            //@ts-ignore
                            alt={event?.title}
                            height={800}
                            width={800}
                            className="object-cover w-full h-full"
                        /> */}
                        </div>
                    </div>
                </div>
                
                
            </div>
            
        </div>
            
        
    );
}
 
export default DashboardAnaltics;