"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import {
  Avatar,
  AvatarFallback,
  Button,
  IconButton,
  PickupLogo,
} from "@/design-system";
import { categoryLabel, parseCategory } from "@/lib/browse";
import { ME } from "@/lib/data/items";
import { cn, initialsFromName } from "@/lib/utils";

/**
 * Floats over the browse content on both list and map. Browse views reserve
 * room for it with `pt-browse-header`.
 */
export function BrowseHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const onMap = pathname === "/map";
  const category = parseCategory(searchParams.get("category"));

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30">
      {onMap && (
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-muted to-transparent"
        />
      )}
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-[3rem_1fr_3rem] items-center px-4 py-4">
        <IconButton
          asChild
          variant="overlay"
          icon={MagnifyingGlassIcon}
          aria-label="Search"
          className={cn(
            "pointer-events-auto justify-self-start",
            onMap && "shadow-brand",
          )}
        >
          <Link href="/search" />
        </IconButton>

        {onMap ? (
          <Button
            asChild
            variant="overlay"
            className="pointer-events-auto justify-self-center shadow-brand"
          >
            <Link href="/categories?from=map">
              {categoryLabel(category)}
              <ChevronDownIcon data-icon="inline-end" />
            </Link>
          </Button>
        ) : (
          <PickupLogo className="justify-self-center" />
        )}

        <Link
          href="/you"
          aria-label="You"
          className={cn(
            "pointer-events-auto justify-self-end rounded-full",
            onMap && "shadow-brand",
          )}
        >
          <Avatar aria-hidden>
            <AvatarFallback>{initialsFromName(ME.name)}</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
