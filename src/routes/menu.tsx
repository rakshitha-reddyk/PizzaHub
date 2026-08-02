import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Leaf, Drumstick } from "lucide-react";
import { useMemo, useState } from "react";
import { categories, products, type Category } from "@/lib/data";
import { ProductCard } from "@/components/site/ProductCard";

type Search = { category?: Category; q?: string };

export const Route = createFileRoute("/menu")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: (s.category as Category) || undefined,
    q: (s.q as string) || undefined,
  }),
  head: () => ({
    meta: [
      { title: "Menu — PizzaHub" },
      {
        name: "description",
        content:
          "Explore our full menu of wood-fired pizzas, garlic bread, pasta, desserts and drinks.",
      },
      { property: "og:title", content: "Menu — PizzaHub" },
      {
        property: "og:description",
        content: "Explore our full menu of wood-fired pizzas and sides.",
      },
    ],
  }),
  component: MenuPage,
});

type DietFilter = "all" | "veg" | "non-veg";
type SortKey = "popular" | "low" | "high";

function MenuPage() {
  const search = Route.useSearch();
  const [q, setQ] = useState(search.q ?? "");
  const [cat, setCat] = useState<Category | "All">(search.category ?? "All");
  const [diet, setDiet] = useState<DietFilter>("all");
  const [sort, setSort] = useState<SortKey>("popular");

  const filtered = useMemo(() => {
    let list = products.slice();
    if (cat !== "All") list = list.filter((p) => p.category === cat);
    if (diet === "veg") list = list.filter((p) => p.veg);
    if (diet === "non-veg") list = list.filter((p) => !p.veg);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s),
      );
    }
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    else if (sort === "high") list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [cat, diet, sort, q]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-4xl font-black sm:text-5xl">Menu</h1>
          <p className="mt-2 text-muted-foreground">
            {filtered.length} delicious things ready to order.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search pizzas, sides, drinks…"
              className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setDiet(diet === "veg" ? "all" : "veg")}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition ${diet === "veg" ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950" : "border-border hover:bg-muted"}`}
            >
              <Leaf className="h-4 w-4" /> Veg
            </button>
            <button
              onClick={() => setDiet(diet === "non-veg" ? "all" : "non-veg")}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition ${diet === "non-veg" ? "border-brand bg-brand/10 text-brand" : "border-border hover:bg-muted"}`}
            >
              <Drumstick className="h-4 w-4" /> Non-Veg
            </button>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-10 appearance-none rounded-full border border-border bg-card pl-10 pr-8 text-sm font-semibold outline-none hover:bg-muted"
              >
                <option value="popular">Most popular</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
              <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {(["All", ...categories.map((c) => c.name)] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${cat === c ? "bg-ink text-white" : "bg-muted hover:bg-border"}`}
              style={cat === c ? { background: "var(--ink)", color: "white" } : undefined}
            >
              {c === "All" ? "All items" : c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border p-16 text-center">
            <div className="text-5xl">🔍</div>
            <p className="mt-4 font-bold">Nothing matches your filters</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try clearing filters or searching for something else.
            </p>
          </div>
        ) : (
          <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
