import Image from "next/image";

import { Card } from "@/design-system/components/card";
import { cn } from "@/lib/utils";

export function SummaryCard({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card className={cn("flex-row gap-4 p-4", className)} {...props} />
  );
}

export function SummaryCardImage({
  src,
  alt,
  size = "default",
  backgroundColor,
}: {
  src: string;
  alt: string;
  size?: "default" | "compact";
  backgroundColor?: string;
}) {
  const pixels = size === "default" ? 80 : 64;

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-lg bg-muted",
        size === "default" ? "size-20" : "size-16",
      )}
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${pixels}px`}
        className="object-contain p-2"
      />
    </div>
  );
}

export function SummaryCardBody({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex min-w-0 flex-1 flex-col gap-1", className)}
      {...props}
    />
  );
}
