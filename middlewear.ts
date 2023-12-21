export { default } from "next-auth/middleware"

export const config = { 
  matcher: [
    "/my-events",
    "/events",
    "/bookings",
    "/likes",
    "/dashboard"
  ]
};