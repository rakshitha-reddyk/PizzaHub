import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CreditCard, Wallet, Smartphone, Banknote, MapPin } from "lucide-react";
import { useState } from "react";
import { cartTotals, useCart } from "@/lib/cart-store";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — PizzaHub" },
      { name: "description", content: "Complete your order." },
    ],
  }),
  component: CheckoutPage,
});

const savedAddresses = [
  { id: "a1", label: "Home", line: "234 Prince St, Apt 4B, New York, NY 10012" },
  { id: "a2", label: "Work", line: "88 Broadway Fl 22, New York, NY 10004" },
];
const payments = [
  { id: "card", label: "Credit / Debit card", icon: CreditCard },
  { id: "upi", label: "UPI / QR", icon: Smartphone },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "cod", label: "Cash on delivery", icon: Banknote },
] as const;

function CheckoutPage() {
  const { items, promo, clear } = useCart();
  const totals = cartTotals(items, promo);
  const [addr, setAddr] = useState("a1");
  const [payment, setPayment] = useState<(typeof payments)[number]["id"]>("card");
  const nav = useNavigate();

  const placeOrder = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    toast.success("Order placed! Tracking…");
    clear();
    nav({ to: "/track" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-4xl font-black sm:text-5xl">Checkout</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          <Panel title="Delivery address" step={1}>
            <div className="space-y-3">
              {savedAddresses.map((a) => (
                <label
                  key={a.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition ${addr === a.id ? "border-brand bg-brand/5" : "border-border hover:border-foreground/30"}`}
                >
                  <input
                    type="radio"
                    name="addr"
                    checked={addr === a.id}
                    onChange={() => setAddr(a.id)}
                    className="mt-1 accent-[color:var(--brand)]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-brand" />
                      <span className="font-bold">{a.label}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{a.line}</p>
                  </div>
                </label>
              ))}
              <button className="rounded-2xl border-2 border-dashed border-border p-4 text-sm font-semibold text-muted-foreground hover:border-brand hover:text-brand w-full text-left">
                + Add new address
              </button>
            </div>
            <div className="mt-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Delivery instructions
              </label>
              <textarea
                placeholder="Leave at door, ring bell, avoid contact…"
                rows={2}
                className="mt-1 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10"
              />
            </div>
          </Panel>

          <Panel title="Payment method" step={2}>
            <div className="grid gap-3 sm:grid-cols-2">
              {payments.map((p) => (
                <label
                  key={p.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 transition ${payment === p.id ? "border-brand bg-brand/5" : "border-border hover:border-foreground/30"}`}
                >
                  <input
                    type="radio"
                    name="pay"
                    checked={payment === p.id}
                    onChange={() => setPayment(p.id)}
                    className="accent-[color:var(--brand)]"
                  />
                  <p.icon className="h-5 w-5 text-brand" />
                  <span className="font-semibold">{p.label}</span>
                </label>
              ))}
            </div>
            {payment === "card" && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Field label="Card number" placeholder="1234 5678 9012 3456" full />
                <Field label="Name on card" placeholder="Alex Doe" />
                <Field label="Expiry" placeholder="MM/YY" />
                <Field label="CVC" placeholder="123" />
              </div>
            )}
          </Panel>
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft"
          >
            <h2 className="text-lg font-black">Order summary</h2>
            {items.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">
                Your cart is empty.{" "}
                <Link to="/menu" className="font-semibold text-brand">
                  Browse menu →
                </Link>
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {items.map((it) => (
                  <li key={it.id} className="flex items-center gap-3">
                    <img src={it.image} alt="" className="h-12 w-12 rounded-xl object-cover" />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-sm font-bold">{it.name}</span>
                      <span className="text-xs text-muted-foreground">Qty {it.quantity}</span>
                    </div>
                    <span className="text-sm font-bold">
                      ${(it.price * it.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <dl className="mt-5 space-y-1 border-t border-border pt-4 text-sm text-muted-foreground">
              <Row k="Subtotal" v={`$${totals.subtotal.toFixed(2)}`} />
              {totals.discount > 0 && (
                <Row k="Discount" v={`-$${totals.discount.toFixed(2)}`} className="text-brand" />
              )}
              <Row
                k="Delivery"
                v={totals.delivery === 0 ? "Free" : `$${totals.delivery.toFixed(2)}`}
              />
              <Row k="Tax" v={`$${totals.tax.toFixed(2)}`} />
            </dl>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-lg font-black">
              <span>Total</span>
              <span>${totals.total.toFixed(2)}</span>
            </div>
            <button
              onClick={placeOrder}
              className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-brand font-semibold text-brand-foreground shadow-lift transition-transform hover:scale-[1.01] active:scale-95"
            >
              Place order · ${totals.total.toFixed(2)}
            </button>
          </motion.div>
        </aside>
      </div>
    </div>
  );
}

function Panel({
  title,
  step,
  children,
}: {
  title: string;
  step: number;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-sm font-black text-brand-foreground">
          {step}
        </span>
        <h2 className="text-xl font-black">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
function Field({
  label,
  placeholder,
  full,
}: {
  label: string;
  placeholder: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        placeholder={placeholder}
        className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10"
      />
    </div>
  );
}
function Row({ k, v, className = "" }: { k: string; v: string; className?: string }) {
  return (
    <div className={"flex items-center justify-between " + className}>
      <dt>{k}</dt>
      <dd className="font-medium">{v}</dd>
    </div>
  );
}
