"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

import { PageHeader } from "@/components/page-header";
import {
  Button,
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  PageContainer,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  StickyActionBar,
  Switch,
  Textarea,
} from "@/design-system";
import { STOCK_IMAGES } from "@/lib/data/items";
import { NEIGHBORHOOD_NAMES } from "@/lib/data/neighborhoods";
import { useStore } from "@/lib/store";
import { CATEGORIES, CONDITIONS, type Draft } from "@/lib/types";

const EMPTY: Draft = {
  title: "",
  price: "",
  category: "Home Goods",
  condition: "Good",
  description: "",
  neighborhood: "Indiranagar",
  image: STOCK_IMAGES[0],
  deliveryAvailable: true,
};

export default function SellPage() {
  const router = useRouter();
  const addListing = useStore((s) => s.addListing);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const titleValid = draft.title.trim().length > 2;
  const priceValid = Number(draft.price) > 0;
  const valid = titleValid && priceValid;
  const titleInvalid = submitted && !titleValid;
  const priceInvalid = submitted && !priceValid;

  function set<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (!valid) return;
    addListing(draft);
    router.push("/selling");
  }

  return (
    <PageContainer
      as="form"
      width="narrow"
      onSubmit={submit}
      className="pb-32 md:pb-10"
    >
      <PageHeader title="Sell an item" />
      <FieldGroup className="px-4 pb-8 md:px-6">
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Add Photos</h2>
            <span className="type-label-small">(Up to 8)</span>
          </div>
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 md:-mx-6 md:px-6">
            {Array.from({ length: 8 }, (_, index) => (
              <div
                key={index}
                className="relative size-32 shrink-0 rounded-xl bg-muted"
              >
                <PlusIcon className="absolute top-1/2 left-1/2 size-icon -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            ))}
          </div>
        </section>

        <Field data-invalid={titleInvalid}>
          <FieldLabel htmlFor="title" className="font-medium">
            Item name
          </FieldLabel>
          <Input
            id="title"
            value={draft.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Name"
            aria-invalid={titleInvalid}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="neighborhood" className="font-medium">
            Location
          </FieldLabel>
          <Select
            value={draft.neighborhood}
            onValueChange={(value) => set("neighborhood", value)}
          >
            <SelectTrigger id="neighborhood" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {NEIGHBORHOOD_NAMES.map((neighborhood) => (
                  <SelectItem key={neighborhood} value={neighborhood}>
                    {neighborhood}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field data-invalid={priceInvalid}>
          <FieldLabel htmlFor="price" className="font-medium">
            Pricing
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="price"
              value={draft.price}
              onChange={(e) =>
                set("price", e.target.value.replace(/[^0-9.]/g, ""))
              }
              inputMode="decimal"
              placeholder="0"
              aria-invalid={priceInvalid}
            />
            <InputGroupAddon>
              <InputGroupText>₹</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Field>

        <FieldSet>
          <FieldLegend variant="label">Product Details</FieldLegend>
          <FieldGroup className="gap-4">
            <Select
              value={draft.category}
              onValueChange={(value) =>
                set("category", value as Draft["category"])
              }
            >
              <SelectTrigger aria-label="Category" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={draft.condition}
              onValueChange={(value) =>
                set("condition", value as Draft["condition"])
              }
            >
              <SelectTrigger aria-label="Condition" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CONDITIONS.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Textarea
              aria-label="Description"
              value={draft.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Description"
              rows={3}
            />
          </FieldGroup>
        </FieldSet>

        <FieldLabel htmlFor="delivery">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Offer Delivery</FieldTitle>
              <FieldDescription className="max-w-72">
                A neighbor collects it from you and takes it to the buyer.
              </FieldDescription>
            </FieldContent>
            <Switch
              id="delivery"
              size="sm"
              checked={draft.deliveryAvailable}
              onCheckedChange={(checked) => set("deliveryAvailable", checked)}
              className="w-11"
            />
          </Field>
        </FieldLabel>

        <div className="hidden md:block">
          <Button type="submit" className="w-full">
            Post listing
          </Button>
        </div>
      </FieldGroup>

      <StickyActionBar>
        <Button type="submit" className="w-full">
          Post listing
        </Button>
      </StickyActionBar>
    </PageContainer>
  );
}
