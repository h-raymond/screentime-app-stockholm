// url=https://www.figma.com/design/QL2ziCPwTmHCUqlQCmhi5t/Pickup---Brand?node-id=2378-8889
// source=https://github.com/figma/screentime-pickup/blob/main/src/design-system/components/checkbox.tsx
// component=Checkbox
import figma from 'figma'
const instance = figma.selectedInstance

const checked = instance.getEnum('Checked', {
  False: '',
  True: 'defaultChecked',
  Indeterminate: 'defaultChecked="indeterminate"',
})
const state = instance.getEnum('State', {
  Default: 'default',
  Focus: 'focus',
  Invalid: 'invalid',
  Disabled: 'disabled',
})

export default {
  example: figma.code`<Checkbox ${checked} ${state === 'invalid' ? 'aria-invalid' : ''} ${state === 'disabled' ? 'disabled' : ''} />`,
  imports: ['import { Checkbox } from "@pickup/design-system"'],
  id: 'checkbox',
  metadata: { nestable: true },
}
