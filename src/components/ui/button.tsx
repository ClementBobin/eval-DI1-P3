import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Define the CSS variants for the button using class-variance-authority
// This creates a function that returns the appropriate CSS classes based on props
const buttonVariants = cva(
  // Base CSS classes that apply to ALL button variants
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 shrink-0 outline-none",
  
  // Define the different visual variants and sizes
  {
    variants: {
      // VARIANT: Controls the button's visual style (colors, background, etc.)
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      
      // SIZE: Controls the button's dimensions and padding
      size: {
        default: "h-9 px-4 py-2",
        xs: "h-6 rounded-md px-2 text-xs",
        sm: "h-8 rounded-md px-3",
        lg: "h-10 rounded-md px-6",
        
        // Icon-only variants
        icon: "h-9 w-9",
        "icon-xs": "h-6 w-6 rounded-md",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-10 w-10",
      },
    },
    
    // Default values if no variant/size is specified
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Props interface for the Button component
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, // Standard button HTML props
    VariantProps<typeof buttonVariants> { // Props for controlling variants
}

// The Button component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,      // Custom CSS classes from parent
    variant,        // Button style variant
    size,           // Button size
    type = "button", // Button type (defaults to "button")
    children,       // Button content
    disabled,       // Disabled state
    ...props
  }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        data-slot="button" // For CSS targeting if needed
        // Combine the variant classes with any custom classes
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </button>
    )
  }
)

// Set display name for better debugging
Button.displayName = "Button"

// Export the component and the variants function for reuse
export { Button, buttonVariants }