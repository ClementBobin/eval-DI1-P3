import * as React from "react"
import "./card.css"

/**
 * Card Component
 * A reusable card component that provides a structured layout for displaying content. It includes subcomponents for the header, title, description, action, content, and footer sections of the card. Each subcomponent accepts standard div attributes and allows for custom styling through the `className` prop.
 * @example
 * <Card className="custom-card">
 *   <CardHeader className="custom-card-header">
 *    <CardTitle className="custom-card-title">Card Title</CardTitle>
 *     <CardDescription className="custom-card-description">This is a description of the card.</CardDescription>
 *  </CardHeader>
 *  <CardContent className="custom-card-content">
 *   <p>This is the main content of the card.</p>
 * </CardContent>
 * <CardAction className="custom-card-action">
 *  <button>Action</button>
 * </CardAction>
 * <CardFooter className="custom-card-footer">
 * <p>Card Footer</p>
 * </CardFooter>
 * </Card>
 * @param {string} [className] - Additional CSS classes to apply to the card element
 * @param {React.ReactNode} children - The content to be displayed within the card
 * @returns {JSX.Element} - The rendered card component
 */
function Card({ className = "", ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={`card ${className}`.trim()}
      {...props}
    />
  )
}



/**
 * CardHeader Component
 * A subcomponent of the Card that represents the header section. It accepts standard div attributes and allows for custom styling through the `className` prop.
 * @param {string} [className] - Additional CSS classes to apply to the card header element
 * @param {React.ReactNode} children - The content to be displayed within the card header
 * @returns {JSX.Element} - The rendered card header component
 */
function CardHeader({ className = "", ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={`card-header ${className}`.trim()}
      {...props}
    />
  )
}

/**
 * CardTitle Component
 * A subcomponent of the Card that represents the title section. It accepts standard div attributes and allows for custom styling through the `className` prop.
 * @param {string} [className] - Additional CSS classes to apply to the card title element
 * @param {React.ReactNode} children - The content to be displayed within the card title
 * @returns {JSX.Element} - The rendered card title component
 */
function CardTitle({ className = "", ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={`card-title ${className}`.trim()}
      {...props}
    />
  )
}


/** * CardDescription Component
 * A subcomponent of the Card that represents the description section. It accepts standard div attributes and allows for custom styling through the `className` prop.
 * @param {string} [className] - Additional CSS classes to apply to the card description element
 * @param {React.ReactNode} children - The content to be displayed within the card description
 * @returns {JSX.Element} - The rendered card description component
 */
function CardDescription({ className = "", ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={`card-description ${className}`.trim()}
      {...props}
    />
  )
}


/**
 * CardAction Component
 * A subcomponent of the Card that represents the action section. It accepts standard div attributes and allows for custom styling through the `className` prop.
 * @param {string} [className] - Additional CSS classes to apply to the card action element
 * @param {React.ReactNode} children - The content to be displayed within the card action
 * @returns {JSX.Element} - The rendered card action component
 */
function CardAction({ className = "", ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={`card-action ${className}`.trim()}
      {...props}
    />
  )
}


/** * CardContent Component
 * A subcomponent of the Card that represents the main content section. It accepts standard div attributes and allows for custom styling through the `className` prop.
 * @param {string} [className] - Additional CSS classes to apply to the card content element
 * @param {React.ReactNode} children - The content to be displayed within the card content
 * @returns {JSX.Element} - The rendered card content component
 */
function CardContent({ className = "", ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={`card-content ${className}`.trim()}
      {...props}
    />
  )
}


/**
 * CardFooter Component
 * A subcomponent of the Card that represents the footer section. It accepts standard div attributes and allows for custom styling through the `className` prop.
 * @param {string} [className] - Additional CSS classes to apply to the card footer element
 * @param {React.ReactNode} children - The content to be displayed within the card footer
 * @returns {JSX.Element} - The rendered card footer component
 */
function CardFooter({ className = "", ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={`card-footer ${className}`.trim()}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}