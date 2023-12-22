import getBookedEvents from "../actions/getBookedEvents";
import getCurrentUser from "../actions/getCurrentUser";
import BookingClient from "./BookingClient";

const BookingsPage = async () => {
    const events = await getBookedEvents();
    const currentUser = await getCurrentUser();
    console.log(events.length);

    return (
        <div className="pb-20 pt-28">
            <BookingClient
                events={events}
                currentUser={currentUser}
            />
        </div>
    )
}
 
export default BookingsPage;