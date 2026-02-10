import { Loader2Icon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Props interface for the Spinner component
 * Extends standard SVG element attributes
 */
export interface SpinnerProps extends React.ComponentProps<"svg"> {
  /**
   * Custom CSS classes to apply to the spinner
   * Useful for changing size, color, or adding custom animations
   */
  className?: string;
  
  /**
   * Additional props passed to the SVG element
   */
  [key: string]: any;
}

/**
 * A reusable Spinner component for indicating loading states
 * 
 * This component displays an animated spinning icon that can be used
 * to show that content is loading or an operation is in progress.
 * 
 * @example
 * // Basic usage
 * <Spinner />
 * 
 * // Custom size
 * <Spinner className="size-8" />
 * 
 * // Custom color
 * <Spinner className="text-blue-500" />
 */
function Spinner({ 
  className,  // Custom CSS classes
  ...props    // All other SVG props
}: SpinnerProps) {
  return (
    <Loader2Icon
      role="status"           // ARIA role for accessibility
      aria-label="Loading"    // Screen reader label
      className={cn(
        "size-4",             // Default size (16px = 1rem)
        "animate-spin",       // Spinning animation
        className            // Custom classes from parent
      )}
      {...props}
    />
  )
}

export { Spinner }