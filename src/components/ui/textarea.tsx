import * as React from "react"
import "./textarea.css"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  rows?: number;
}

/**
 * Textarea Component
 *
 * A reusable textarea component that supports forwarding refs and accepts all standard textarea attributes. It also allows for custom styling through the `className` prop and can be configured with a default number of rows.
 *
 * @example
 * <Textarea
 *   className="custom-textarea"
 *   rows={5}
 *   placeholder="Enter your text here..."
 * />
 *
 * @param {string} [className] - Additional CSS classes to apply to the textarea
 * @param {number} [rows=3] - The number of visible text lines for the textarea (default is 3)
 * @returns {JSX.Element} - The rendered textarea component
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", rows = 3, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        data-slot="textarea"
        className={`textarea ${className}`.trim()}
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }