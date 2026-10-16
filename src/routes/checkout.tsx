import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CreditCard, Wallet, Smartphone, Banknote, MapPin, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cartTotals, useCart } from "@/lib/cart-store";
import { toast } from "sonner";
// @ts-ignore
import { supabase } from "../supabaseClient";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — PizzaHub" },
      { name: "description", content: "Review your order and complete payment." },
    ],
  }),
  component: CheckoutPage,
});

const savedAddresses = [
  { id: "a1", label: "Home", line: "234 Prince St, Apt 4B, NY 10012" },
  { id: "a2", label: "Work", line: "88 Broadway Fl 22, NY 10004" },
];

const payments = [
  { id: "card", label: "Credit Card", icon: CreditCard, sub: "•••• 4242" },
  { id: "apple", label: "Apple Pay", icon: Smartphone, sub: "Fast check-out" },
  { id: "paypal", label: "PayPal", icon: Wallet, sub: "Connected" },
  { id: "cash", label: "Cash on delivery", icon: Banknote, sub: "Pay driver directly" },
];

function CheckoutPage() {
  const { items, promo, clear } = useCart();
  const totals = cartTotals(items, promo);
  const [addr, setAddr] = useState("a1");
  const [payment, setPayment] = useState<string>("card");
  const [checkingAuth, setCheckingAuth] = useState(true);
  const nav = useNavigate();

  // 🔒 Enforce sign-in the moment checkout loads!
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: any } }) => {
      if (!session?.user) {
        toast.error("Please sign in to access checkout!");
        nav({ to: "/account" });
      } else {
        setCheckingAuth(false);
      }
    });
  }, [nav]);

  const placeOrder = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      toast.error("Please sign in to place your order!");
      nav({ to: "/account" });
      return;
    }

    // Save active order and timestamp for tracking
    localStorage.setItem("pizzahub_active_order", "true");
    localStorage.setItem("pizzahub_order_time", Date.now().toString());

    toast.success("Order placed! Tracking…");
    clear();
    nav({ to: "/track" });
  };

  if (checkingAuth) {
    return (
      <div className="text-center py-20 font-semibold text-muted-foreground">
        Verifying account... 🍕
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-4xl justify-center px-4 py-16 sm:px-6">
        <div className="w-full rounded-3xl border border-border bg-card p-10 text-center shadow-soft">
          <div className="text-5xl">🛒</div>
          <h1 className="mt-4 text-3xl font-black">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">
            Add some delicious pizzas to your cart before proceeding to checkout.
          </p>
          <Link
            to="/menu"
            className="mt-6 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground"
          >
            Browse menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-black sm:text-4xl">Checkout</h1>
      <p className="mt-1 text-muted-foreground">Confirm delivery address and payment details.</p>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          {/* Address selection */}
          <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-xl font-bold">1. Delivery Address</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {savedAddresses.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setAddr(a.id)}
                  className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                    addr === a.id
                      ? "border-brand bg-brand/5 ring-2 ring-brand/20"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <MapPin
                    className={`h-5 w-5 shrink-0 ${addr === a.id ? "text-brand" : "text-muted-foreground"}`}
                  />
                  <div>
                    <div className="font-bold">{a.label}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{a.line}</div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Payment selection */}
          <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-xl font-bold">2. Payment Method</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {payments.map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPayment(p.id)}
                    className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                      payment === p.id
                        ? "border-brand bg-brand/5 ring-2 ring-brand/20"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 shrink-0 ${payment === p.id ? "text-brand" : "text-muted-foreground"}`}
                    />
                    <div>
                      <div className="font-bold">{p.label}</div>
                      <div className="text-xs text-muted-foreground">{p.sub}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Order Summary sidebar */}
        <aside className="h-fit rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-xl font-bold">Order Summary</h2>
          <ul className="mt-4 divide-y divide-border text-sm">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between py-2">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${totals.subtotal.toFixed(2)}</span>
            </div>
            {totals.discount > 0 && (
              <div className="flex justify-between text-brand">
                <span>Discount</span>
                <span>-${totals.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery fee</span>
              <span>${totals.delivery.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax</span>
              <span>${totals.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 text-base font-black text-foreground">
              <span>Total</span>
              <span>${totals.total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-brand-foreground shadow-md transition hover:opacity-90 active:scale-95 cursor-pointer"
          >
            <span>Place order</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </aside>
      </div>
    </div>
  );
}
