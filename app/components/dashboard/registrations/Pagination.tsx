const Pagination = () => {
    return ( 
        <div className="flex items-center justify-end gap-4 p-5">
            <button className="p-4 cursor-pointer disabled:cursor-not-allowed bg-red-400 rounded-xl disabled:opacity-60" disabled>Back</button>
            <button className="p-4 cursor-pointer disabled:cursor-not-allowed bg-red-400 rounded-xl">Next</button>
        </div>
     );
}
 
export default Pagination;