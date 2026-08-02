import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { deals } from "@/lib/data";

export const Route = createFileRoute("/deals")({
  head: () => ({
    meta: [
      { title: "Deals & Offers — PizzaHub" },
      {
        name: "description",
        content: "Family feasts, weekend specials, BOGO deals, and limited-time offers.",
      },
    ],
  }),
  component: DealsPage,
});

const combos = [
  { title: "Duo Night", price: 24.9, includes: "2 Medium pizzas + 2 drinks", tag: "For 2" },
  {
    title: "Family Feast",
    price: 42.9,
    includes: "2 Large pizzas + garlic bread + 4 drinks",
    tag: "For 4",
    best: true,
  },
  {
    title: "Party Pack",
    price: 79.9,
    includes: "4 Large pizzas + 2 pastas + 6 drinks + dessert",
    tag: "For 8",
  },
];

export function DealsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex items-end justify-between">
        <div>
          <span className="chip">
            <Sparkles className="h-3.5 w-3.5 text-brand" /> This week
          </span>
          <h1 className="mt-3 text-4xl font-black sm:text-5xl">Deals & Offers</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Handpicked savings, refreshed weekly. Tap a code to copy.
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-black">Combo boxes</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {combos.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-3xl border p-8 shadow-soft ${c.best ? "border-brand" : "border-border bg-card"}`}
              style={
                c.best
                  ? {
                      background: "linear-gradient(135deg, var(--brand), oklch(0.5 0.24 20))",
                      color: "white",
                    }
                  : undefined
              }
            >
              {c.best && (
                <span className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                  Popular
                </span>
              )}
              <span
                className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${c.best ? "bg-white/15" : "bg-muted"}`}
              >
                {c.tag}
              </span>
              <h3 className="mt-3 text-2xl font-black">{c.title}</h3>
              <p className={`mt-2 text-sm ${c.best ? "text-white/90" : "text-muted-foreground"}`}>
                {c.includes}
              </p>
              <div className="mt-6 text-4xl font-black">${c.price.toFixed(2)}</div>
              <button
                className={`mt-6 h-11 w-full rounded-full text-sm font-semibold transition ${c.best ? "bg-white text-brand hover:bg-white/90" : "bg-ink text-white"}`}
                style={c.best ? undefined : { background: "var(--ink)", color: "white" }}
              >
                Add combo
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-black">Coupon codes</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {deals.map((d) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group flex items-center overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
            >
              <div
                className="grid h-full min-h-[140px] w-32 shrink-0 place-items-center text-4xl"
                style={{
                  background:
                    d.accent === "brand"
                      ? "var(--brand)"
                      : d.accent === "ink"
                        ? "var(--ink)"
                        : "var(--blue-accent)",
                  color: "white",
                }}
              >
                🎟️
              </div>
              <div className="relative flex-1 border-l-2 border-dashed border-border p-5">
                <span className="chip">{d.badge}</span>
                <h3 className="mt-2 text-lg font-black">{d.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d.subtitle}</p>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(d.code);
                    toast.success(`Code ${d.code} copied`);
                  }}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-sm font-black tracking-wider hover:bg-border"
                >
                  <Copy className="h-3.5 w-3.5" /> {d.code}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
