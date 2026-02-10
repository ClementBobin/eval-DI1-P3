import { Link, useLocation } from "react-router-dom";
import "./unauthorized-page.css";

type RedirectLocationState = {
    redirectTo?: string;
};

/**
 * Unauthorized Page Component
 *
 * Displays a 403 Forbidden error page when a user lacks proper permissions
 * to access a resource. Provides a clear message and navigation back to
 * a safe location.
 *
 * @example
 * // In React Router configuration
 * <Route path="/unauthorized" element={<Unauthorized />} />
 *
 * // Redirecting to unauthorized page with state
 * navigate("/unauthorized", {
 *   state: { redirectTo: "/dashboard" }
 * });
 *
 * @returns React.FC - The unauthorized page component
 */
export const Unauthorized: React.FC = () => {
    // ============================================
    // HOOKS & STATE MANAGEMENT
    // ============================================
    
    /**
     * Get current location object from React Router
     * This contains the URL pathname, search params, and state
     */
    const location = useLocation();
    
    /**
     * Extract the location state with proper type safety
     * The state is passed when navigating to this page programmatically
     */
    const state = location.state as RedirectLocationState | null | undefined;


    // ============================================
    // REDIRECT LOGIC
    // ============================================
    
    /**
     * Determine the redirect destination
     *
     * Defaults to home page ("/") but can be overridden by:
     * 1. State passed from navigation
     * 2. Different logic based on user role or context
     */
    let redirectTo = "/"
    
    if (state && typeof state.redirectTo === "string") {
        // Use the redirect URL from navigation state if provided
        redirectTo = state.redirectTo;
    }
    
    // ============================================
    // RENDER
    // ============================================
    
    return (
        <div 
            className="unauthorized-page"
            role="main"
        >
            <div
                className="unauthorized-container"
                role="document"
            >
                {/* Error Code Display - Visual indicator only */}
                <p
                    className="unauthorized-code"
                    aria-hidden="true" // Hide from screen readers (purely decorative)
                >
                    403
                </p>
                
                {/* Main Heading - Accessible page title */}
                <h1
                    className="unauthorized-title"
                    id="unauthorized-title"
                >
                    Access Denied
                </h1>
                
                {/* Explanation Message */}
                <p className="unauthorized-message">
                    You don't have permission to access this page.
                    This area requires administrator privileges.
                </p>
                
                {/* Navigation Link - Return to safe location */}
                <Link
                    to={redirectTo}
                    className="unauthorized-button"
                    aria-label="Go to homepage"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
};