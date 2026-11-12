// url=https://www.figma.com/design/QL2ziCPwTmHCUqlQCmhi5t/Pickup---Brand?node-id=66-400
// source=https://github.com/figma/screentime-pickup/blob/main/src/design-system/patterns/summary-card.tsx
// component=SummaryCard
import figma from 'figma'
const instance = figma.selectedInstance

const titleNode = instance.findText('Mustard lounge chair')
const metaNode = instance.findText('$420 · Excellent')
const title = titleNode.type === 'TEXT' ? titleNode.textContent : 'Title'
const meta = metaNode.type === 'TEXT' ? metaNode.textContent : ''

export default {
  example: figma.code`
    <SummaryCard>
      <SummaryCardImage src="/placeholder.png" alt="${title}" />
      <SummaryCardBody>
        <p className="font-medium">${title}</p>
        <p className="text-muted-foreground">${meta}</p>
      </SummaryCardBody>
    </SummaryCard>
  `,
  imports: [
    'import { SummaryCard, SummaryCardBody, SummaryCardImage } from "@pickup/design-system"',
  ],
  id: 'summary-card',
  metadata: { nestable: true },
}
