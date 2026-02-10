import * as React from "react"
import "./label.css"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

/**
 * Label Component
 *
 * A reusable label component that supports forwarding refs and accepts all standard label attributes. It also allows for custom styling through the `className` prop.
 * @param {string} [htmlFor] - The id of the form element that this label is associated with
 * @param {React.ReactNode} children - The content to be displayed within the label
 * @returns {JSX.Element} - The rendered label component
 * @example
 * <Label htmlFor="input-id" className="custom-label">This is a label</Label>
 */
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ 
    className = "",
    children,
    htmlFor,
    ...props
  }, ref) => {
    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        data-slot="label"
        className={`label ${className}`.trim()}
        {...props}
      >
        {children}
      </label>
    )
  }
)

Label.displayName = "Label"

export { Label }