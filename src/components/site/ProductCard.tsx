import { motion } from "framer-motion";
import { Star, Plus, Leaf, Drumstick } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/data";
import { useCart } from "@/lib/cart-store";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.openCart);

  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-shadow hover:shadow-lift"
    >
      <Link
        to="/customize"
        search={{ id: product.id }}
        className="relative block aspect-square overflow-hidden bg-muted"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.tags?.map((t) => (
            <span
              key={t}
              className="chip !bg-ink !text-white"
              style={{ background: "var(--ink)", color: "white" }}
            >
              {t}
            </span>
          ))}
        </div>
        <div className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-background/90 backdrop-blur">
          {product.veg ? (
            <Leaf className="h-4 w-4 text-emerald-600" />
          ) : (
            <Drumstick className="h-4 w-4 text-brand" />
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold leading-tight">{product.name}</h3>
          <div className="flex shrink-0 items-center gap-1 text-xs font-semibold">
            <Star className="h-3.5 w-3.5 fill-amber-400 stroke-amber-400" />
            {product.rating}
          </div>
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-black">${product.price.toFixed(2)}</span>
          <button
            onClick={() => {
              add({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
              });
              toast.success(`${product.name} added to cart`);
              openCart();
            }}
            aria-label={`Add ${product.name}`}
            className="group/btn inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95"
            style={{ background: "var(--ink)", color: "white" }}
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}
