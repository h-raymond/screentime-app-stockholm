// url=https://www.figma.com/design/QL2ziCPwTmHCUqlQCmhi5t/Pickup---Brand?node-id=110-125
// source=https://github.com/figma/screentime-pickup/blob/main/src/components/item-card.tsx
// component=ItemCard
import figma from 'figma'
const instance = figma.selectedInstance

instance.getString('Title')
instance.getString('Price')
instance.getString('Distance')
instance.getSlot('Product image')
const badge = instance.findInstance('Badge')
const save = instance.findInstance('Icon button')
if (badge && badge.type === 'INSTANCE') {
  badge.executeTemplate()
}
if (save && save.type === 'INSTANCE') {
  save.executeTemplate()
}

export default {
  example: figma.code`<ItemCard item={item} />`,
  imports: ['import { ItemCard } from "@/components/item-card"'],
  id: 'item-card',
  metadata: { nestable: true },
}
