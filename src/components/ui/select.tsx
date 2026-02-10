import * as React from "react"
import "./select.css";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

/**
 * Select Component
 *
 * A reusable select component that supports forwarding refs and accepts all standard select attributes. It also allows for custom styling through the `className` prop.
 *
 * @example
 * <Select className="custom-select" defaultValue=""></Select>
 *   <SelectItem value="" disabled>Select an option</SelectItem>
 *   <SelectItem value="option1">Option 1</SelectItem>
 *  <SelectItem value="option2">Option 2</SelectItem>
 * </Select>
 *
 * @param {string} [className] - Additional CSS classes to apply to the select element
 * @param {React.ReactNode} children - The option elements to be rendered inside the select
 * @returns {JSX.Element} - The rendered select component
 */
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



/** * SelectItem Component
 *
 * A reusable option component for use within the Select component. It supports forwarding refs and accepts all standard option attributes. It also allows for custom styling through the `className` prop.
 *
 * @example
 * <Select>
 *   <SelectItem value="" disabled>Select an option</SelectItem>
 *   <SelectItem value="option1">Option 1</SelectItem>
 *   <SelectItem value="option2">Option 2</SelectItem>
 * </Select>
 *
 * @param {string} [className] - Additional CSS classes to apply to the option element
 * @param {React.ReactNode} children - The content to be displayed for the option
 * @returns {JSX.Element} - The rendered option component
 */
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