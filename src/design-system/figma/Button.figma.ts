// url=https://www.figma.com/design/QL2ziCPwTmHCUqlQCmhi5t/Pickup---Brand?node-id=66-332
// source=https://github.com/figma/screentime-pickup/blob/main/src/design-system/components/button.tsx
// component=Button
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('Variant', {
  Default: 'default',
  Overlay: 'overlay',
  Outline: 'outline',
  Secondary: 'secondary',
  Ghost: 'ghost',
  Destructive: 'destructive',
  Link: 'link',
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
const trailingIcon = instance.getBoolean('Trailing icon')
const icon = instance.getInstanceSwap('Icon')
const label = instance.getString('Label')

let example = figma.code`<Button variant="${variant}" size="${size}" ${state === 'disabled' ? 'disabled' : ''}>${label}</Button>`

if (trailingIcon && icon && icon.type === 'INSTANCE') {
  const iconExample = icon.executeTemplate().example
  example = figma.code`<Button variant="${variant}" size="${size}" ${state === 'disabled' ? 'disabled' : ''}>${label}${iconExample}</Button>`
}

export default {
  example,
  imports: ['import { Button } from "@pickup/design-system"'],
  id: 'button',
  metadata: { nestable: true },
}
