import type { Booking } from "@/types/booking";

export interface BookingRepositoryError {
  code: "duplicate-reference" | "storage-error";
  message: string;
}

export type BookingRepositoryResult<T> =
  | { success: true; data: T }
  | { success: false; error: BookingRepositoryError };

export interface BookingRepository {
  save(booking: Booking): Promise<BookingRepositoryResult<Booking>>;
  findByReference(
    reference: string,
  ): Promise<BookingRepositoryResult<Booking | undefined>>;
  update(booking: Booking): Promise<BookingRepositoryResult<Booking | undefined>>;
  list(): Promise<BookingRepositoryResult<readonly Booking[]>>;
}
