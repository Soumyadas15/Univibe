import { Event, FavoriteEvent, Registration, User } from "@prisma/client";

export type SafeEvent = Omit<Event, 'createdAt'> & {
  createdAt: string;
  likedByUsers?: FavoriteEvent[]; 
};

export type SafeRegistration = Omit<Registration, 'createdAt' | 'event' | 'eventId' | 'userId'> & {
  createdAt: string;
  event: SafeEvent;
  
};

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified' | 'hashedPassword'> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
  favoriteEvents?: FavoriteEvent[];
};

export type CheckoutOrderParams = {
  eventTitle: string;
  eventId: number;
  price: number;
  paidEvent: boolean;
  buyerId: number;
}