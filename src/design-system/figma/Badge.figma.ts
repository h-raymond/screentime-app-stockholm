// url=https://www.figma.com/design/QL2ziCPwTmHCUqlQCmhi5t/Pickup---Brand?node-id=66-383
// source=https://github.com/figma/screentime-pickup/blob/main/src/design-system/components/badge.tsx
// component=Badge
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('Variant', {
  Default: 'default',
  Secondary: 'secondary',
  Outline: 'outline',
  Condition: 'condition',
})
const label = instance.getString('Label')

export default {
  example: figma.code`<Badge variant="${variant}">${label}</Badge>`,
  imports: ['import { Badge } from "@pickup/design-system"'],
  id: 'badge',
  metadata: { nestable: true },
}
