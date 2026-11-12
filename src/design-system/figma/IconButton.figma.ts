// url=https://www.figma.com/design/QL2ziCPwTmHCUqlQCmhi5t/Pickup---Brand?node-id=66-455
// source=https://github.com/figma/screentime-pickup/blob/main/src/design-system/components/icon-button.tsx
// component=IconButton
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('Variant', {
  Default: 'default',
  Overlay: 'overlay',
  Outline: 'outline',
  Secondary: 'secondary',
  Ghost: 'ghost',
  Destructive: 'destructive',
})
const size = instance.getEnum('Size', {
  Default: 'default',
  Compact: 'compact',
})
const state = instance.getEnum('State', {
  Default: 'default',
  Hover: 'hover',
  Pressed: 'pressed',
  Focus: 'focus',
  Disabled: 'disabled',
})
instance.getInstanceSwap('Icon')

export default {
  example: figma.code`<IconButton variant="${variant}" size="${size}" icon={HeartIcon} aria-label="Icon button" ${state === 'disabled' ? 'disabled' : ''} />`,
  imports: [
    'import { IconButton } from "@pickup/design-system"',
    'import { HeartIcon } from "@heroicons/react/24/outline"',
  ],
  id: 'icon-button',
  metadata: { nestable: true },
}
