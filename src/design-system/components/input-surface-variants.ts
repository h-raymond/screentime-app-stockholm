/**
 * Shared surface treatment for text-entry controls and select triggers.
 *
 * `filled` carries its own surface and needs no edge on the page background.
 * `outline` is for white-on-white, where only a hairline separates the field.
 * Both controls keep a transparent border in their base classes so variants
 * measure consistently and focus/invalid states can own the edge treatment.
 */
export const inputSurfaceVariants = {
  filled: "bg-card",
  outline: "border-input",
}

export type InputSurfaceVariant = keyof typeof inputSurfaceVariants
