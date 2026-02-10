import * as React from "react"
import "./select.css";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`select-base ${className}`.trim()}
        {...props}
      >
        {children}
      </select>
    )
  }
)

Select.displayName = "Select"

const SelectItem = React.forwardRef<HTMLOptionElement, React.OptionHTMLAttributes<HTMLOptionElement>>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <option
        ref={ref}
        className={`select-item ${className}`.trim()}
        {...props}
      >
        {children}
      </option>
    )
  }
)

SelectItem.displayName = "SelectItem"

export { Select, SelectItem }