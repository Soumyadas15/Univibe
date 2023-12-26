import Pagination from "./Pagination";


interface TableProps{
    data?: any;
}
const Table: React.FC<TableProps> = ({
    data,
}) => {
    return ( 
        <div className="h-[90%] w-full ">
        <div className="h-full w-full overflow-hidden overflow-x-scroll overflow-y-scroll bg-neutral-300 dark:bg-neutral-800">
        <table className="w-[90rem]  overflow-y-scroll">
            <thead className="bg-red-400">
                <tr className="">
                    <td className="p-3">User ID</td>
                    <td className="p-3">Member 1</td>
                    <td className="p-3">Semester</td>
                    <td className="p-3">Phone</td>
                    <td className="p-3">Phone</td>
                    <td className="p-3">Phone</td>
                    <td className="p-3">Phone</td>
                    <td className="p-3">Phone</td>
                    <td className="p-3">Phone</td>
                </tr>
            </thead>
            <tbody>
                {data.map((row: any, index: number) => (
                    <tr key={index}>
                        <td className="p-3">{row.userId}</td>
                        <td className="p-3">{row.member1}</td>
                        <td className="p-3">{row.semester}</td>
                        <td className="p-3">{row.phone}</td>
                        <td className="p-3">{row.phone}</td>
                        <td className="p-3">{row.phone}</td>
                        <td className="p-3">{row.phone}</td>
                        <td className="p-3">{row.phone}</td>
                        <td className="p-3">{row.phone}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    </div>
     );
}
 
export default Table;