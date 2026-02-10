import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Input Component Props
 * 
 * Extends all native HTML input element attributes
 * with additional customizations for styling and behavior
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Custom CSS classes to apply to the input
   * Merged with the default input classes
   */
  className?: string;
  
  /**
   * Input type (text, email, password, number, etc.)
   * Defaults to "text" if not specified
   */
  type?: React.HTMLInputTypeAttribute;
  
  /**
   * All other standard HTML input attributes
   */
  [key: string]: any;
}

/**
 * Input Component
 * 
 * A reusable, accessible input field component with comprehensive styling
 * and state management. Supports all native input types and includes
 * custom styling for focus, invalid, and disabled states.
 * 
 * @example
 * // Basic text input
 * <Input placeholder="Enter your name" />
 * 
 * // Email input with validation
 * <Input type="email" placeholder="email@example.com" required />
 * 
 * // Disabled input
 * <Input disabled value="Read-only content" />
 * 
 * // File input
 * <Input type="file" accept=".jpg,.png" />
 * 
 * @param className - Custom CSS classes
 * @param type - Input type (text, email, password, etc.)
 * @param props - All other HTML input attributes
 */
function Input({
  className,   // Custom CSS classes from parent
  type = "text", // Default to text input if type not specified
  ...props     // All other input element props
}: InputProps) {
  return (
    <input
      type={type}               // Input type attribute
      data-slot="input"         // For CSS targeting and styling hooks
      className={cn(
        // ============================================
        // BASE STYLES
        // ============================================
        "h-9 w-full min-w-0",           // Dimensions (height 36px, full width)
        "rounded-md border",            // Rounded corners with border
        "bg-transparent",               // Transparent background
        "px-3 py-1",                    // Padding (horizontal 12px, vertical 4px)
        "text-base md:text-sm",         // Responsive text size (16px base, 14px on medium+)
        "shadow-xs",                    // Subtle shadow for depth
        "transition-[color,box-shadow]", // Smooth transitions for color and shadow
        "outline-none",                 // Remove default outline (replaced with focus ring)
        
        // ============================================
        // BORDER & BACKGROUND
        // ============================================
        "border-input",                 // Border color from theme
        "dark:bg-input/30",             // Dark mode background with transparency
        
        // ============================================
        // TEXT & SELECTION
        // ============================================
        "placeholder:text-muted-foreground", // Placeholder text color from theme
        "selection:bg-primary",              // Background color when text is selected
        "selection:text-primary-foreground", // Text color when text is selected
        
        // ============================================
        // FILE INPUT STYLING
        // ============================================
        "file:inline-flex",             // File input as inline flex container
        "file:h-7",                     // File input height (28px)
        "file:border-0",                // Remove file input border
        "file:bg-transparent",          // Transparent file input background
        "file:text-sm",                 // File input text size (14px)
        "file:font-medium",             // File input font weight (medium)
        "file:text-foreground",         // File input text color from theme
        
        // ============================================
        // DISABLED STATE
        // ============================================
        "disabled:pointer-events-none", // Disable pointer events when disabled
        "disabled:cursor-not-allowed",  // Change cursor to not-allowed when disabled
        "disabled:opacity-50",          // Reduce opacity when disabled
        
        // ============================================
        // FOCUS STATE (Visible focus ring)
        // ============================================
        "focus-visible:border-ring",    // Change border color on focus
        "focus-visible:ring-ring/50",   // Add semi-transparent ring
        "focus-visible:ring-[3px]",     // Ring thickness (3px)
        
        // ============================================
        // INVALID STATE (Form validation errors)
        // ============================================
        "aria-invalid:border-destructive",        // Red border when invalid
        "aria-invalid:ring-destructive/20",       // Light red ring when invalid
        "dark:aria-invalid:ring-destructive/40",  // Dark mode red ring (more opaque)
        
        // ============================================
        // CUSTOM CLASSES
        // ============================================
        className                       // Merge with any custom classes
      )}
      {...props}                       // other input attributes
    />
  )
}

export { Input }