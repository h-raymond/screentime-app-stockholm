"use client";

import { useState } from "react";
import {
  ArrowRightIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  InformationCircleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyState,
  EmptyTitle,
  Checkbox,
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
  IconButton,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  PickupLogo,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  ProgressIndicator,
  RadioGroup,
  RadioGroupItem,
  SearchField,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  StickyActionBar,
  SummaryCard,
  SummaryCardBody,
  SummaryCardImage,
  Switch,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/design-system";
import { initialsFromName } from "@/lib/utils";

const RAMP_SWATCHES: Record<string, Record<number, string>> = {
  plum: {
    50: "bg-palette-plum-50",
    100: "bg-palette-plum-100",
    200: "bg-palette-plum-200",
    300: "bg-palette-plum-300",
    400: "bg-palette-plum-400",
    500: "bg-palette-plum-500",
    600: "bg-palette-plum-600",
    700: "bg-palette-plum-700",
    800: "bg-palette-plum-800",
    900: "bg-palette-plum-900",
    950: "bg-palette-plum-950",
  },
  mist: {
    50: "bg-palette-mist-50",
    100: "bg-palette-mist-100",
    200: "bg-palette-mist-200",
    300: "bg-palette-mist-300",
    400: "bg-palette-mist-400",
    500: "bg-palette-mist-500",
    600: "bg-palette-mist-600",
    700: "bg-palette-mist-700",
    800: "bg-palette-mist-800",
    900: "bg-palette-mist-900",
    950: "bg-palette-mist-950",
  },
  lime: {
    50: "bg-palette-lime-50",
    100: "bg-palette-lime-100",
    200: "bg-palette-lime-200",
    300: "bg-palette-lime-300",
    400: "bg-palette-lime-400",
    500: "bg-palette-lime-500",
    600: "bg-palette-lime-600",
    700: "bg-palette-lime-700",
    800: "bg-palette-lime-800",
    900: "bg-palette-lime-900",
    950: "bg-palette-lime-950",
  },
  olive: {
    50: "bg-palette-olive-50",
    100: "bg-palette-olive-100",
    200: "bg-palette-olive-200",
    300: "bg-palette-olive-300",
    400: "bg-palette-olive-400",
    500: "bg-palette-olive-500",
    600: "bg-palette-olive-600",
    700: "bg-palette-olive-700",
    800: "bg-palette-olive-800",
    900: "bg-palette-olive-900",
    950: "bg-palette-olive-950",
  },
  neutral: {
    50: "bg-palette-neutral-50",
    100: "bg-palette-neutral-100",
    200: "bg-palette-neutral-200",
    300: "bg-palette-neutral-300",
    400: "bg-palette-neutral-400",
    500: "bg-palette-neutral-500",
    600: "bg-palette-neutral-600",
    700: "bg-palette-neutral-700",
    800: "bg-palette-neutral-800",
    900: "bg-palette-neutral-900",
    950: "bg-palette-neutral-950",
  },
  danger: {
    50: "bg-palette-danger-50",
    100: "bg-palette-danger-100",
    200: "bg-palette-danger-200",
    300: "bg-palette-danger-300",
    400: "bg-palette-danger-400",
    500: "bg-palette-danger-500",
    600: "bg-palette-danger-600",
    700: "bg-palette-danger-700",
    800: "bg-palette-danger-800",
    900: "bg-palette-danger-900",
    950: "bg-palette-danger-950",
  },
};

const RAMPS = [
  ["Plum", "plum"],
  ["Mist", "mist"],
  ["Lime", "lime"],
  ["Olive", "olive"],
  ["Neutral", "neutral"],
  ["Danger", "danger"],
] as const;

const SEMANTICS = [
  ["Background", "bg-background", "text-foreground"],
  ["Card", "bg-card", "text-card-foreground"],
  ["Card hover", "bg-card-hover", "text-card-foreground"],
  ["Primary", "bg-primary", "text-primary-foreground"],
  ["Primary hover", "bg-primary-hover", "text-primary-foreground"],
  ["Secondary", "bg-secondary", "text-secondary-foreground"],
  ["Interaction subtle", "bg-interaction-subtle", "text-foreground"],
  ["Interaction", "bg-interaction", "text-foreground"],
  ["Interaction strong", "bg-interaction-strong", "text-foreground"],
  ["Muted", "bg-muted", "text-muted-foreground"],
  ["Accent", "bg-accent", "text-accent-foreground"],
  ["Destructive", "bg-destructive", "text-destructive-foreground"],
] as const;

const SPACING = [
  ["2", "8px"],
  ["4", "16px"],
  ["6", "24px"],
  ["8", "32px"],
  ["12", "48px"],
] as const;

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="type-heading-medium">{title}</h2>
      {children}
    </section>
  );
}

