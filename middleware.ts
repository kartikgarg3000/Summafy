<<<<<<< Updated upstream
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();
=======
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtected = createRouteMatcher(['/dashboard(.*)', '/summaries(.*)', '/upload(.*)']);

export default clerkMiddleware(async(auth, req) => {
  if(isProtected(req)) await auth.protect();
});
>>>>>>> Stashed changes

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
<<<<<<< Updated upstream
=======
    '/upload(.*)',
    '/dashboard(.*)',
    '/summaries(.*)',
    '/api/(.*)',
>>>>>>> Stashed changes
  ],
};