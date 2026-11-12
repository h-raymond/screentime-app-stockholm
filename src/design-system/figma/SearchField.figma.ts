// url=https://www.figma.com/design/QL2ziCPwTmHCUqlQCmhi5t/Pickup---Brand?node-id=2338-8905
// source=https://github.com/figma/screentime-pickup/blob/main/src/design-system/components/search-field.tsx
// component=SearchField
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('Variant', {
  Filled: 'filled',
  Outline: 'outline',
})
const state = instance.getEnum('State', {
  Default: 'default',
  Focused: 'focused',
  Invalid: 'invalid',
  Disabled: 'disabled',
})
const value = instance.getString('Value')
instance.getBoolean('Clear')

export default {
  example: figma.code`<SearchField
  variant="${variant}"
  value="${value}"
  onChange={() => {}}
  onClear={() => {}}
  aria-label="Search"
  ${state === 'invalid' ? 'aria-invalid' : ''}
  ${state === 'disabled' ? 'disabled' : ''}
/>`,
  imports: ['import { SearchField } from "@pickup/design-system"'],
  id: 'search-field',
  metadata: { nestable: true },
}
