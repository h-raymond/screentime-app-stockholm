// url=https://www.figma.com/design/QL2ziCPwTmHCUqlQCmhi5t/Pickup---Brand?node-id=66-415
// source=https://github.com/figma/screentime-pickup/blob/main/src/components/page-menu.tsx
// component=PageMenu
import figma from 'figma'
const instance = figma.selectedInstance

const saves = instance.findText('Saves')
const selling = instance.findText('Selling')
const purchases = instance.findText('Purchases')
const account = instance.findText('Account')
const savesLabel = saves.type === 'TEXT' ? saves.textContent : 'Saves'
const sellingLabel = selling.type === 'TEXT' ? selling.textContent : 'Selling'
const purchasesLabel = purchases.type === 'TEXT' ? purchases.textContent : 'Purchases'
const accountLabel = account.type === 'TEXT' ? account.textContent : 'Account'

export default {
  example: figma.code`
    <PageMenu
      items={[
        { href: "/saves", label: "${savesLabel}", icon: HeartIcon },
        { href: "/selling", label: "${sellingLabel}", icon: TagIcon },
        { href: "/purchases", label: "${purchasesLabel}", icon: ShoppingBagIcon },
        { href: "/account", label: "${accountLabel}", icon: UserCircleIcon },
      ]}
    />
  `,
  imports: [
    'import { PageMenu } from "@/components/page-menu"',
    'import { HeartIcon, ShoppingBagIcon, TagIcon, UserCircleIcon } from "@heroicons/react/24/outline"',
  ],
  id: 'page-menu',
  metadata: { nestable: false },
}
