"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

import { Button } from "@/design-system/components/button"
import { Input } from "@/design-system/components/input"
import {
  inputSurfaceVariants,
  type InputSurfaceVariant,
} from "@/design-system/components/input-surface-variants"
import { Textarea } from "@/design-system/components/textarea"

const inputGroupStateClasses =
  "has-disabled:bg-interaction-subtle has-disabled:text-muted-foreground has-disabled:backdrop-blur-sm has-[[data-slot=input-group-control]:focus-visible]:border-transparent has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-ring has-[[data-slot][aria-invalid=true]]:border-transparent has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive"

const inputGroupLayoutClasses =
  "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-2 has-[>[data-align=inline-start]]:[&>input]:pl-2"

function InputGroup({
  className,
  variant = "filled",
  ...props
}: React.ComponentProps<"div"> & { variant?: InputSurfaceVariant }) {
  return (
    <div
      data-slot="input-group"
      data-variant={variant}
      role="group"
      className={cn(
        "group/input-group relative flex h-control w-full min-w-0 items-center rounded-lg border border-transparent transition-[color,background-color] outline-none",
        inputGroupStateClasses,
        inputGroupLayoutClasses,
        inputSurfaceVariants[variant],
        className
      )}
      {...props}
    />
  )
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 text-muted-foreground select-none group-has-disabled/input-group:text-muted-foreground [&>svg:not([class*='size-'])]:size-icon",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-4 has-[>button]:pl-2",
        "inline-end": "order-last pr-4 has-[>button]:pr-2",
        "block-start":
          "order-first w-full justify-start px-4 pt-3 [.border-b]:pb-3",
        "block-end":
          "order-last w-full justify-start px-4 pb-3 [.border-t]:pt-3",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

function InputGroupButton({
  type = "button",
  variant = "ghost",
  size = "compact",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> & {
  size?: "compact" | "icon-compact"
}) {
  return <Button type={type} variant={variant} size={size} {...props} />
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-icon",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent disabled:backdrop-blur-none aria-invalid:ring-0",
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent disabled:backdrop-blur-none aria-invalid:ring-0",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
