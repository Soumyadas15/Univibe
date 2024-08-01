"use client"



import { usePathname, useRouter } from "next/navigation";
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

    const currentPage = usePathname();
    
    const hiddenRoutes = ['/dashboard'];
    //@ts-ignore
    const shouldHideNavbar = currentPage.startsWith(hiddenRoutes);
    //@ts-ignore
    if (shouldHideNavbar) {
        return null;
    }
    
    return ( 
        <div className="
                fixed
                w-full
                z-[2100]
        ">
            <div
                className="
                    py-4
                    
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
