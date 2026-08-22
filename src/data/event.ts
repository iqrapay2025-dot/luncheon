// ── Single source of truth for the event date ──
// Update this value here when the date is confirmed; every UI consumer
// (hero floating card, banners, etc.) picks it up automatically.
// Keep it null while the date is still to be announced.

export const EVENT_DATE: string | null = null

/** Human-readable label shown throughout the UI. */
export const EVENT_DATE_LABEL: string = EVENT_DATE ?? "To Be Announced"
