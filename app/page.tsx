import Image from 'next/image'
import Container from './components/Container'
import EmptyState from './components/EmptyState';
import getEvents from './actions/getEvents';
import EventCard from './components/events/EventCard';
import getCurrentUser from './actions/getCurrentUser';
import FeaturedEvents from './components/events/FeaturedEvents';
import OtherCollegesFeatured from './components/events/OtherCollegesFeatured';
import PageHeader from './components/events/PageHeader';
import getUserById from './actions/getUserById';
import { useEffect } from 'react';
import LocoScroll from './components/LocoScroll';
import EmptySignIn from './components/EmptySignIn';

export default async function Home() {
  const events = await getEvents();
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

        <FeaturedEvents/>
      </div>
      <div>
        <PageHeader
          title='Events in your college'
          redirect={home}
        />
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
      <div className=''>
      <PageHeader
          title='Events in other colleges'
          redirect={home}
        />
        <div className='mt-8'>
          <OtherCollegesFeatured/>
        </div>
        
      </div>
    </Container>
  )
}
