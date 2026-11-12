import * as React from "react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/design-system/components/empty"

type EmptyStateProps = Omit<React.ComponentProps<typeof Empty>, "children"> & {
  icon: React.ElementType
  title: React.ReactNode
  description: React.ReactNode
  action?: React.ReactNode
}

/**
 * Pickup's one-to-one code counterpart for the Figma Empty component.
 * Use the underlying Empty primitives when a screen needs custom structure.
 */
function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  ...props
}: EmptyStateProps) {
  return (
    <Empty {...props}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon aria-hidden />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {action && <EmptyContent>{action}</EmptyContent>}
    </Empty>
  )
}

export { EmptyState }
