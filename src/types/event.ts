export type EventCategory =
  | "Concerts"
  | "Conferences"
  | "Workshops"
  | "Exhibitions"
  | "Festivals"
  | "Sports";

export type EventCity = "Islamabad" | "Rawalpindi";

export type EventAvailabilityStatus =
  | "available"
  | "limited"
  | "sold-out";

export interface EventArtwork {
  type: "artwork";
  theme: "violet" | "lime" | "lavender" | "charcoal";
  alt: string;
}

export interface EventImage {
  type: "image";
  src: string;
  alt: string;
}

export type EventVisual = EventArtwork | EventImage;

export interface EventTicketType {
  id: string;
  name: string;
  price: number;
  capacity: number;
  remaining: number;
}

export interface EventAvailability {
  total: number;
  remaining: number;
  status: EventAvailabilityStatus;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  date: string;
  time: string;
  venue: string;
  city: EventCity;
  address: string;
  price: number;
  currency: "PKR";
  image: EventVisual;
  availability: EventAvailability;
  ticketTypes: readonly EventTicketType[];
  tags: readonly string[];
  featured: boolean;
}
