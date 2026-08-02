import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, ChefHat, Flame, Package, Truck, Home } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track Order — PizzaHub" },
      { name: "description", content: "Live tracking of your order." },
    ],
  }),
  component: TrackPage,
});

const steps = [
  { key: "confirmed", label: "Order confirmed", icon: Check, sub: "We got your order" },
  { key: "prep", label: "Preparing", icon: ChefHat, sub: "Chef is on it" },
  { key: "baking", label: "Baking", icon: Flame, sub: "In the wood-fired oven" },
  { key: "out", label: "Out for delivery", icon: Truck, sub: "Driver is on the way" },
  { key: "delivered", label: "Delivered", icon: Home, sub: "Enjoy!" },
];

function TrackPage() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (active >= steps.length - 1) return;
    const t = setTimeout(() => setActive((a) => a + 1), 3500);
    return () => clearTimeout(t);
  }, [active]);

  const eta = Math.max(3, 24 - active * 5);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="chip">
              <Package className="h-3.5 w-3.5 text-brand" /> Order #A2039
            </span>
            <h1 className="mt-3 text-3xl font-black sm:text-4xl">Your order is on its way</h1>
            <p className="mt-2 text-muted-foreground">Estimated arrival in ~{eta} minutes</p>
          </div>
          <motion.div
            key={active}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-2xl bg-brand/10 px-5 py-3 text-center"
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-brand">Now</div>
            <div className="text-lg font-black text-brand">{steps[active].label}</div>
          </motion.div>
        </div>

        <div className="mt-10">
          <div className="relative">
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />
            <motion.div
              className="absolute left-6 top-6 w-0.5 bg-brand md:left-1/2 md:-translate-x-1/2"
              initial={{ height: 0 }}
              animate={{ height: `${(active / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.6 }}
              style={{ maxHeight: "calc(100% - 3rem)" }}
            />
            <ul className="space-y-6">
              {steps.map((s, i) => {
                const done = i <= active;
                const current = i === active;
                return (
                  <li key={s.key} className="relative flex items-center gap-4">
                    <motion.div
                      animate={current ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ duration: 1.5, repeat: current ? Infinity : 0 }}
                      className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full transition-colors ${done ? "bg-brand text-brand-foreground" : "bg-muted text-muted-foreground"}`}
                    >
                      <s.icon className="h-5 w-5" />
                    </motion.div>
                    <div className="flex-1">
                      <p
                        className={`font-black ${done ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {s.label}
                      </p>
                      <p className="text-sm text-muted-foreground">{s.sub}</p>
                    </div>
                    {done && <Check className="h-5 w-5 text-brand" />}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 border-t border-border pt-6">
          <Link
            to="/menu"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-muted"
          >
            Order again
          </Link>
          <Link
            to="/account"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white"
            style={{ background: "var(--ink)", color: "white" }}
          >
            Order history
          </Link>
        </div>
      </div>
    </div>
  );
}
