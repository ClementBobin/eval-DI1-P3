import * as React from "react"
import "./label.css"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

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