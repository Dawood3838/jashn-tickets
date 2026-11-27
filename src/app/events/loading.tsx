export default function EventsLoading() {
  return (
    <div className="bg-white" aria-busy="true" aria-label="Loading events">
      <div className="mx-auto w-[min(100%-2.5rem,1180px)] py-10 sm:py-16">
        <div className="animate-pulse">
          <div className="h-4 w-32 rounded-full bg-lavender" />
          <div className="mt-4 h-12 w-full max-w-xl rounded-2xl bg-violet/10" />
          <div className="mt-5 h-5 w-full max-w-lg rounded-full bg-lavender" />

          <div className="mt-12 flex items-center justify-between">
            <div className="h-8 w-48 rounded-xl bg-violet/10" />
            <div className="h-4 w-24 rounded-full bg-lavender" />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {["category-1", "category-2", "category-3", "category-4", "category-5", "category-6"].map((key) => (
              <div className="h-24 rounded-3xl bg-lavender" key={key} />
            ))}
          </div>

          <div className="mt-10 grid gap-4 rounded-3xl border border-violet/10 bg-white p-5 sm:grid-cols-2 lg:grid-cols-3">
            {[ "search", "category", "city", "availability", "from", "to", "sort", "featured" ].map((key) => (
              <div
                className={`h-12 rounded-2xl bg-lavender ${key === "search" ? "sm:col-span-2 lg:col-span-3" : ""}`}
                key={key}
              />
            ))}
          </div>

          <div className="mt-12 flex items-center justify-between">
            <div className="h-8 w-28 rounded-xl bg-violet/10" />
            <div className="h-4 w-24 rounded-full bg-lavender" />
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {["event-1", "event-2", "event-3", "event-4", "event-5", "event-6"].map((key) => (
              <div className="overflow-hidden rounded-3xl border border-violet/10" key={key}>
                <div className="h-52 bg-violet/10" />
                <div className="p-5">
                  <div className="h-6 w-3/4 rounded-lg bg-lavender" />
                  <div className="mt-3 h-4 w-1/2 rounded-full bg-lavender" />
                  <div className="mt-2 h-4 w-2/3 rounded-full bg-lavender" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
