import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Props interface for the Label component
 * Extends standard label HTML attributes
 */
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * The ID of the input element this label is associated with
   * This creates proper accessibility binding
   */
  htmlFor?: string;
}

/**
 * A reusable Label component for form inputs
 * 
 * This component provides consistent styling and accessibility
 * for labeling form elements. It automatically handles disabled
 * states and maintains proper spacing.
 */
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ 
    className,     // Custom CSS classes from parent
    children,      // Label text/content
    htmlFor,       // Associated input ID
    ...props       // All other label props
  }, ref) => {
    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        data-slot="label"          // For CSS targeting if needed
        className={cn(
          // Base styles
          "flex items-center gap-2 text-sm leading-none font-medium select-none",
          
          // Disabled state handling
          "group-data-[disabled=true]:pointer-events-none",  // Prevent interactions when parent is disabled
          "group-data-[disabled=true]:opacity-50",           // Reduce opacity when parent is disabled
          "peer-disabled:cursor-not-allowed",               // Change cursor when associated input is disabled
          "peer-disabled:opacity-50",                       // Reduce opacity when associated input is disabled
          
          // Custom classes
          className
        )}
        {...props}
      >
        {children}
      </label>
    )
  }
)

// Set display name for better debugging
Label.displayName = "Label"

// Export the component
export { Label }