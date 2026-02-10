import * as React from "react"
import "./input.css"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: React.HTMLInputTypeAttribute;
}

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