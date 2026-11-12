// url=https://www.figma.com/design/QL2ziCPwTmHCUqlQCmhi5t/Pickup---Brand?node-id=66-437
// source=https://github.com/figma/screentime-pickup/blob/main/src/design-system/components/skeleton.tsx
// component=Skeleton
import figma from 'figma'

export default {
  example: figma.code`
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  `,
  imports: ['import { Skeleton } from "@pickup/design-system"'],
  id: 'skeleton-stack',
  metadata: { nestable: true },
}
