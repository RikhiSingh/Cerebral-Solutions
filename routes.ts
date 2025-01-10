/**
 * An array of routes that are publicly accessible
 * These routes don't require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification"
];

/**
 * An array of routes that require authentication
 * These routes will redirect users to /settings 
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
]

/**
 * The prefix for API auth routes
 * Never block this route from being accessed
 * Routes that start with this prefix are used for API auth
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default route to redirect users to after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";