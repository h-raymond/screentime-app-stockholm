// url=https://www.figma.com/design/QL2ziCPwTmHCUqlQCmhi5t/Pickup---Brand?node-id=66-410
// source=https://github.com/figma/screentime-pickup/blob/main/src/components/page-header.tsx
// component=PageHeader
import figma from 'figma'
const instance = figma.selectedInstance

const titleNode = instance.findText('Selling')
const title = titleNode.type === 'TEXT' ? titleNode.textContent : 'Title'
export default {
  example: figma.code`<PageHeader title="${title}" />`,
  imports: ['import { PageHeader } from "@/components/page-header"'],
  id: 'page-header',
  metadata: { nestable: false },
}
