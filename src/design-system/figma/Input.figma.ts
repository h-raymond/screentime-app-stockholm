// url=https://www.figma.com/design/QL2ziCPwTmHCUqlQCmhi5t/Pickup---Brand?node-id=106-111
// source=https://github.com/figma/screentime-pickup/blob/main/src/design-system/components/input.tsx
// component=Input
import figma from 'figma'
const instance = figma.selectedInstance

const type = instance.getEnum('Type', {
  Input: 'input',
  Textarea: 'textarea',
})
const variant = instance.getEnum('Variant', {
  Filled: 'filled',
  Outline: 'outline',
})
const state = instance.getEnum('State', {
  Default: 'default',
  Invalid: 'invalid',
  Disabled: 'disabled',
  Focused: 'focused',
})
const value = instance.getString('Value')

const invalid = state === 'invalid' ? 'aria-invalid' : ''
const disabled = state === 'disabled' ? 'disabled' : ''

export default {
  example:
    type === 'textarea'
      ? figma.code`<Textarea variant="${variant}" placeholder="${value}" ${invalid} ${disabled} />`
      : figma.code`<Input variant="${variant}" placeholder="${value}" ${invalid} ${disabled} />`,
  imports:
    type === 'textarea'
      ? ['import { Textarea } from "@pickup/design-system"']
      : ['import { Input } from "@pickup/design-system"'],
  id: 'text-field',
  metadata: { nestable: true },
}
