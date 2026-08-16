// ── Single source of truth for all package data ──
// This file is imported by Landing, Registration, Confirmation, and FAQ pages.

export interface Package {
  id: string
  name: string
  price: number
  includes: string[]
  isVip?: boolean
  hasCustomization?: boolean
}

export const PACKAGES: Package[] = [
  {
    id: "barakah",
    name: "Barakah",
    price: 3000,
    includes: ["Food", "Basic Souvenir"],
  },
  {
    id: "fadl",
    name: "Fadl",
    price: 5000,
    includes: ["Food", "Standard Souvenir"],
  },
  {
    id: "ihsan",
    name: "Ihsan",
    price: 7000,
    includes: ["Food", "Premium Souvenir"],
  },
  {
    id: "ikram",
    name: "Ikram",
    price: 10000,
    includes: ["Food", "VIP Souvenir"],
    isVip: true,
    hasCustomization: true,
  },
]

/** Formats a numeric price as "₦3,000" with Naira symbol and thousands separator. */
export const formatPrice = (price: number): string =>
  `₦${price.toLocaleString()}`

/** Looks up a package by its display name (e.g. "Barakah"). */
export const getPackageByName = (name: string): Package | undefined =>
  PACKAGES.find((p) => p.name === name)

/** Looks up a package by its id (e.g. "barakah"). */
export const getPackageById = (id: string): Package | undefined =>
  PACKAGES.find((p) => p.id === id)

/** Tier label derived from package id — used for UI badges/labels only. */
const TIER_LABELS: Record<string, string> = {
  barakah: "Basic",
  fadl: "Standard",
  ihsan: "Premium",
  ikram: "VIP",
}

export const getTierLabel = (pkg: Package): string =>
  TIER_LABELS[pkg.id] ?? "Standard"

/**
 * Resolves the human-readable amount string for display.
 * Uses the explicit `amount` if provided and positive; otherwise
 * falls back to the package's price from the single source of truth.
 */
export const getAmountDisplay = (
  amount?: string,
  packageName?: string,
): string => {
  if (amount && Number(amount) > 0) return formatPrice(Number(amount))
  const pkg = packageName ? getPackageByName(packageName) : undefined
  return pkg ? formatPrice(pkg.price) : "—"
}
