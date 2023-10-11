"use client";

import useCreateModal from "@/app/hooks/useCreateModal";
import { Plus, Users2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { AiFillHome, AiOutlinePlus} from 'react-icons/ai';


function BottomNavbar() {
  const pathname = usePathname();
  const createModal = useCreateModal();
  const router = useRouter();

  return (
    <div className="flex justify-center">
        <section className='
                    fixed 
                    bottom-0 
                    z-10 
                    
                    w-11/12
                    rounded-lg
                    
                    bg-[#ffffff]
                    dark:bg-[#121212]
                    p-4 
                    mb-5
                    backdrop-filter
                    backdrop-blur-lg 
                    bg-opacity-20
                    dark:bg-opacity-20
                    xs:px-7 
                    md:hidden
            '>
        <div className='
                        flex 
                        items-center 
                        justify-between 
                        gap-3 
                        xs:gap-5
                '>
            <div>
                <div>
                <div 
                    className="bg-white text-black text-xl p-3 rounded-full cursor-pointer"
                    onClick={() => (router.push('/'))}
                >
                    <AiFillHome
                        width={16}
                        height={16}
                        className='object-contain'
                    />
                </div>

                <p className='
                        text-subtle-medium 
                        text-light-1 
                        max-sm:hidden
                    '>
                    Home
                </p>
                </div>
            </div>

            <div>
                <div>
                <div 
                    className="bg-white text-black p-3 rounded-full cursor-pointer"
                    onClick={createModal.onOpen}
                >
                    <AiOutlinePlus
                        width={16}
                        height={16}
                        className='object-contain'
                    />
                </div>

                <p className='
                        text-subtle-medium 
                        text-light-1 
                        max-sm:hidden
                    '>
                    Create
                </p>
                </div>
            </div>


        </div>
        </section>
    </div>
  );
}

export default BottomNavbar;