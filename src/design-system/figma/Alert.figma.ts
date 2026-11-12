// url=https://www.figma.com/design/QL2ziCPwTmHCUqlQCmhi5t/Pickup---Brand?node-id=2399-8887
// source=https://github.com/figma/screentime-pickup/blob/main/src/design-system/components/alert.tsx
// component=Alert
import figma from 'figma'
const instance = figma.selectedInstance

const variant = instance.getEnum('Variant', {
  Default: 'default',
  Destructive: 'destructive',
})
const title = instance.getString('Title')
const description = instance.getString('Description')
const icon = instance.getInstanceSwap('Icon')
const iconExample =
  variant === 'destructive'
    ? figma.code`<ExclamationTriangleIcon />`
    : icon && icon.type === 'INSTANCE'
      ? icon.executeTemplate().example
      : null

export default {
  example: figma.code`<Alert variant="${variant}">
  ${iconExample}
  <AlertTitle>${title}</AlertTitle>
  <AlertDescription>${description}</AlertDescription>
</Alert>`,
  imports: [
    'import { Alert, AlertDescription, AlertTitle } from "@pickup/design-system"',
    ...(variant === 'destructive'
      ? ['import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"']
      : []),
  ],
  id: 'alert',
  metadata: { nestable: true },
}
