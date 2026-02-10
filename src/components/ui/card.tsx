import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Main Card Container Component
 * 
 * This is the primary container that wraps all card content.
 * It provides the base styling, border, shadow, and layout structure.
 * 
 * @param className - Custom CSS classes to apply
 * @param props - All other div element props
 * 
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *   </CardHeader>
 *   <CardContent>Content here</CardContent>
 * </Card>
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"          // For CSS targeting and styling hooks
      className={cn(
        // Base card styling
        "bg-card",              // Background color from theme
        "text-card-foreground", // Text color from theme
        "flex flex-col gap-6",  // Flex column layout with spacing
        "rounded-xl border",    // Rounded corners with border
        "py-6 shadow-sm",       // Padding and subtle shadow
        className               // Custom classes
      )}
      {...props}
    />
  )
}

/**
 * Card Header Component
 * 
 * The top section of the card, typically containing the title,
 * description, and optional actions. Supports responsive layout
 * with container queries when an action is present.
 * 
 * @param className - Custom CSS classes to apply
 * @param props - All other div element props
 * 
 * @example
 * <CardHeader>
 *   <CardTitle>Title</CardTitle>
 *   <CardDescription>Description</CardDescription>
 *   <CardAction>
 *     <Button>Action</Button>
 *   </CardAction>
 * </CardHeader>
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"    // For CSS targeting
      className={cn(
        "@container/card-header", // Enable container queries for responsive layout
        "grid auto-rows-min grid-rows-[auto_auto]", // Grid layout with auto rows
        "items-start gap-2 px-6", // Alignment and spacing
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]", // Responsive columns when action exists
        "[.border-b]:pb-6",       // Padding bottom when border-bottom is applied
        className                  // Custom classes
      )}
      {...props}
    />
  )
}

/**
 * Card Title Component
 * 
 * The primary heading for the card content. Uses semantic styling
 * to stand out while maintaining readability.
 * 
 * @param className - Custom CSS classes to apply
 * @param props - All other div element props
 * 
 * @example
 * <CardTitle>User Profile</CardTitle>
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"    // For CSS targeting
      className={cn(
        "leading-none",         // Tight line height
        "font-semibold",        // Semi-bold font weight for emphasis
        className               // Custom classes
      )}
      {...props}
    />
  )
}

/**
 * Card Description Component
 * 
 * A secondary text element for providing additional context,
 * explanations, or subtitles. Uses muted styling to differentiate
 * from the main title.
 * 
 * @param className - Custom CSS classes to apply
 * @param props - All other div element props
 * 
 * @example
 * <CardDescription>View and edit your profile information</CardDescription>
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description" // For CSS targeting
      className={cn(
        "text-muted-foreground",   // Muted text color from theme
        "text-sm",                 // Small text size
        className                  // Custom classes
      )}
      {...props}
    />
  )
}

/**
 * Card Action Component
 * 
 * A container for action buttons or interactive elements in the
 * card header. Automatically positions itself to the right when
 * used within a CardHeader.
 * 
 * @param className - Custom CSS classes to apply
 * @param props - All other div element props
 * 
 * @example
 * <CardAction>
 *   <Button variant="outline">Edit</Button>
 * </CardAction>
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"    // For CSS targeting
      className={cn(
        "col-start-2 row-span-2 row-start-1", // Grid positioning
        "self-start justify-self-end",        // Alignment to top-right
        className                              // Custom classes
      )}
      {...props}
    />
  )
}

/**
 * Card Content Component
 * 
 * The main content area of the card. Provides consistent padding
 * and serves as the container for the primary card content.
 * 
 * @param className - Custom CSS classes to apply
 * @param props - All other div element props
 * 
 * @example
 * <CardContent>
 *   <p>Your main content goes here...</p>
 * </CardContent>
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content" // For CSS targeting
      className={cn(
        "px-6",               // Horizontal padding matching CardHeader
        className             // Custom classes
      )}
      {...props}
    />
  )
}

/**
 * Card Footer Component
 * 
 * The bottom section of the card, typically used for additional
 * actions, status information, or supplemental content.
 * 
 * @param className - Custom CSS classes to apply
 * @param props - All other div element props
 * 
 * @example
 * <CardFooter>
 *   <Button>Save Changes</Button>
 *   <Button variant="outline">Cancel</Button>
 * </CardFooter>
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer" // For CSS targeting
      className={cn(
        "flex items-center",  // Flex layout with centered items
        "px-6",               // Horizontal padding matching CardHeader
        "[.border-t]:pt-6",   // Padding top when border-top is applied
        className             // Custom classes
      )}
      {...props}
    />
  )
}

/**
 * Export all card components
 * 
 * Provides a complete card system with all sub-components
 */
export {
  Card,            // Main card container
  CardHeader,      // Card header with title, description, and action
  CardFooter,      // Card footer for actions or additional info
  CardTitle,       // Primary card title
  CardAction,      // Action buttons in header
  CardDescription, // Secondary description text
  CardContent,     // Main content area
}