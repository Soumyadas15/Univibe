import Image from 'next/image'
import Container from './components/Container'
import EmptyState from './components/EmptyState';
import getEvents from './actions/getEvents';
import EventCard from './components/events/EventCard';
import getCurrentUser from './actions/getCurrentUser';
import FeaturedEvents from './components/events/FeaturedEvents';

export default async function Home() {
  const events = await getEvents();
  const currentUser = await getCurrentUser();
  
  const isEmpty = true;

  if (events.length === 0){
    return (
      <div>
        <EmptyState/>
        
      </div>
    )
  }
  return (
    <Container>
      <div>
        <FeaturedEvents/>
      </div>
      <div className='mt-10 font-bold text-2xl'>Events in your college</div>
      <div className='
          pt-5
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-2
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
      '>
            {events.map((event: any) => {
              return (
                <>
                  <EventCard
                      currentUser = {currentUser}
                      key={event.id}
                      data ={event}
                  />
                    
                </>
                
              )
            })}
      </div>
    </Container>
  )
}
