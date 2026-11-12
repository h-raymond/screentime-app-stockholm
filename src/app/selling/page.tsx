"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import {
  ArchiveBoxIcon,
  PlusIcon,
  TagIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

import {
  Badge,
  Button,
  EmptyState,
  IconButton,
  PageContainer,
  Skeleton,
  SummaryCard,
  SummaryCardBody,
  SummaryCardImage,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/design-system";
import { PageHeader } from "@/components/page-header";
import { formatPrice } from "@/lib/geo";
import { formatRelativeTime } from "@/lib/time";
import { useHydrated, useStore } from "@/lib/store";
import type { Item } from "@/lib/types";

export default function SellingPage() {
  const hydrated = useHydrated();
  const listings = useStore((s) => s.listings);
  const markSold = useStore((s) => s.markSold);
  const removeListing = useStore((s) => s.removeListing);

  const active = listings.filter((l) => l.status === "active");
  const sold = listings.filter((l) => l.status === "sold");

  return (
    <PageContainer className="pb-10">
      <PageHeader
        title="Selling"
        fallbackHref="/you"
        action={
          <IconButton asChild icon={PlusIcon} aria-label="New listing">
            <Link href="/sell" />
          </IconButton>
        }
      />
      <Tabs defaultValue="active" className="gap-0">
        <div className="sticky top-browse-header z-10 bg-background/95 px-4 py-4 backdrop-blur md:px-6">
          <TabsList aria-label="Listing status">
            <TabsTrigger value="active" className="group/tab">
              Active
              {hydrated && <TabCount>{active.length}</TabCount>}
            </TabsTrigger>
            <TabsTrigger value="sold" className="group/tab">
              Sold
              {hydrated && <TabCount>{sold.length}</TabCount>}
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="active">
          <ListingPanel
            hydrated={hydrated}
            items={active}
            empty={
              <EmptyState
                icon={TagIcon}
                title="No active listings"
                description="Post something from around the house and offer delivery so buyers across town can take it."
                action={
                  <Button asChild>
                    <Link href="/sell">List an item</Link>
                  </Button>
                }
              />
            }
            onMarkSold={markSold}
            onRemove={removeListing}
          />
        </TabsContent>
        <TabsContent value="sold">
          <ListingPanel
            hydrated={hydrated}
            items={sold}
            empty={
              <EmptyState
                icon={ArchiveBoxIcon}
                title="Nothing sold yet"
                description="Once a buyer takes one of your listings it moves here with the final price."
              />
            }
          />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}

function TabCount({ children }: { children: ReactNode }) {
  return (
    <Badge className="size-5 justify-center rounded-full bg-muted-foreground px-0 tabular-nums text-background group-data-active/tab:bg-primary group-data-active/tab:text-primary-foreground">
      {children}
    </Badge>
  );
}

function ListingPanel({
  hydrated,
  items,
  empty,
  onMarkSold,
  onRemove,
}: {
  hydrated: boolean;
  items: Item[];
  empty: ReactNode;
  onMarkSold?: (id: string) => void;
  onRemove?: (id: string) => void;
}) {
  if (!hydrated) {
    return (
      <div className="flex flex-col gap-4 p-4 md:px-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    );
  }

  if (items.length === 0) return empty;

  return (
    <ul className="flex flex-col gap-4 p-4 md:px-6">
      {items.map((item) => (
        <ListingRow
          key={item.id}
          item={item}
          onMarkSold={onMarkSold ? () => onMarkSold(item.id) : undefined}
          onRemove={onRemove ? () => onRemove(item.id) : undefined}
        />
      ))}
    </ul>
  );
}

function ListingRow({
  item,
  onMarkSold,
  onRemove,
}: {
  item: Item;
  onMarkSold?: () => void;
  onRemove?: () => void;
}) {
  return (
    <li>
      <SummaryCard>
        <Link href={`/item/${item.id}`} className="shrink-0">
          <SummaryCardImage
            src={item.images[0]}
            alt={item.title}
            backgroundColor={item.backgroundColor}
          />
        </Link>
        <SummaryCardBody className="gap-2">
          <Link
            href={`/item/${item.id}`}
            className="flex min-w-0 flex-col gap-2"
          >
            <p className="truncate font-medium">{item.title}</p>
            <p className="text-foreground">{formatPrice(item.price)}</p>
            <p className="flex flex-wrap items-center gap-x-4 text-muted-foreground type-label-small">
              <span>
                {formatRelativeTime(item.postedAt)} ·{" "}
                {item.location.neighborhood}
              </span>
              {item.deliveryAvailable && (
                <TruckIcon
                  className="size-4"
                  aria-label="Delivery available"
                />
              )}
            </p>
          </Link>
          {(onMarkSold || onRemove) && (
            <div className="flex gap-2">
              {onMarkSold && (
                <Button size="compact" onClick={onMarkSold}>
                  Mark sold
                </Button>
              )}
              {onRemove && (
                <Button variant="ghost" size="compact" onClick={onRemove}>
                  Remove
                </Button>
              )}
            </div>
          )}
        </SummaryCardBody>
      </SummaryCard>
    </li>
  );
}
