import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent whitespace-nowrap transition-[color,background-color] outline-none select-none focus-visible:border-transparent focus-visible:ring-3 focus-visible:ring-ring active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:border-transparent disabled:bg-interaction-subtle disabled:text-muted-foreground disabled:shadow-none disabled:no-underline disabled:backdrop-blur-sm aria-invalid:border-transparent aria-invalid:ring-3 aria-invalid:ring-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-pressed",
        outline:
          "border-border bg-transparent hover:bg-interaction-subtle hover:text-foreground hover:backdrop-blur-sm active:bg-interaction active:backdrop-blur-sm aria-expanded:bg-interaction-subtle aria-expanded:text-foreground aria-expanded:backdrop-blur-sm",
        secondary:
          "bg-interaction-subtle text-secondary-foreground backdrop-blur-sm hover:bg-interaction active:bg-interaction-strong aria-expanded:bg-interaction aria-expanded:text-secondary-foreground",
        overlay:
          "bg-card text-primary hover:bg-card-hover aria-expanded:bg-card aria-expanded:text-primary",
        ghost:
          "hover:bg-interaction-subtle hover:text-foreground hover:backdrop-blur-sm active:bg-interaction active:backdrop-blur-sm aria-expanded:bg-interaction-subtle aria-expanded:text-foreground aria-expanded:backdrop-blur-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive-hover",
        // Outline corners grow by offset + width: 1px + 4px + 3px = the 8px ring radius in Figma.
        link: "rounded-[1px] text-primary underline underline-offset-4 hover:text-primary-hover focus-visible:border-transparent focus-visible:ring-0 focus-visible:outline-solid focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-ring active:text-primary-pressed disabled:bg-transparent disabled:backdrop-blur-none",
      },
      size: {
        default:
          "h-control gap-2 px-4 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        compact:
          "h-control-compact gap-2 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-control p-0 [&_svg:not([class*='size-'])]:size-icon",
        "icon-compact":
          "size-control-compact p-0 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    compoundVariants: [
      {
        variant: "link",
        size: ["default", "compact"],
        class:
          "h-auto gap-1 px-0 has-data-[icon=inline-end]:pr-0 has-data-[icon=inline-start]:pl-0",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
