// url=https://www.figma.com/design/QL2ziCPwTmHCUqlQCmhi5t/Pickup---Brand?node-id=106-112
// source=https://github.com/figma/screentime-pickup/blob/main/src/design-system/components/select.tsx
// component=Select
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('Variant', {
  Filled: 'filled',
  Outline: 'outline',
})
const size = instance.getEnum('Size', {
  Default: 'default',
  Compact: 'compact',
})
const state = instance.getEnum('State', {
  Default: 'default',
  Focused: 'focused',
  Invalid: 'invalid',
  Disabled: 'disabled',
})
const value = instance.getString('Value')

export default {
  example: figma.code`
    <Select>
      <SelectTrigger variant="${variant}" size="${size}" ${state === 'invalid' ? 'aria-invalid' : ''} ${state === 'disabled' ? 'disabled' : ''}>
        <SelectValue placeholder="${value}" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="${value}">${value}</SelectItem>
      </SelectContent>
    </Select>
  `,
  imports: [
    'import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@pickup/design-system"',
  ],
  id: 'select',
  metadata: { nestable: true },
}
