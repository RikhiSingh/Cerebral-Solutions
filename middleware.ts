import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  // Add any other public routes here if needed
]);

export default clerkMiddleware(async (auth, request) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Protect /user routes explicitly
  if (pathname.startsWith('/user') && !isPublicRoute(request)) {
    await auth.protect(); // Require authentication for /user
  }

  // Allow everything else
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Apply to API routes
    '/(api|trpc)(.*)',
  ],
};
