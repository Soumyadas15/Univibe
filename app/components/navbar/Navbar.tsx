"use client"



import Container from "../Container";
import { ModeToggle } from "../toggle/ThemeToggle";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

import { SafeUser } from "@/app/types";

interface NavbarProps {
    currentUser?: SafeUser | null;
}
const Navbar: React.FC<NavbarProps> = ({
    currentUser,
}) => {
    console.log(currentUser);
    return ( 
        <div className="
                fixed
                w-full
                bg-white
                dark:bg-neutral-900
                z-10
                shadow-sm
        ">
            <div
                className="
                    py-4
                    border-b-[1px]
                    dark:border-none
                "
            >
                <Container>
                    <div 
                        className="
                            flex
                            flex-row
                            items-center
                            justify-between
                            gap-3
                            md:gap-0
                        "
                    >
                        <Logo/>
                        <UserMenu currentUser={currentUser}/>
                    </div>
                </Container>
            </div>
        </div>
     );
}
 
export default Navbar;