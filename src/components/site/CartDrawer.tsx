import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, Tag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { cartTotals, useCart } from "@/lib/cart-store";
import { toast } from "sonner";

export function CartDrawer() {
  const { items, isOpen, closeCart, setQty, remove, promo, applyPromo } = useCart();
  const [code, setCode] = useState("");
  const totals = cartTotals(items, promo);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-lg font-black">Your cart</h2>
              <button
                onClick={closeCart}
                aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
                <div className="text-6xl">🍕</div>
                <p className="text-lg font-bold">Your cart is empty</p>
                <p className="text-sm text-muted-foreground">
                  Add something delicious to get started.
                </p>
                <Link
                  to="/menu"
                  onClick={closeCart}
                  className="mt-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground"
                >
                  Browse menu
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto px-6 py-4">
                  {items.map((it) => (
                    <motion.div
                      layout
                      key={it.id + (it.options ?? "")}
                      className="flex gap-3 rounded-2xl border border-border p-3"
                    >
                      <img
                        src={it.image}
                        alt={it.name}
                        className="h-20 w-20 shrink-0 rounded-xl object-cover"
                      />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold">{it.name}</p>
                            {it.options && (
                              <p className="truncate text-xs text-muted-foreground">{it.options}</p>
                            )}
                          </div>
                          <button
                            onClick={() => remove(it.id)}
                            aria-label="Remove"
                            className="shrink-0 text-muted-foreground hover:text-brand"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-1 rounded-full border border-border p-0.5">
                            <button
                              onClick={() => setQty(it.id, it.quantity - 1)}
                              aria-label="Decrease"
                              className="grid h-7 w-7 place-items-center rounded-full hover:bg-muted"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold">
                              {it.quantity}
                            </span>
                            <button
                              onClick={() => setQty(it.id, it.quantity + 1)}
                              aria-label="Increase"
                              className="grid h-7 w-7 place-items-center rounded-full hover:bg-muted"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-sm font-bold">
                            ${(it.price * it.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  <div className="rounded-2xl bg-muted p-3">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-brand" />
                      <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Promo code"
                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                      />
                      <button
                        onClick={() => {
                          if (applyPromo(code))
                            toast.success(`Promo ${code.toUpperCase()} applied`);
                          else toast.error("Invalid promo code");
                        }}
                        className="rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white"
                        style={{ background: "var(--ink)", color: "white" }}
                      >
                        Apply
                      </button>
                    </div>
                    {promo && (
                      <p className="mt-1.5 text-xs text-brand font-semibold">✓ {promo} active</p>
                    )}
                  </div>
                </div>

                <div className="border-t border-border px-6 py-4">
                  <dl className="space-y-1 text-sm">
                    <Row label="Subtotal" value={totals.subtotal} />
                    {totals.discount > 0 && (
                      <Row label="Discount" value={-totals.discount} className="text-brand" />
                    )}
                    <Row
                      label="Delivery"
                      value={totals.delivery}
                      hint={totals.delivery === 0 ? "Free" : undefined}
                    />
                    <Row label="Tax" value={totals.tax} />
                    <div className="mt-2 flex items-center justify-between border-t border-border pt-2 text-base font-black">
                      <span>Total</span>
                      <span>${totals.total.toFixed(2)}</span>
                    </div>
                  </dl>
                  <Link
                    to="/checkout"
                    onClick={closeCart}
                    className="mt-4 flex h-12 items-center justify-center rounded-full bg-brand font-semibold text-brand-foreground transition-transform hover:scale-[1.01]"
                  >
                    Checkout · ${totals.total.toFixed(2)}
                  </Link>
                  <Link
                    to="/menu"
                    onClick={closeCart}
                    className="mt-2 flex h-11 items-center justify-center rounded-full text-sm font-medium text-muted-foreground hover:bg-muted"
                  >
                    Continue shopping
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Row({
  label,
  value,
  hint,
  className = "",
}: {
  label: string;
  value: number;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={"flex items-center justify-between text-muted-foreground " + className}>
      <dt>{label}</dt>
      <dd className="font-medium">
        {hint ?? `${value < 0 ? "-" : ""}$${Math.abs(value).toFixed(2)}`}
      </dd>
    </div>
  );
}
