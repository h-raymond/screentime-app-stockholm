"use client";

import Link from "next/link";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArchiveBoxXMarkIcon,
  HandRaisedIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

import { PageHeader } from "@/components/page-header";
import {
  Badge,
  Button,
  EmptyState,
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
  Input,
  PageContainer,
  RadioGroup,
  RadioGroupItem,
  Separator,
  StickyActionBar,
  SummaryCard,
  SummaryCardBody,
  SummaryCardImage,
} from "@/design-system";
import {
  HOME,
  SIZE_LABEL,
  deliveryFee,
  distanceKm,
  formatDistance,
  formatPrice,
} from "@/lib/geo";
import { findItem, useStore } from "@/lib/store";
import type { Fulfillment } from "@/lib/types";

export default function CheckoutPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const listings = useStore((s) => s.listings);
  const placeOrder = useStore((s) => s.placeOrder);
  const item = findItem(id, listings);

  const [fulfillment, setFulfillment] = useState<Fulfillment>("delivery");
  const [address, setAddress] = useState(HOME.address);
  const [submitting, setSubmitting] = useState(false);

  if (!item) {
    return (
      <PageContainer width="narrow">
        <PageHeader title="Checkout" />
        <EmptyState
          icon={ArchiveBoxXMarkIcon}
          title="This listing is gone"
          description="It may have been sold or taken down while you were deciding."
          action={
            <Button asChild>
              <Link href="/">Browse items</Link>
            </Button>
          }
        />
      </PageContainer>
    );
  }

  const kilometres = distanceKm(item.location, HOME);
  const fee =
    fulfillment === "delivery" ? deliveryFee(item.size, kilometres) : 0;
  const total = item.price + fee;
  const canDeliver = item.deliveryAvailable;
  const chosen = canDeliver ? fulfillment : "pickup";

  function confirm() {
    if (!item) return;
    setSubmitting(true);
    const order = placeOrder(item, chosen, address);
    router.push(`/delivery/${order.id}`);
  }

  return (
    <PageContainer width="narrow" className="pb-floating-nav md:pb-10">
      <PageHeader title="Checkout" />

      <div className="flex flex-col gap-8 p-4 md:p-6">
        <SummaryCard>
          <SummaryCardImage
            src={item.images[0]}
            alt={item.title}
            backgroundColor={item.backgroundColor}
          />
          <SummaryCardBody>
            <p className="truncate">{item.title}</p>
            <p className="text-foreground">
              {formatPrice(item.price)}
            </p>
            <p className="text-muted-foreground">
              {item.location.neighborhood} · {formatDistance(kilometres)}
            </p>
          </SummaryCardBody>
        </SummaryCard>

        <RadioGroup
          value={chosen}
          onValueChange={(value) => setFulfillment(value as Fulfillment)}
          aria-label="Fulfillment"
          className="gap-4"
        >
          <FulfillmentOption
            value="delivery"
            icon={TruckIcon}
            title="Delivery"
            description={
              canDeliver
                ? `A neighbor picks it up in ${item.location.neighborhood} and brings it to you. ${SIZE_LABEL[item.size]}.`
                : "This seller isn't offering delivery for this item."
            }
            price={
              canDeliver
                ? formatPrice(deliveryFee(item.size, kilometres))
                : "—"
            }
            disabled={!canDeliver}
            badge="Pickup exclusive"
          />

          <FulfillmentOption
            value="pickup"
            icon={HandRaisedIcon}
            title="Pick it up myself"
            description={`Arrange a time with ${item.seller.name} and meet in ${item.location.neighborhood}.`}
            price="Free"
          />
        </RadioGroup>

        {chosen === "delivery" && (
          <Field>
            <FieldLabel htmlFor="dropoff">Drop-off address</FieldLabel>
            <Input
              id="dropoff"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street address, Bengaluru"
            />
          </Field>
        )}

        <section className="flex flex-col gap-4">
          <h2 className="text-muted-foreground">
            Summary
          </h2>
          <dl className="flex flex-col gap-2">
            <Row label="Item" value={formatPrice(item.price)} />
            <Row
              label="Delivery"
              value={chosen === "delivery" ? formatPrice(fee) : "Free"}
            />
            <Separator />
            <div className="flex items-baseline justify-between">
              <dt>Total</dt>
              <dd>
                {formatPrice(total)}
              </dd>
            </div>
          </dl>
          <p className="text-muted-foreground">
            Demo checkout — no payment is collected.
          </p>
        </section>

        <div className="hidden md:block">
          <Button
            onClick={confirm}
            disabled={submitting}
            className="w-full"
          >
            {chosen === "delivery"
              ? `Buy and request delivery · ${formatPrice(total)}`
              : `Buy for pickup · ${formatPrice(total)}`}
          </Button>
        </div>
      </div>

      <StickyActionBar>
        <Button onClick={confirm} disabled={submitting} className="w-full">
          {chosen === "delivery"
            ? `Buy and request delivery · ${formatPrice(total)}`
            : `Buy for pickup · ${formatPrice(total)}`}
        </Button>
      </StickyActionBar>
    </PageContainer>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}

function FulfillmentOption({
  value,
  icon: Icon,
  title,
  description,
  price,
  disabled,
  badge,
}: {
  value: Fulfillment;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  price: string;
  disabled?: boolean;
  badge?: string;
}) {
  const id = `fulfillment-${value}`;
  return (
    <FieldLabel htmlFor={id}>
      <Field orientation="horizontal" data-disabled={disabled} className="gap-4">
        <RadioGroupItem value={value} id={id} disabled={disabled} />
        <FieldContent>
          <FieldTitle className="flex-wrap">
            <Icon className="size-icon text-primary" />
            {title}
            {badge && <Badge variant="condition">{badge}</Badge>}
          </FieldTitle>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <span className="shrink-0 text-foreground">{price}</span>
      </Field>
    </FieldLabel>
  );
}
