// url=https://www.figma.com/design/QL2ziCPwTmHCUqlQCmhi5t/Pickup---Brand?node-id=2380-8883
// source=https://github.com/figma/screentime-pickup/blob/main/src/design-system/components/accordion.tsx
// component=Accordion
import figma from 'figma'
const instance = figma.selectedInstance

const state = instance.getEnum('State', {
  Collapsed: 'collapsed',
  Expanded: 'expanded',
})
const title = instance.getString('Title')
const content = instance.getString('Content')

export default {
  example: figma.code`<Accordion type="single" collapsible ${state === 'expanded' ? 'defaultValue="pickup-details"' : ''}>
  <AccordionItem value="pickup-details">
    <AccordionTrigger>${title}</AccordionTrigger>
    <AccordionContent>${content}</AccordionContent>
  </AccordionItem>
</Accordion>`,
  imports: [
    'import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@pickup/design-system"',
  ],
  id: 'accordion',
  metadata: { nestable: true },
}