function Swatch({
  label,
  fill,
  ink,
}: {
  label: string;
  fill: string;
  ink: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`flex h-16 items-end rounded-lg p-2 ring-1 ring-border ${fill} ${ink}`}>
        <span className="type-label-small">{label}</span>
      </div>
    </div>
  );
}

export function DesignSystemShowcase() {
  const [query, setQuery] = useState("teak");
  const [outlineQuery, setOutlineQuery] = useState("teak");

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-8 md:px-6 md:py-16">
      <header className="flex max-w-2xl flex-col gap-4">
        <p className="text-muted-foreground">Pickup design system</p>
        <h1 className="type-display-medium">Foundations and components</h1>
        <p className="text-muted-foreground">
          Contract: palette ramps feed stock shadcn names (
          <code className="type-label-small">background</code>,{" "}
          <code className="type-label-small">card</code>,{" "}
          <code className="type-label-small">primary</code>
          ). Hover and pressed are solid ramp steps (
          <code className="type-label-small">primary-hover</code>
          ), never alpha or color-mix. Layout uses even Tailwind spacing keys
          and parent <code className="type-label-small">gap</code>. Figma
          variables use the same CSS names. Pickup extras (map, tertiary,
          browse chrome) live in app CSS.
        </p>
        <p className="text-muted-foreground">
          This reference focuses on the primitives agents should reach for
          first: form controls, disclosure, lightweight overlays, feedback,
          loading, and a small set of Pickup compositions.
        </p>
      </header>

      <Section title="Palette ramps">
        <div className="flex flex-col gap-6">
          {RAMPS.map(([name, family]) => (
            <div key={family} className="flex flex-col gap-2">
              <p className="type-label-small text-muted-foreground">{name}</p>
              <div className="grid grid-cols-6 gap-2 md:grid-cols-11">
                {Object.entries(RAMP_SWATCHES[family]).map(([step, swatch]) => (
                    <div key={step} className="flex flex-col gap-2">
                      <div className={`h-12 rounded-sm ring-1 ring-border ${swatch}`} />
                      <span className="type-label-small text-muted-foreground">
                        {step}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Semantic color">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {SEMANTICS.map(([label, fill, ink]) => (
            <Swatch key={label} label={label} fill={fill} ink={ink} />
          ))}
        </div>
        <div className="flex flex-col gap-4 rounded-xl bg-muted p-4 dark:bg-card">
          <p className="type-label-small text-muted-foreground">Dark preview</p>
          <div className="dark grid grid-cols-2 gap-4 rounded-xl bg-background p-4 md:grid-cols-3">
            {SEMANTICS.slice(0, 6).map(([label, fill, ink]) => (
              <Swatch key={label} label={label} fill={fill} ink={ink} />
            ))}
          </div>
        </div>
      </Section>

      <Section title="Opacity (scrims only)">
        <div className="relative overflow-hidden rounded-xl">
          <div className="h-24 bg-primary" />
          <div className="absolute inset-0 flex items-end bg-black/10 p-4">
            <span className="rounded-lg bg-card px-4 py-2 text-card-foreground">
              Scrim 10% over primary — controls stay opaque
            </span>
          </div>
        </div>
      </Section>

      <Section title="Spacing">
        <div className="flex flex-col gap-4">
          {SPACING.map(([key, px]) => (
            <div key={key} className="flex items-center gap-4">
              <span className="w-24 type-label-small text-muted-foreground">
                {key} · {px}
              </span>
              <div className={`h-8 bg-primary ${key === "2" ? "w-2" : key === "4" ? "w-4" : key === "6" ? "w-6" : key === "8" ? "w-8" : "w-12"}`} />
            </div>
          ))}
          <p className="text-muted-foreground">
            Named sizes: <code className="type-label-small">h-control</code> 48,
            compact 32, icon 24.
          </p>
        </div>
      </Section>

      <Section title="Radius">
        <div className="flex flex-wrap gap-4">
          <div className="size-16 rounded-sm bg-card ring-1 ring-border" />
          <div className="size-16 rounded-lg bg-card ring-1 ring-border" />
          <div className="size-16 rounded-xl bg-card ring-1 ring-border" />
          <div className="size-16 rounded-3xl bg-card ring-1 ring-border" />
          <div className="size-16 rounded-full bg-card ring-1 ring-border" />
        </div>
        <p className="text-muted-foreground">
          sm/lg 8px · xl 16px · 3xl 24px · full pill — same class names shadcn
          emits.
        </p>
      </Section>

      <Section title="Typography">
        <div className="flex flex-col gap-4">
          <p className="type-label-small">Label small</p>
          <p>Body 14 / 20 (page default)</p>
          <p className="type-body-medium">Body medium</p>
          <p className="type-body-large">Body large</p>
          <p className="type-heading-medium">Heading medium</p>
          <p className="type-display-medium">Display medium</p>
        </div>
      </Section>

      <Section title="Button">
        <div className="flex flex-wrap items-center gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="overlay" className="shadow-brand">
            Overlay
          </Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button disabled>Primary</Button>
          <Button variant="secondary" disabled>
            Secondary
          </Button>
          <Button variant="outline" disabled>
            Outline
          </Button>
          <Button variant="overlay" disabled className="shadow-brand">
            Overlay
          </Button>
          <Button variant="ghost" disabled>
            Ghost
          </Button>
          <Button variant="destructive" disabled>
            Destructive
          </Button>
          <Button variant="link" disabled>
            Link
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="compact">Compact</Button>
          <Button>
            Continue
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
          <p className="text-muted-foreground">
            Inline{" "}
            <Button variant="link">link button</Button>{" "}
            inside body copy.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <IconButton icon={HeartIcon} aria-label="Save" />
          <IconButton variant="secondary" icon={HeartIcon} aria-label="Save" />
          <IconButton variant="outline" icon={HeartIcon} aria-label="Save" />
          <IconButton variant="overlay" icon={HeartIcon} aria-label="Save" />
          <IconButton variant="ghost" icon={HeartIcon} aria-label="Save" />
          <IconButton variant="destructive" icon={HeartIcon} aria-label="Save" />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <IconButton icon={HeartIcon} aria-label="Save" disabled />
          <IconButton
            variant="secondary"
            icon={HeartIcon}
            aria-label="Save"
            disabled
          />
          <IconButton
            variant="outline"
            icon={HeartIcon}
            aria-label="Save"
            disabled
          />
          <IconButton
            variant="overlay"
            icon={HeartIcon}
            aria-label="Save"
            disabled
          />
          <IconButton
            variant="ghost"
            icon={HeartIcon}
            aria-label="Save"
            disabled
          />
          <IconButton
            variant="destructive"
            icon={HeartIcon}
            aria-label="Save"
            disabled
          />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <IconButton size="compact" icon={HeartIcon} aria-label="Save" />
          <IconButton
            size="compact"
            variant="ghost"
            icon={HeartIcon}
            aria-label="Save"
          />
        </div>
      </Section>

      <Section title="Fields">
        <FieldGroup className="max-w-md gap-4">
          <Field>
            <FieldLabel htmlFor="ds-title">Title</FieldLabel>
            <Input id="ds-title" defaultValue="Teak side table" />
          </Field>
          <Field data-invalid>
            <FieldLabel htmlFor="ds-price">Price</FieldLabel>
            <InputGroup>
              <InputGroupInput id="ds-price" placeholder="0" aria-invalid />
              <InputGroupAddon>
                <InputGroupText>₹</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>Enter a price above zero.</FieldDescription>
          </Field>
          <RadioGroup defaultValue="delivery" aria-label="Fulfillment" className="gap-4">
            <FieldLabel htmlFor="ds-delivery">
              <Field orientation="horizontal">
                <RadioGroupItem value="delivery" id="ds-delivery" />
                <FieldContent>
                  <FieldTitle>Delivery</FieldTitle>
                  <FieldDescription>A neighbor brings it to you.</FieldDescription>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="ds-pickup">
              <Field orientation="horizontal">
                <RadioGroupItem value="pickup" id="ds-pickup" />
                <FieldContent>
                  <FieldTitle>Pick it up myself</FieldTitle>
                  <FieldDescription>Meet the seller nearby.</FieldDescription>
                </FieldContent>
              </Field>
            </FieldLabel>
          </RadioGroup>
          <Field orientation="horizontal">
            <Checkbox id="ds-checkbox" defaultChecked />
            <FieldContent>
              <FieldLabel htmlFor="ds-checkbox">Include delivery updates</FieldLabel>
              <FieldDescription>
                Send a notification when the courier is nearby.
              </FieldDescription>
            </FieldContent>
          </Field>
          <SearchField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery("")}
            placeholder="Search"
            aria-label="Search"
          />
          <Select defaultValue="good">
            <SelectTrigger aria-label="Condition">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Textarea defaultValue="Picked up in Indiranagar." />
          <Input disabled placeholder="Disabled" aria-label="Disabled title" />
          <Select disabled defaultValue="good">
            <SelectTrigger aria-label="Disabled condition">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="good">Good</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Textarea disabled defaultValue="Disabled notes" />
          <Field orientation="horizontal">
            <Switch id="ds-switch" defaultChecked />
            <FieldLabel htmlFor="ds-switch">Delivery available</FieldLabel>
          </Field>
          <div className="flex flex-wrap items-center gap-4">
            <Switch aria-label="Off" />
            <Switch size="sm" defaultChecked aria-label="Small on" />
            <Switch size="sm" aria-label="Small off" />
            <Switch disabled defaultChecked aria-label="Disabled on" />
            <Switch disabled aria-label="Disabled off" />
          </div>
          <div className="flex flex-col gap-4 rounded-xl bg-card p-4">
            <p className="text-muted-foreground">
              White on white: the outline variant drops the fill and draws a
              hairline instead.
            </p>
            <Input
              variant="outline"
              defaultValue="Teak side table"
              aria-label="Title on a card"
            />
            <SearchField
              variant="outline"
              value={outlineQuery}
              onChange={(e) => setOutlineQuery(e.target.value)}
              onClear={() => setOutlineQuery("")}
              placeholder="Search"
              aria-label="Search on a card"
            />
            <Select defaultValue="good">
              <SelectTrigger variant="outline" aria-label="Condition on a card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Textarea
              variant="outline"
              defaultValue="Picked up in Indiranagar."
            />
          </div>
        </FieldGroup>
      </Section>

      <Section title="Disclosure and overlays">
        <div className="grid gap-8 md:grid-cols-2">
          <Accordion
            type="single"
            collapsible
            defaultValue="delivery"
            className="max-w-md"
          >
            <AccordionItem value="delivery">
              <AccordionTrigger>How does delivery work?</AccordionTrigger>
              <AccordionContent>
                A neighbor picks up the item and brings it across town.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="pickup">
              <AccordionTrigger>Can I pick it up myself?</AccordionTrigger>
              <AccordionContent>
                Yes. Arrange a time with the seller and meet nearby.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex items-start gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Delivery details</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>Pickup window</PopoverTitle>
                  <PopoverDescription>
                    Today between 4pm and 6pm
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton
                  variant="ghost"
                  icon={InformationCircleIcon}
                  aria-label="About pickup windows"
                />
              </TooltipTrigger>
              <TooltipContent>Pickup windows are estimates.</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </Section>

      <Section title="Feedback">
        <div className="grid gap-4 md:grid-cols-2">
          <Alert>
            <InformationCircleIcon aria-hidden />
            <AlertTitle>Delivery is available</AlertTitle>
            <AlertDescription>
              A neighbor can bring this item to your address.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <ExclamationTriangleIcon aria-hidden />
            <AlertTitle>Address needed</AlertTitle>
            <AlertDescription>
              Add a drop-off address before continuing.
            </AlertDescription>
          </Alert>
        </div>
      </Section>

      <Section title="Card and composition">
        <div className="flex flex-col gap-4">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Neighborhood pickup</CardTitle>
              <CardDescription>
                Parent gap, not nested spacers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button>Book delivery</Button>
            </CardContent>
          </Card>
          <SummaryCard className="max-w-md">
            <SummaryCardImage
              src="/items/mustard-lounge-chair.png"
              alt="Chair"
            />
            <SummaryCardBody>
              <p className="font-medium">Mustard lounge chair</p>
              <p className="text-muted-foreground">₹4,200 · 1.2 km</p>
              <Badge variant="condition">Good</Badge>
            </SummaryCardBody>
          </SummaryCard>
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Nested surfaces</CardTitle>
              <CardDescription>
                A filled card on the page, an outline card inside it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Card variant="outline" size="sm">
                <CardContent>Pickup window · Today 4–6pm</CardContent>
              </Card>
            </CardContent>
          </Card>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>{initialsFromName("Priya Nair")}</AvatarFallback>
            </Avatar>
            <PickupLogo />
            <ProgressIndicator />
            <Skeleton className="h-8 w-32 rounded-lg" />
          </div>
        </div>
      </Section>

      <Section title="Empty state">
        <div className="grid gap-4 md:grid-cols-2">
          <EmptyState
            icon={ShoppingBagIcon}
            title="Nothing here yet"
            description="Save items to find them here later."
            action={<Button>Browse items</Button>}
          />
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <HeartIcon />
              </EmptyMedia>
              <EmptyTitle>Custom empty composition</EmptyTitle>
              <EmptyDescription>
                Use the slots directly when the structure needs to differ.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline">Learn more</Button>
            </EmptyContent>
          </Empty>
        </div>
      </Section>

      <Section title="Sticky action">
        <div className="relative overflow-hidden rounded-xl bg-muted">
          <div className="h-32" />
          <StickyActionBar position="static">
            <Button className="w-full">Continue</Button>
          </StickyActionBar>
        </div>
      </Section>
    </main>
  );
}
