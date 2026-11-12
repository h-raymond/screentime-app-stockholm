"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent p-1 transition-[color,background-color] outline-none group-has-[:focus-visible]/field-label:border-transparent group-has-[:focus-visible]/field-label:ring-0 after:absolute after:-inset-2 focus-visible:ring-3 focus-visible:ring-ring aria-invalid:ring-3 aria-invalid:ring-destructive data-[size=default]:h-8 data-[size=default]:w-12 data-[size=sm]:h-6 data-[size=sm]:w-10 data-checked:bg-primary data-unchecked:bg-interaction data-disabled:cursor-not-allowed data-disabled:bg-interaction-subtle data-disabled:backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block rounded-full bg-card ring-0 transition-transform group-data-[size=default]/switch:size-6 group-data-[size=sm]/switch:size-4 group-data-[size=default]/switch:data-checked:translate-x-4 group-data-[size=sm]/switch:data-checked:translate-x-4 group-data-disabled/switch:bg-interaction dark:data-checked:bg-primary-foreground dark:data-unchecked:bg-foreground dark:group-data-disabled/switch:bg-interaction group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
