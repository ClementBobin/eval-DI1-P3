import * as React from "react"
import "./button.css"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
}


/**
 * Button Component
 * A reusable button component that supports forwarding refs and accepts all standard button attributes. It also allows for custom styling through the `className` prop and can be configured with different variants and sizes.
 * @example
 * <Button variant="destructive" size="lg" onClick={() => alert('Button clicked!')}>
 *   Click Me
 * </Button>
 * @param {string} [variant="default"] - The visual style of the button (e.g., default, destructive, outline)
 * @param {string} [size="default"] - The size of the button (e.g., default, xs, sm, lg)
 * @param {React.ReactNode} children - The content to be displayed within the button
 * @returns {JSX.Element} - The rendered button component
 */
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