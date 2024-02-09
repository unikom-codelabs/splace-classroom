import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const path = req.nextUrl.pathname;
      if(!token) return false;
      if (path.startsWith("/admin")) {
        return token?.role === "ADMIN";
      }
      if (path.startsWith("/api/admin")) {
        return token?.role === "ADMIN";
      }
      return token != null;
  }}
})

// Define paths for which the middleware will run
export const config = {
  matcher: [
    '/api/admin/(.*)',
    '/admin/(.*)',
    '/api/resources/(.*)',
    '/api/users/(.*)',
    '/api/courses/(.*)',
    '/auth/register',
    '/course/(.*)',
    '/quiz/(.*)'
  ]
}