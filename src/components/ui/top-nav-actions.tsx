import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import "./top-navigation-actions.css";

/**
 * Top Navigation Actions Component
 * 
 * Provides user-specific actions in the top navigation bar.
 * Currently handles logout functionality with user feedback
 * and automatic navigation.
 * 
 * @example
 * // Usage in layout component
 * <header className="app-header">
 *   <Logo />
 *   <TopNavActions />
 * </header>
 * 
 * @example
 * // Usage with additional actions
 * function EnhancedTopNavActions() {
 *   return (
 *     <div className="nav-actions">
 *       <ThemeToggle />
 *       <Notifications />
 *       <UserMenu />
 *       <TopNavActions />
 *     </div>
 *   );
 * }
 * 
 * @returns React.FC - The top navigation actions component
 */
export default function TopNavActions() {
  // ============================================
  // HOOKS & CONTEXT
  // ============================================
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  // ============================================
  // EVENT HANDLERS
  // ============================================
  
  /**
   * Handle user logout
   * 
   * Performs the logout flow:
   * 1. Calls authentication context logout function
   * 2. Shows success feedback to user
   * 3. Navigates to login page
   * 
   * @async
   * @returns Promise<void>
   */
  const handleLogout = async (): Promise<void> => {
    try {
      logout();
      toast.success("Logged out successfully");
      navigate("/login");
      
    } catch (error) {
      // Handle any unexpected errors
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };
  
  // ============================================
  // RENDER
  // ============================================
  
  return (
    <div
      className="top-navigation-actions"
      role="toolbar"
      aria-label="User actions"
    >
      <Button
        variant="destructive"
        onClick={handleLogout}
        id="logout-button"
        className="logout-button"
        aria-label="Logout from application"
        title="Click to logout from your account"
      >
        Logout
      </Button>
    </div>
  );
}