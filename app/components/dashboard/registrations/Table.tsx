"use client"

import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { SafeEvent, SafeRegistration } from "@/app/types";
import Toggle from "./Toggle";

interface TableProps{
    data?: SafeRegistration[];
    event?: SafeEvent
}
const Table: React.FC<TableProps> = ({
    data,
    event,
}) => {
    const generateMemberColumns = (memberCount: number) => {
        const columns = [];
        for (let i = 1; i <= memberCount; i++) {
            columns.push(<td className="p-3">Member {i}</td>);
        }
        return columns;
    };

    const renderMemberData = (row: any, memberCount: number) => {
        const memberData = [];
        for (let i = 1; i <= memberCount; i++) {
            memberData.push(<td className="p-3">{row[`member${i}`]}</td>);
        }
        return memberData;
    };

    return ( 
        <div className="h-[90%] w-full ">
        <div className="h-full w-full overflow-hidden overflow-x-scroll overflow-y-scroll bg-neutral-300 dark:bg-neutral-800">
        <table className="w-[90rem]  overflow-y-scroll">
            <thead className="bg-red-400">
                <tr className="">
                    <td className="p-3">Serial</td>
                    <td className="p-3">Member 1</td>
                    <td className="p-3">Semester</td>
                    <td className="p-3">Paid</td>
                    <td className="p-3">Phone</td>
                    {event && generateMemberColumns(event.memberCount!)}
                </tr>
            </thead>
            <tbody>
                {data?.map((row: any, index: number) => (
                    <tr key={index}>
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3">{row.member1}</td>
                        <td className="p-3">{row.semester}</td>
                        <td className="p-3">
                            <Toggle registration={row}/>
                        </td>
                        <td className="p-3">{row.phone}</td>
                        {event && renderMemberData(row, event.memberCount!)}
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    </div>
     );
}
 
export default Table;