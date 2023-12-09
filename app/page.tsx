import Image from 'next/image'
import Container from './components/Container'
import EmptyState from './components/EmptyState';
import getEvents, { IEventParams } from './actions/getEvents';
import EventCard from './components/events/EventCard';
import getCurrentUser from './actions/getCurrentUser';
import FeaturedEvents from './components/events/FeaturedEvents';
import OtherCollegesFeatured from './components/events/OtherCollegesFeatured';
import PageHeader from './components/events/PageHeader';
import getUserById from './actions/getUserById';
import { useEffect } from 'react';
import LocoScroll from './components/LocoScroll';
import EmptySignIn from './components/EmptySignIn';
import { Carousel } from 'react-responsive-carousel';

interface HomeProps {
  searchParams: IEventParams;
}
const Home = async ({ 
  searchParams 
} : HomeProps) => {
  const events = await getEvents(searchParams);
  const currentUser = await getCurrentUser();
  const currUserCollege = currentUser?.institute;
  
  const isEmpty = true;
  const inMyCollege = events.filter((event) => event.college === currUserCollege).slice(0, 6);;
  const notInMyCollege = events.filter((event) => event.college !== currUserCollege);

  const home = '/';

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

        <FeaturedEvents searchParams={searchParams}/>
      </div>
      <div>
        <PageHeader
          title='Events in your college'
          redirect={home}
        />
        <div className='block'>
          {currentUser ? (
            <div className='pt-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-8'>
              {inMyCollege.map((event: any) => (
                    <EventCard
                      currentUser={currentUser}
                      key={event.id}
                      data={event}
                    />
                  ))}
                </div>
              ) : (
                <div className='flex items-center justify-center'>
                    <EmptySignIn
                      title='Please sign in'
                      subtitle='to find events in your college'
                    />
                  </div>
          )}
        </div>
        {/* <div className='block md:hidden'>
          {currentUser ? (
            // <div className=''>
          <Carousel
                infiniteLoop={true}
                showStatus={false}
                showIndicators={false}
              >
                {(inMyCollege.map((event: any) => (
                  <div className="p-5 flex items-center justify-center" key={event.id}>
                    <EventCard
                      currentUser={currentUser}
                      data={event}
                    />
                  </div>
                )) as React.ReactChild[])}
          </Carousel>
              
              ) : (
                <div className='flex items-center justify-center'>
                    <EmptySignIn
                      title='Please sign in'
                      subtitle='to find events in your college'
                    />
                  </div>
          )}
        </div> */}
      </div>
      <div className=''>
      <PageHeader
          title='Events in other colleges'
          redirect={home}
        />
        <div className='mt-8 mb-8 md:mb-0'>
          <OtherCollegesFeatured searchParams={searchParams}/>
        </div>
        
      </div>
    </Container>
  )
}

export const dynamic = 'force-dynamic';
export default Home;