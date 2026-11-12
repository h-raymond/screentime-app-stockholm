import * as React from "react"

import {
  inputSurfaceVariants,
  type InputSurfaceVariant,
} from "@/design-system/components/input-surface-variants"
import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  variant = "filled",
  ...props
}: React.ComponentProps<"input"> & { variant?: InputSurfaceVariant }) {
  return (
    <input
      type={type}
      data-slot="input"
      data-variant={variant}
      className={cn(
        "h-control w-full min-w-0 rounded-lg border border-transparent px-4 transition-[color,background-color] outline-none file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-foreground placeholder:text-muted-foreground focus-visible:border-transparent focus-visible:ring-3 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-interaction-subtle disabled:text-muted-foreground disabled:backdrop-blur-sm aria-invalid:border-transparent aria-invalid:ring-3 aria-invalid:ring-destructive",
        inputSurfaceVariants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Input }
