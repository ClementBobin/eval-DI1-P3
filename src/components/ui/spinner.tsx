import { Loader2Icon } from "lucide-react"
import "./spinner.css"

/**
 * Props interface for the Spinner component
 */
export interface SpinnerProps extends React.ComponentProps<"svg"> {
  /**
   * Custom CSS classes to apply to the spinner
   */
  className?: string;
  
  /**
   * Size of the spinner
   */
  size?: 'small' | 'medium' | 'large';
}

/**
 * A reusable Spinner component for indicating loading states
 * 
 * @param className - Custom CSS classes
 * @param size - Size of the spinner (small, medium, large)
 * @param props - All other SVG props
 */
function Spinner({ 
  className = "",
  size = "medium",
  ...props
}: SpinnerProps) {
  const sizeClass = size === 'small' ? 'spinner-small' : size === 'large' ? 'spinner-large' : 'spinner-medium';
  
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={`spinner ${sizeClass} ${className}`.trim()}
      {...props}
    />
  )
}

export { Spinner }