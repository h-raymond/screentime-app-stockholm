// url=https://www.figma.com/design/QL2ziCPwTmHCUqlQCmhi5t/Pickup---Brand?node-id=2381-8888
// source=https://github.com/figma/screentime-pickup/blob/main/src/design-system/components/popover.tsx
// component=Popover
import figma from 'figma'
const instance = figma.selectedInstance

const state = instance.getEnum('State', {
  Closed: 'closed',
  Open: 'open',
})
const trigger = instance.getString('Trigger')
const title = instance.getString('Title')
const content = instance.getString('Content')

export default {
  example: figma.code`<Popover ${state === 'open' ? 'defaultOpen' : ''}>
  <PopoverTrigger asChild>
    <Button>${trigger}</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>${title}</PopoverTitle>
      <PopoverDescription>${content}</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>`,
  imports: [
    'import { Button, Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@pickup/design-system"',
  ],
  id: 'popover',
  metadata: { nestable: true },
}
