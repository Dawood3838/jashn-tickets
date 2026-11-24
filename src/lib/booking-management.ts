import type {
  Booking,
  BookingManagementError,
  BookingManagementResult,
  BookingStatus,
} from "@/types/booking";
import type {
  BookingRepository,
  BookingRepositoryResult,
} from "@/types/booking-repository";

function mapRepositoryError(
  error: Extract<BookingRepositoryResult<unknown>, { success: false }>["error"],
): BookingManagementError {
  if (error.code === "duplicate-reference") {
    return {
      code: "booking-reference-conflict",
      message: error.message,
    };
  }

  return {
    code: "storage-error",
    message: error.message,
  };
}

function storageFailure(error: unknown): BookingManagementError {
  return {
    code: "storage-error",
    message:
      error instanceof Error
        ? `Booking storage failed: ${error.message}`
        : "Booking storage failed with an unknown error.",
  };
}

async function runStorageOperation<T>(
  operation: () => Promise<BookingRepositoryResult<T>>,
): Promise<BookingManagementResult<T>> {
  try {
    const result = await operation();
    return result.success
      ? { success: true, data: result.data }
      : { success: false, error: mapRepositoryError(result.error) };
  } catch (error) {
    return { success: false, error: storageFailure(error) };
  }
}

function notFound(reference: string): BookingManagementResult<never> {
  return {
    success: false,
    error: {
      code: "booking-not-found",
      message: `No booking was found with reference ${reference}.`,
    },
  };
}

export async function saveBooking(
  repository: BookingRepository,
  booking: Booking,
): Promise<BookingManagementResult<Booking>> {
  return runStorageOperation(() => repository.save(booking));
}

export async function getBookingByReference(
  repository: BookingRepository,
  reference: string,
): Promise<BookingManagementResult<Booking>> {
  const result = await runStorageOperation(() =>
    repository.findByReference(reference),
  );
  if (!result.success) {
    return result;
  }

  return result.data ? { success: true, data: result.data } : notFound(reference);
}

export async function getAllBookings(
  repository: BookingRepository,
): Promise<BookingManagementResult<readonly Booking[]>> {
  return runStorageOperation(() => repository.list());
}

export async function getBookingsByEvent(
  repository: BookingRepository,
  eventId: string,
): Promise<BookingManagementResult<readonly Booking[]>> {
  const result = await getAllBookings(repository);
  return result.success
    ? {
        success: true,
        data: result.data.filter((booking) => booking.eventId === eventId),
      }
    : result;
}

export async function getBookingsByCustomerEmail(
  repository: BookingRepository,
  email: string,
): Promise<BookingManagementResult<readonly Booking[]>> {
  const normalizedEmail = email.trim().toLowerCase();
  const result = await getAllBookings(repository);
  return result.success
    ? {
        success: true,
        data: result.data.filter(
          (booking) => booking.customer.email.trim().toLowerCase() === normalizedEmail,
        ),
      }
    : result;
}

export async function getBookingsByStatus(
  repository: BookingRepository,
  status: BookingStatus,
): Promise<BookingManagementResult<readonly Booking[]>> {
  const result = await getAllBookings(repository);
  return result.success
    ? {
        success: true,
        data: result.data.filter((booking) => booking.status === status),
      }
    : result;
}

export function canTransitionBookingStatus(
  currentStatus: BookingStatus,
  nextStatus: BookingStatus,
): boolean {
  return (
    currentStatus === "pending" &&
    (nextStatus === "confirmed" || nextStatus === "cancelled")
  );
}

export async function transitionBookingStatus(
  repository: BookingRepository,
  reference: string,
  nextStatus: BookingStatus,
): Promise<BookingManagementResult<Booking>> {
  const currentResult = await getBookingByReference(repository, reference);
  if (!currentResult.success) {
    return currentResult;
  }

  if (!canTransitionBookingStatus(currentResult.data.status, nextStatus)) {
    return {
      success: false,
      error: {
        code: "invalid-status-transition",
        message: `A booking cannot transition from ${currentResult.data.status} to ${nextStatus}.`,
      },
    };
  }

  const updatedBooking = { ...currentResult.data, status: nextStatus };
  const updateResult = await runStorageOperation(() =>
    repository.update(updatedBooking),
  );
  if (!updateResult.success) {
    return updateResult;
  }

  return updateResult.data
    ? { success: true, data: updateResult.data }
    : notFound(reference);
}

export async function cancelBooking(
  repository: BookingRepository,
  reference: string,
): Promise<BookingManagementResult<Booking>> {
  const result = await transitionBookingStatus(
    repository,
    reference,
    "cancelled",
  );

  if (
    !result.success &&
    result.error.code === "invalid-status-transition"
  ) {
    return {
      success: false,
      error: {
        code: "cancellation-not-permitted",
        message: "This booking cannot be cancelled in its current status.",
      },
    };
  }

  return result;
}
