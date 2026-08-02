import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CreditCard, Heart, MapPin, ShoppingBag, User } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account — PizzaHub" },
      { name: "description", content: "Manage your account, orders, addresses and favorites." },
    ],
  }),
  component: AccountPage,
});

type Tab = "profile" | "orders" | "addresses" | "payments" | "favorites";

const tabs: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "favorites", label: "Favorites", icon: Heart },
];

function AccountPage() {
  const [authed, setAuthed] = useState(true);
  const [tab, setTab] = useState<Tab>("profile");

  if (!authed) return <AuthGate onAuth={() => setAuthed(true)} />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-brand text-xl font-black text-brand-foreground">
            A
          </div>
          <div>
            <h1 className="text-2xl font-black">Alex Doe</h1>
            <p className="text-sm text-muted-foreground">alex@example.com · Member since 2024</p>
          </div>
        </div>
        <button
          onClick={() => setAuthed(false)}
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
        >
          Sign out
        </button>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[220px_1fr]">
        <nav className="flex flex-row gap-1 overflow-x-auto md:flex-col">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${tab === t.id ? "bg-brand text-brand-foreground" : "hover:bg-muted"}`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </nav>
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-border bg-card p-6 shadow-soft"
        >
          {tab === "profile" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" value="Alex Doe" />
              <Field label="Email" value="alex@example.com" />
              <Field label="Phone" value="+1 555 342 8891" />
              <Field label="Birthday" value="1994-04-12" />
            </div>
          )}
          {tab === "orders" && (
            <ul className="space-y-3">
              {[
                {
                  id: "#A2039",
                  date: "Today, 8:42 PM",
                  items: 3,
                  total: 34.5,
                  status: "Out for delivery",
                },
                { id: "#A1988", date: "Sat, 9:12 PM", items: 5, total: 58.4, status: "Delivered" },
                {
                  id: "#A1902",
                  date: "Last Tue, 7:20 PM",
                  items: 2,
                  total: 22.9,
                  status: "Delivered",
                },
              ].map((o) => (
                <li
                  key={o.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border p-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{o.id}</span>
                      <span className="chip">{o.status}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {o.date} · {o.items} items
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-black">${o.total.toFixed(2)}</span>
                    <button className="rounded-full bg-muted px-4 py-1.5 text-xs font-semibold hover:bg-border">
                      Reorder
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {tab === "addresses" && (
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "Home", line: "234 Prince St, Apt 4B, NY 10012" },
                { label: "Work", line: "88 Broadway Fl 22, NY 10004" },
              ].map((a) => (
                <div key={a.label} className="rounded-2xl border border-border p-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-brand" />
                    <span className="font-bold">{a.label}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{a.line}</p>
                </div>
              ))}
              <button className="rounded-2xl border-2 border-dashed border-border p-4 text-sm font-semibold text-muted-foreground hover:border-brand hover:text-brand">
                + Add address
              </button>
            </div>
          )}
          {tab === "payments" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-border p-4">
                <div className="flex items-center gap-3">
                  <div
                    className="grid h-10 w-14 place-items-center rounded-lg text-xs font-black text-white"
                    style={{ background: "var(--ink)" }}
                  >
                    VISA
                  </div>
                  <div>
                    <p className="font-bold">•••• 4242</p>
                    <p className="text-xs text-muted-foreground">Expires 09/28</p>
                  </div>
                </div>
                <span className="chip">Default</span>
              </div>
              <button className="w-full rounded-2xl border-2 border-dashed border-border p-4 text-sm font-semibold text-muted-foreground hover:border-brand hover:text-brand">
                + Add payment method
              </button>
            </div>
          )}
          {tab === "favorites" && (
            <div className="grid gap-3 sm:grid-cols-2">
              {["Classic Margherita", "Double Pepperoni", "Quattro Formaggi"].map((n) => (
                <div
                  key={n}
                  className="flex items-center justify-between rounded-2xl border border-border p-4"
                >
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 fill-brand text-brand" />
                    <span className="font-semibold">{n}</span>
                  </div>
                  <button className="rounded-full bg-brand px-4 py-1.5 text-xs font-semibold text-brand-foreground">
                    Order
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function AuthGate({ onAuth }: { onAuth: () => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  return (
    <div className="mx-auto grid max-w-md px-4 py-16 sm:px-6">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
        <div className="flex gap-2 rounded-full bg-muted p-1">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 rounded-full py-2 text-sm font-semibold transition ${mode === m ? "bg-background shadow-soft" : "text-muted-foreground"}`}
            >
              {m === "login" ? "Sign in" : "Sign up"}
            </button>
          ))}
        </div>
        <h1 className="mt-6 text-2xl font-black">
          {mode === "login" ? "Welcome back" : "Create account"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "login" ? "Sign in to see your orders." : "Get started with your first order."}
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onAuth();
          }}
          className="mt-6 space-y-3"
        >
          {mode === "signup" && (
            <input
              placeholder="Full name"
              className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10"
            />
          )}
          <input
            placeholder="Email"
            type="email"
            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10"
          />
          <input
            placeholder="Password"
            type="password"
            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10"
          />
          <button className="h-11 w-full rounded-full bg-brand text-sm font-semibold text-brand-foreground">
            {mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        defaultValue={value}
        className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10"
      />
    </div>
  );
}
