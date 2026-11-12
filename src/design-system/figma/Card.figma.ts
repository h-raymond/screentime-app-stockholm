// url=https://www.figma.com/design/QL2ziCPwTmHCUqlQCmhi5t/Pickup---Brand?node-id=2136-11274
// source=https://github.com/figma/screentime-pickup/blob/main/src/design-system/components/card.tsx
// component=Card
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('Variant', {
  Filled: 'filled',
  Outline: 'outline',
})
const size = instance.getEnum('Size', {
  Sm: 'sm',
  Default: 'default',
})
const titleNode = instance.findText('Card title')
const descriptionNode = instance.findText(
  'Description uses muted foreground and inherits the base type scale.',
)
const title = titleNode.type === 'TEXT' ? titleNode.textContent : 'Card title'
const description =
  descriptionNode.type === 'TEXT'
    ? descriptionNode.textContent
    : 'Description uses muted foreground and inherits the base type scale.'

export default {
  example: figma.code`
    <Card variant="${variant}" size="${size}">
      <CardHeader>
        <CardTitle>${title}</CardTitle>
        <CardDescription>${description}</CardDescription>
      </CardHeader>
    </Card>
  `,
  imports: [
    'import { Card, CardDescription, CardHeader, CardTitle } from "@pickup/design-system"',
  ],
  id: 'card',
  metadata: { nestable: true },
}
