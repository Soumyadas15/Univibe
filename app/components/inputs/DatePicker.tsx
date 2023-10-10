"use client"

import GenerateDate from "@/app/utils/GenerateDate";
import { cn } from "@/lib/utils";
import dayjs from 'dayjs';
import { useState } from "react";
import { months } from "@/app/utils/GenerateDate";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps{
    onClick: (value: string) => void;
    onSelectDate: (date: dayjs.Dayjs) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
    onClick,
    onSelectDate
}) => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const currentDay = dayjs();
    const [today, setToday] = useState(currentDay);
    const [selectDate, setSelectDate] = useState(currentDay);

    const goBack = () => {
        setToday(today.month(today.month() - 1));
    }
    const goNext = () => {
        setToday(today.month(today.month() + 1));
    }
    const goToday = () => {
        setToday(currentDay);
    }
    
    

    return ( 
        <div className="w-96 h-96">

            <div className="flex justify-between font-semibold">
                <h1>{months[today.month()]}, {today.year()}</h1>

                <div className="flex items-center gap-5">

                    <div className="h-10" onClick={goBack}>
                        <ChevronLeft className="cursor-pointer"/>
                    </div>
                    
                    <h1 className="h-10 cursor-pointer" onClick={goToday}>Today</h1>
                    
                    <div className="h-10" onClick={goNext}>
                        <ChevronRight className="cursor-pointer"/>
                    </div>
                    
                </div>
            </div>

            <div className="w-full grid grid-cols-7 ">
                {days.map((day, index) => {
                    return <h1 key={index} className="h-10 grid place-content-center text-[#ff297f]"> {day} </h1>
                })}
            </div>

            <div className="
                    h-auto
                    grid 
                    grid-cols-7 
                    max-h-[50vh]
                    overflow-y-auto
            ">
                {GenerateDate(today.month(), today.year()).map(({date, currentMonth, today}, index) => {
                    return (
                        <div 
                            key={index} 
                            className="
                                h-10
                                mt-2 
                                grid 
                                place-content-center
                        ">

                            <h1 className={cn(
                                    currentMonth? "": "text-neutral-400",
                                    today? "bg-[#ff297f] text-white": "",
                                            "h-10",
                                            "w-10",
                                            "grid",
                                            "place-content-center",
                                            "rounded-full",
                                            "hover:bg-black",
                                            "dark:hover:bg-white", 
                                            "dark:hover:text-black",
                                            "hover:text-white", 
                                            "transition",
                                            "cursor-pointer",
                                    selectDate
                                        .toDate()
                                        .toDateString() ===
                                        date.toDate().toDateString()
                                        ? "bg-black text-white dark:bg-white dark:text-black"
                                        : "",
                                    
                                )}
                                onClick={() => {
                                    setSelectDate(date);
                                    onSelectDate(date); 
                                }}
                                
                            >

                                {date.date()}

                            </h1>
                        </div>
                    )
                })}
            </div>
        </div>
     );
}
 
export default DatePicker;