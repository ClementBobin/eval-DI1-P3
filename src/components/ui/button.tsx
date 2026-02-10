import * as React from "react"
import "./button.css"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className = "",
    variant = "default",
    size = "default",
    type = "button",
    children,
    disabled,
    ...props
  }, ref) => {
    const variantClass = `button-${variant}`;
    const sizeClass = size === "default" ? "button-size-default" : `button-${size}`;
    const classes = `button ${variantClass} ${sizeClass} ${className}`.trim();
    
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        data-slot="button"
        className={classes}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }