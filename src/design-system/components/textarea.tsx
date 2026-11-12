import * as React from "react"

import {
  inputSurfaceVariants,
  type InputSurfaceVariant,
} from "@/design-system/components/input-surface-variants"
import { cn } from "@/lib/utils"

function Textarea({
  className,
  variant = "filled",
  ...props
}: React.ComponentProps<"textarea"> & { variant?: InputSurfaceVariant }) {
  return (
    <textarea
      data-slot="textarea"
      data-variant={variant}
      className={cn(
        "flex field-sizing-content min-h-24 w-full rounded-lg border border-transparent px-4 py-3 transition-[color,background-color] outline-none placeholder:text-muted-foreground focus-visible:border-transparent focus-visible:ring-3 focus-visible:ring-ring disabled:cursor-not-allowed disabled:bg-interaction-subtle disabled:text-muted-foreground disabled:backdrop-blur-sm aria-invalid:border-transparent aria-invalid:ring-3 aria-invalid:ring-destructive",
        inputSurfaceVariants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
