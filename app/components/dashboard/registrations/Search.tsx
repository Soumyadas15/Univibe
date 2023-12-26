"use client";

import { MdSearch } from "react-icons/md";
import styles from "./search.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface SearchProps {
    placeholder?: string;
}
const Search: React.FC<SearchProps> = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((e) => {
    //@ts-ignore
    const params = new URLSearchParams(searchParams);
    //@ts-ignore
    params.set("q", e.target.value);
    if (e.target.value) {
      e.target.value.length > 2 && params.set("q", e.target.value);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params}`);
  }, 50);

  return (
    <div className="flex items-center bg-neutral-300 p-2 px-5 rounded-xl w-[25%]">
    
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className='bg-neutral-300 border-none w-[90%] border-transparent focus:border-transparent focus:ring-0'
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;