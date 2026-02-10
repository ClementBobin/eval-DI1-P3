import { Link } from "react-router-dom";
import "./not-found-page.css";

/**
 * Not Found Page Component
 * 
 * Displays a 404 error page when a user navigates to a non-existent route.
 * Provides a clear message and navigation back to the home page.
 * 
 * @example
 * // In React Router configuration
 * <Route path="*" element={<NotFound />} />
 * 
 * @returns React.FC - The 404 not found page component
 */
export default function NotFound() {
    return (
        <div 
            className="not-found-page"
            role="main"
        >
            <div 
                className="not-found-container"
                role="document"
            >
                {/* Error Code Display - Visual indicator only */}
                <p 
                    className="not-found-code"
                    aria-hidden="true" // Hide from screen readers (purely decorative)
                >
                    404
                </p>
                
                {/* Main Heading - Accessible page title */}
                <h1 
                    className="not-found-title"
                    id="notfound-title"
                >
                    Page Not Found
                </h1>
                
                {/* Explanation Message */}
                <p className="not-found-message">
                    The page you're looking for doesn't exist or has been moved. 
                    Check the URL or return to the homepage.
                </p>
                
                {/* Navigation Link - Return to home page */}
                <Link
                    to="/"
                    className="not-found-button"
                    aria-label="Go to homepage"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
}