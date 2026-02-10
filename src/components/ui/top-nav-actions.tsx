import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

export default function TopNavActions() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <>
      <div className="flex gap-3 absolute top-4 right-4">
        {/* 🚪 Logout */}
        <Button variant="destructive" onClick={handleLogout} id="feature-4">
          Logout
        </Button>
      </div>
    </>
  );
}
