// url=https://www.figma.com/design/QL2ziCPwTmHCUqlQCmhi5t/Pickup---Brand?node-id=2327-8860
// source=https://github.com/figma/screentime-pickup/blob/main/src/design-system/components/switch.tsx
// component=Switch
import figma from 'figma'
const instance = figma.selectedInstance

const size = instance.getEnum('Size', {
  Default: 'default',
  Sm: 'sm',
})
const checked = instance.getEnum('Checked', {
  True: 'true',
  False: 'false',
})
const state = instance.getEnum('State', {
  Default: 'default',
  Focus: 'focus',
  Disabled: 'disabled',
  Invalid: 'invalid',
})

export default {
  example: figma.code`<Switch size="${size}" ${checked === 'true' ? 'defaultChecked' : ''} ${state === 'disabled' ? 'disabled' : ''} ${state === 'invalid' ? 'aria-invalid' : ''} />`,
  imports: ['import { Switch } from "@pickup/design-system"'],
  id: 'switch',
  metadata: { nestable: true },
}
