// url=https://www.figma.com/design/QL2ziCPwTmHCUqlQCmhi5t/Pickup---Brand?node-id=2382-8891
// source=https://github.com/figma/screentime-pickup/blob/main/src/design-system/components/tooltip.tsx
// component=Tooltip
import figma from 'figma'
const instance = figma.selectedInstance

const side = instance.getEnum('Side', {
  Top: 'top',
  Right: 'right',
  Bottom: 'bottom',
  Left: 'left',
})
const text = instance.getString('Text')

export default {
  example: figma.code`<Tooltip>
  <TooltipTrigger asChild>
    <IconButton icon={QuestionMarkCircleIcon} aria-label="${text}" />
  </TooltipTrigger>
  <TooltipContent side="${side}">${text}</TooltipContent>
</Tooltip>`,
  imports: [
    'import { IconButton, Tooltip, TooltipContent, TooltipTrigger } from "@pickup/design-system"',
    'import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline"',
  ],
  id: 'tooltip',
  metadata: { nestable: true },
}
