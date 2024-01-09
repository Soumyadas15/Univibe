import { Event, FavoriteEvent, Registration, User } from "@prisma/client";

export type SafeEvent = Omit<Event, 'createdAt'> & {
  createdAt: string;
  likedByUsers?: FavoriteEvent[]; 
};

export type SafeRegistration = Omit<Registration, 'createdAt' | 'event' | 'eventId' | 'userId'> & {
  createdAt: string;
  userId: number;
  eventId: number;
  phone: string;
  semester: string;
  department: string | null;
  member1: string | null;
  member2: string | null;
  member3: string | null;
  member4: string | null;
  member5: string | null;
  member6: string | null;
  member7: string | null;
  member8: string | null;
  member9: string | null;
  member10: string | null;
  hasPaid: boolean | null;
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