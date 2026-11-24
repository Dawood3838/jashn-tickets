import type {
  Event,
  EventAvailabilityStatus,
  EventCategory,
  EventCity,
} from "@/types/event";

export type EventSortOrder =
  | "date-asc"
  | "date-desc"
  | "price-asc"
  | "price-desc";

export interface EventFilters {
  categories?: readonly EventCategory[];
  cities?: readonly EventCity[];
  availabilityStatuses?: readonly EventAvailabilityStatus[];
  featured?: boolean;
}

export interface EventQueryOptions extends EventFilters {
  query?: string;
  sortBy?: EventSortOrder;
}

export function searchEvents(
  events: readonly Event[],
  query: string = "",
): Event[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [...events];
  }

  return events.filter((event) => {
    const searchableText = [
      event.title ?? "",
      event.description ?? "",
      ...(event.tags ?? []),
      event.venue ?? "",
      event.city ?? "",
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function filterEvents(
  events: readonly Event[],
  filters: EventFilters = {},
): Event[] {
  return events.filter((event) => {
    if (
      filters.categories?.length &&
      !filters.categories.includes(event.category)
    ) {
      return false;
    }

    if (filters.cities?.length && !filters.cities.includes(event.city)) {
      return false;
    }

    if (
      filters.availabilityStatuses?.length &&
      !filters.availabilityStatuses.includes(event.availability.status)
    ) {
      return false;
    }

    if (
      filters.featured !== undefined &&
      event.featured !== filters.featured
    ) {
      return false;
    }

    return true;
  });
}

/**
 * Returns the lowest listed ticket-type price, falling back to event.price
 * when an event has no ticket types.
 */
export function getEventStartingPrice(event: Event): number {
  if (event.ticketTypes.length === 0) {
    return event.price;
  }

  return event.ticketTypes.reduce(
    (lowestPrice, ticketType) => Math.min(lowestPrice, ticketType.price),
    Number.POSITIVE_INFINITY,
  );
}

export function sortEvents(
  events: readonly Event[],
  sortBy?: EventSortOrder,
): Event[] {
  const sortedEvents = [...events];

  switch (sortBy) {
    case "date-asc":
      return sortedEvents.sort((left, right) =>
        left.date.localeCompare(right.date),
      );
    case "date-desc":
      return sortedEvents.sort((left, right) =>
        right.date.localeCompare(left.date),
      );
    case "price-asc":
      return sortedEvents.sort(
        (left, right) =>
          getEventStartingPrice(left) - getEventStartingPrice(right),
      );
    case "price-desc":
      return sortedEvents.sort(
        (left, right) =>
          getEventStartingPrice(right) - getEventStartingPrice(left),
      );
    default:
      return sortedEvents;
  }
}

export function getEvents(
  events: readonly Event[],
  options: EventQueryOptions = {},
): Event[] {
  const searchedEvents = searchEvents(events, options.query);
  const filteredEvents = filterEvents(searchedEvents, options);

  return sortEvents(filteredEvents, options.sortBy);
}
