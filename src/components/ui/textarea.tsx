import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Textarea Component Props
 */
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  rows?: number;
}

/**
 * Textarea Component
 * 
 * A reusable textarea component
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, rows = 3, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        data-slot="textarea"
        className={cn(
          // Base styles
          "w-full min-h-[80px]",
          "rounded-md border",
          "px-3 py-2",
          "text-sm",
          "shadow-xs",
          "transition-[color,box-shadow]",
          "outline-none",
          
          // Border & Background
          "border-input",
          "bg-background",
          "dark:bg-input/30",
          
          // Placeholder
          "placeholder:text-muted-foreground",
          
          // Selection
          "selection:bg-primary",
          "selection:text-primary-foreground",
          
          // Focus state
          "focus-visible:border-ring",
          "focus-visible:ring-ring/50",
          "focus-visible:ring-[3px]",
          
          // Disabled state
          "disabled:pointer-events-none",
          "disabled:cursor-not-allowed",
          "disabled:opacity-50",
          
          // Invalid state
          "aria-invalid:border-destructive",
          "aria-invalid:ring-destructive/20",
          "dark:aria-invalid:ring-destructive/40",
          
          // Custom classes
          className
        )}
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }