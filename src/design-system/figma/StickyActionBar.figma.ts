// url=https://www.figma.com/design/QL2ziCPwTmHCUqlQCmhi5t/Pickup---Brand?node-id=66-446
// source=https://github.com/figma/screentime-pickup/blob/main/src/design-system/patterns/sticky-action-bar.tsx
// component=StickyActionBar
import figma from 'figma'
const instance = figma.selectedInstance

const saveNode = instance.findText('Save')
const buyNode = instance.findText('Buy now')
const save = saveNode.type === 'TEXT' ? saveNode.textContent : 'Save'
const buy = buyNode.type === 'TEXT' ? buyNode.textContent : 'Buy now'

export default {
  example: figma.code`
    <StickyActionBar>
      <Button variant="secondary" className="flex-1">${save}</Button>
      <Button className="flex-1">${buy}</Button>
    </StickyActionBar>
  `,
  imports: ['import { Button, StickyActionBar } from "@pickup/design-system"'],
  id: 'sticky-action-bar',
  metadata: { nestable: false },
}
