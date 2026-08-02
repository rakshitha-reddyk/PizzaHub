import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Minus, Plus, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { products } from "@/lib/data";
import { useCart } from "@/lib/cart-store";
import { toast } from "sonner";

type Search = { id?: string };

export const Route = createFileRoute("/customize")({
  validateSearch: (s: Record<string, unknown>): Search => ({ id: (s.id as string) || undefined }),
  head: () => ({
    meta: [
      { title: "Build Your Pizza — PizzaHub" },
      {
        name: "description",
        content: "Customize size, crust, sauce, cheese and toppings. Real-time price updates.",
      },
    ],
  }),
  component: CustomizePage,
});

const sizes = [
  { key: "S", label: "Small", inches: 10, factor: 0.75 },
  { key: "M", label: "Medium", inches: 12, factor: 1 },
  { key: "L", label: "Large", inches: 14, factor: 1.35 },
];
const crusts = ["Classic Hand-tossed", "Thin Crust", "Cheese Burst", "Gluten-free"];
const sauces = ["Tomato Basil", "Spicy Arrabbiata", "White Garlic", "BBQ"];
const cheeseAmounts = [
  { key: "light", label: "Light", add: -1 },
  { key: "regular", label: "Regular", add: 0 },
  { key: "extra", label: "Extra", add: 2 },
];
const toppings = [
  { name: "Pepperoni", price: 1.5 },
  { name: "Mushrooms", price: 1.0 },
  { name: "Olives", price: 1.0 },
  { name: "Onions", price: 0.8 },
  { name: "Bell peppers", price: 0.9 },
  { name: "Grilled chicken", price: 2.0 },
  { name: "Jalapeños", price: 1.0 },
  { name: "Pineapple", price: 1.2 },
  { name: "Fresh basil", price: 0.9 },
  { name: "Sun-dried tomato", price: 1.4 },
];

