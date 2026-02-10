import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import "./sonner.css"

/**
 * Custom Toaster component that wraps the Sonner library for displaying toast notifications
 * Integrates with the application's theme and provides custom icons for different toast types
 * @param props - All props supported by the Sonner Toaster component, with additional theming and styling
 * @returns A styled Toaster component ready to be used in the application for displaying notifications
 * @example
 * // To use the Toaster in your application, simply include it at the root level:
 * <Toaster />
 * // Then you can trigger toasts from anywhere in your app using the Sonner API:
 * import { toast } from "sonner";
 * toast.success("This is a success message!");
 * toast.error("This is an error message!");
 * toast.info("This is an info message!");
 * toast.warning("This is a warning message!");
 * toast.loading("This is a loading message...");
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="toast-icon" />,
        info: <InfoIcon className="toast-icon" />,
        warning: <TriangleAlertIcon className="toast-icon" />,
        error: <OctagonXIcon className="toast-icon" />,
        loading: <Loader2Icon className="toast-icon toast-icon-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
