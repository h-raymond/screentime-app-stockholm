// url=https://www.figma.com/design/QL2ziCPwTmHCUqlQCmhi5t/Pickup---Brand?node-id=66-433
// source=https://github.com/figma/screentime-pickup/blob/main/src/design-system/components/empty.tsx
// component=Empty
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const description = instance.getString('Description')
const action = instance.getBoolean('Action')
// Figma exposes the nested Action button's Label property at this level.
const actionLabel = instance.getString('Label')
instance.getInstanceSwap('Icon')

export default {
  example: figma.code`<EmptyState
  icon={ShoppingBagIcon}
  title="${title}"
  description="${description}"
  ${action ? `action={<Button>${actionLabel}</Button>}` : ''}
/>`,
  imports: [
    'import { Button, EmptyState } from "@pickup/design-system"',
    'import { ShoppingBagIcon } from "@heroicons/react/24/outline"',
  ],
  id: 'empty',
  metadata: { nestable: true },
}
