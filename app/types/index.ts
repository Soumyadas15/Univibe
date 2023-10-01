import { Event, Registration, User } from "@prisma/client";

export type SafeEvent = Omit<Event, "createdAt"> & {
  createdAt: string;
};

export type SafeRegistration = Omit<
Registration, 
  "createdAt" | "event"
> & {
  createdAt: string;
  event: SafeEvent;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};