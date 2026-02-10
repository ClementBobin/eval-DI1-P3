import * as React from "react"
import { cn } from "@/lib/utils"
import "./select.css";

/**
 * Props interface for the Select component
 */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

/**
 * Select Component
 * 
 * A reusable select dropdown component styled to match shadcn/ui aesthetics
 * without using TailwindCSS.
 */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "select-base",
          className
        )}
        {...props}
      >
        {children}
      </select>
    )
  }
)

Select.displayName = "Select"

/**
 * SelectItem Component
 * 
 * Individual option item for the Select component
 */
const SelectItem = React.forwardRef<HTMLOptionElement, React.OptionHTMLAttributes<HTMLOptionElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <option
        ref={ref}
        className={cn(
          "select-item",
          className
        )}
        {...props}
      >
        {children}
      </option>
    )
  }
)

SelectItem.displayName = "SelectItem"

export { Select, SelectItem }