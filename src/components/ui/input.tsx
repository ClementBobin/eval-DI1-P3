import * as React from "react"
import "./input.css"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: React.HTMLInputTypeAttribute;
}

/**
 * Input Component
 *
 * A reusable input component that supports forwarding refs and accepts all standard input attributes. It also allows for custom styling through the `className` prop and can be configured with different input types.
 *
 * @example
 * <Input
 *   className="custom-input"
 *   type="email"
 *   placeholder="Enter your email"
 * />
 *
 * @param {string} [className] - Additional CSS classes to apply to the input element
 * @param {string} [type="text"] - The type of the input element (e.g., text, email, password)
 * @param {React.ReactNode} children - The content to be displayed for the input (if applicable)
 * @returns {JSX.Element} - The rendered input component
 */
function Input({
  className = "",
  type = "text",
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={`input ${className}`.trim()}
      {...props}
    />
  )
}

export { Input }