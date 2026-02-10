import * as React from "react"
import "./textarea.css"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  rows?: number;
}

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