function CustomizePage() {
  const { id } = Route.useSearch();
  const base = useMemo(() => products.find((p) => p.id === id) ?? products[0], [id]);
  const [size, setSize] = useState("M");
  const [crust, setCrust] = useState(crusts[0]);
  const [sauce, setSauce] = useState(sauces[0]);
  const [cheese, setCheese] = useState("regular");
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.openCart);

  const sizeObj = sizes.find((s) => s.key === size)!;
  const cheeseObj = cheeseAmounts.find((c) => c.key === cheese)!;
  const toppingsPrice = toppings
    .filter((t) => selectedToppings.includes(t.name))
    .reduce((s, t) => s + t.price, 0);
  const unit = base.price * sizeObj.factor + cheeseObj.add + toppingsPrice;
  const total = unit * qty;

  const toggle = (name: string) =>
    setSelectedToppings((s) => (s.includes(name) ? s.filter((x) => x !== name) : [...s, name]));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <span className="chip">Customize</span>
          <h1 className="mt-3 text-4xl font-black sm:text-5xl">{base.name}</h1>
          <p className="mt-2 max-w-lg text-muted-foreground">{base.description}</p>

          <motion.div
            key={base.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative mt-8 aspect-square max-w-md"
          >
            <div className="absolute inset-0 rounded-full bg-brand/10 blur-3xl" />
            <motion.img
              key={size}
              initial={{ scale: 0.9, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              src={base.image}
              alt={base.name}
              className="relative h-full w-full rounded-full object-cover shadow-glow"
              style={{ transform: `scale(${sizeObj.factor})` }}
            />
          </motion.div>

          <div className="mt-10 space-y-8">
            <Section title="Size" hint={`${sizeObj.inches}" pizza`}>
              <div className="grid grid-cols-3 gap-3">
                {sizes.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSize(s.key)}
                    className={`rounded-2xl border-2 p-4 text-left transition ${size === s.key ? "border-brand bg-brand/5" : "border-border hover:border-foreground/30"}`}
                  >
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      {s.inches}"
                    </div>
                    <div className="mt-1 font-bold">{s.label}</div>
                    <div className="mt-1 text-sm text-brand font-semibold">
                      ${(base.price * s.factor).toFixed(2)}
                    </div>
                  </button>
                ))}
              </div>
            </Section>

            <Section title="Crust">
              <div className="flex flex-wrap gap-2">
                {crusts.map((c) => (
                  <Chip key={c} label={c} active={crust === c} onClick={() => setCrust(c)} />
                ))}
              </div>
            </Section>
            <Section title="Sauce">
              <div className="flex flex-wrap gap-2">
                {sauces.map((c) => (
                  <Chip key={c} label={c} active={sauce === c} onClick={() => setSauce(c)} />
                ))}
              </div>
            </Section>
            <Section title="Cheese">
              <div className="flex flex-wrap gap-2">
                {cheeseAmounts.map((c) => (
                  <Chip
                    key={c.key}
                    label={c.label + (c.add !== 0 ? ` (${c.add > 0 ? "+" : ""}$${c.add})` : "")}
                    active={cheese === c.key}
                    onClick={() => setCheese(c.key)}
                  />
                ))}
              </div>
            </Section>
            <Section title="Extra toppings" hint={`${selectedToppings.length} selected`}>
              <div className="grid gap-2 sm:grid-cols-2">
                {toppings.map((t) => {
                  const active = selectedToppings.includes(t.name);
                  return (
                    <button
                      key={t.name}
                      onClick={() => toggle(t.name)}
                      className={`flex items-center justify-between rounded-2xl border-2 px-4 py-3 text-sm font-medium transition ${active ? "border-brand bg-brand/5" : "border-border hover:border-foreground/30"}`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`grid h-5 w-5 place-items-center rounded-md border-2 ${active ? "border-brand bg-brand text-brand-foreground" : "border-border"}`}
                        >
                          {active && <Check className="h-3 w-3" />}
                        </span>
                        {t.name}
                      </span>
                      <span className="text-muted-foreground">+${t.price.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </Section>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-lg font-black">Your order</h2>
            <p className="mt-1 text-sm text-muted-foreground">Real-time preview</p>
            <div className="mt-5 space-y-2 text-sm">
              <Row k="Base" v={base.name} />
              <Row k="Size" v={`${sizeObj.label} (${sizeObj.inches}")`} />
              <Row k="Crust" v={crust} />
              <Row k="Sauce" v={sauce} />
              <Row k="Cheese" v={cheeseObj.label} />
              <Row
                k="Toppings"
                v={selectedToppings.length ? selectedToppings.join(", ") : "None"}
              />
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-dashed border-border pt-5">
              <span className="text-sm font-medium">Quantity</span>
              <div className="flex items-center gap-1 rounded-full border border-border p-1">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  aria-label="Decrease"
                  className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-bold">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  aria-label="Increase"
                  className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">Total</span>
              <motion.span
                key={total}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-3xl font-black"
              >
                ${total.toFixed(2)}
              </motion.span>
            </div>
            <button
              onClick={() => {
                add({
                  id: `${base.id}-${size}-${Date.now()}`,
                  name: base.name,
                  price: unit,
                  image: base.image,
                  quantity: qty,
                  options: `${sizeObj.label} · ${crust} · ${sauce}${selectedToppings.length ? ` · +${selectedToppings.length} toppings` : ""}`,
                });
                toast.success("Added to cart");
                openCart();
              }}
              className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-brand text-sm font-semibold text-brand-foreground shadow-lift transition-transform hover:scale-[1.01] active:scale-95"
            >
              Add to cart · ${total.toFixed(2)}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-black">{title}</h3>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${active ? "border-brand bg-brand text-brand-foreground" : "border-border hover:border-foreground/30"}`}
    >
      {label}
    </button>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{k}</span>
      <span className="max-w-[60%] text-right font-medium">{v}</span>
    </div>
  );
}
