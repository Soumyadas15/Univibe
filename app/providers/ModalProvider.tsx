import getCurrentUser from "../actions/getCurrentUser";
import getEventById from "../actions/getEventById";
import CreateModal from "../components/modals/CreateModal";
import EmailModal from "../components/modals/EmailModal";
import LikesModal from "../components/modals/LikesModal";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import SuccessModal from "../components/modals/SuccessModal";
import WelcomeModal from "../components/modals/WelcomeModal";
import RegistrationSuccessModal from "../events/[eventId]/RegistrationSuccessModal";
// import EventRegistrationModal from "../components/modals/event registration/EventRegistrationForm";
import { SafeUser } from "../types";

const ModalProvider = async () => {
    const currentUser = await getCurrentUser();
    
    return ( 
        <div>
            <EmailModal/>
            <CreateModal currentUser={currentUser}/>
            <WelcomeModal/>
            <SuccessModal/>
            <LoginModal/>
            <RegisterModal/>
            <RegistrationSuccessModal/>
        </div>
     );
}

export default ModalProvider;