import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Flame, Leaf, ShieldCheck, Smartphone, Star, Truck } from "lucide-react";
import hero from "@/assets/hero-pizza.jpg";
import { categories, deals, products, reviews } from "@/lib/data";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  const featured = products.filter((p) => p.category === "Pizza").slice(0, 4);
  return (
    <div className="overflow-hidden">
      <Hero />
      <Marquee />
      <Categories />
      <FeaturedPizzas featured={featured} />
      <Deals />
      <DeliveryPromise />
      <Reviews />
      <AppDownload />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="chip">
            <Flame className="h-3.5 w-3.5 text-brand" /> Wood-fired since 2018
          </span>
          <h1 className="mt-4 text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            Pizza that <span className="text-brand">arrives</span> before you're hungry again.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            Hand-stretched dough, San Marzano tomatoes, fior di latte — at your door in under 30
            minutes, or the next one's on us.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/menu"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-brand-foreground shadow-lift transition-transform hover:scale-[1.02] active:scale-95"
            >
              Order Now{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/customize"
              className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-semibold hover:bg-muted"
            >
              Build your own
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-brand" /> Avg. 27 min delivery
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck
                className="h-4 w-4 text-blue-accent"
                style={{ color: "var(--blue-accent)" }}
              />{" "}
              100% contactless
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 stroke-amber-400" /> 4.9 · 12k reviews
            </span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <motion.div
            animate={{ rotate: [0, 8, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative mx-auto aspect-square max-w-lg"
          >
            <div className="absolute inset-0 rounded-full bg-brand/10 blur-3xl" />
            <img
              src={hero}
              alt="Signature pizza"
              width={1600}
              height={1600}
              className="relative h-full w-full rounded-full object-cover shadow-glow"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute -left-2 top-8 rounded-2xl border border-border bg-card p-3 shadow-lift md:left-0"
          >
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-brand/10">
                <Truck className="h-4 w-4 text-brand" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Free delivery
                </p>
                <p className="text-sm font-bold">Orders above $25</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute -right-2 bottom-10 rounded-2xl border border-border bg-card p-3 shadow-lift md:right-0"
          >
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-accent/10">
                <Leaf className="h-4 w-4" style={{ color: "var(--blue-accent)" }} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Fresh daily
                </p>
                <p className="text-sm font-bold">Farm ingredients</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Free delivery over $25",
    "30-min guarantee",
    "Wood-fired ovens",
    "Farm-fresh ingredients",
    "Vegan options",
    "Late night 'til 2AM",
  ];
  return (
    <div
      className="relative overflow-hidden border-y border-border py-3"
      style={{ background: "var(--ink)" }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex shrink-0 gap-10 whitespace-nowrap text-sm font-semibold text-white"
      >
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            {t}
            <span className="text-brand">●</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-black sm:text-4xl">Browse by category</h2>
          <p className="mt-2 text-muted-foreground">All the good stuff, sorted.</p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {categories.map((c) => (
          <Link
            key={c.name}
            to="/menu"
            search={{ category: c.name }}
            className="group flex flex-col items-center gap-2 rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <div className="text-4xl transition-transform group-hover:scale-110">{c.icon}</div>
            <span className="text-sm font-bold">{c.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FeaturedPizzas({ featured }: { featured: typeof products }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="chip">
            <Flame className="h-3.5 w-3.5 text-brand" /> Trending now
          </span>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">Featured pizzas</h2>
        </div>
        <Link to="/menu" className="text-sm font-semibold text-brand hover:underline">
          View all →
        </Link>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

function Deals() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-black sm:text-4xl">Popular deals</h2>
          <p className="mt-2 text-muted-foreground">Save more, eat more.</p>
        </div>
        <Link to="/deals" className="text-sm font-semibold text-brand hover:underline">
          All offers →
        </Link>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {deals.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <div
              className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 transition-opacity group-hover:opacity-20"
              style={{
                background:
                  d.accent === "brand"
                    ? "var(--brand)"
                    : d.accent === "ink"
                      ? "var(--ink)"
                      : "var(--blue-accent)",
              }}
            />
            <span className="chip">{d.badge}</span>
            <h3 className="mt-3 text-xl font-black">{d.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d.subtitle}</p>
            <div className="mt-5 flex items-center justify-between border-t border-dashed border-border pt-4">
              <span className="text-xs text-muted-foreground">Code</span>
              <span className="rounded-lg bg-muted px-3 py-1 text-sm font-black tracking-wider">
                {d.code}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function DeliveryPromise() {
  const items = [
    { icon: Clock, title: "30-min guarantee", desc: "Or your next pizza is free. Yes, really." },
    {
      icon: Flame,
      title: "Straight from the oven",
      desc: "Insulated bags keep every slice steaming.",
    },
    { icon: ShieldCheck, title: "Contactless & safe", desc: "Tamper-proof seals on every order." },
    { icon: Leaf, title: "Real ingredients", desc: "No fillers, no shortcuts. Just good food." },
  ];
  return (
    <section className="relative overflow-hidden py-20" style={{ background: "var(--ink)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center text-white">
          <span className="chip !bg-white/10 !text-white">Our promise</span>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">Piping hot. Every single time.</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand">
                <it.icon className="h-5 w-5 text-brand-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-black">{it.title}</h3>
              <p className="mt-2 text-sm text-white/70">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <h2 className="text-3xl font-black sm:text-4xl">Loved by 100k+ pizza people</h2>
        <p className="mt-2 text-muted-foreground">Don't take our word for it.</p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {reviews.map((r, i) => (
          <motion.blockquote
            key={r.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: r.rating }).map((_, k) => (
                <Star key={k} className="h-4 w-4 fill-amber-400 stroke-amber-400" />
              ))}
            </div>
            <p className="mt-4 text-base leading-relaxed">"{r.quote}"</p>
            <footer className="mt-4 text-sm font-semibold">— {r.name}</footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}

function AppDownload() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div
        className="relative overflow-hidden rounded-[2.5rem] border border-border p-8 md:p-14"
        style={{ background: "linear-gradient(135deg, var(--brand), oklch(0.5 0.24 20))" }}
      >
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="text-white">
            <span className="chip !bg-white/15 !text-white">
              <Smartphone className="h-3.5 w-3.5" /> Get the app
            </span>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
              Order faster.
              <br />
              Track live. Earn slices.
            </h2>
            <p className="mt-3 max-w-md text-white/90">
              Every 5th order is on us. Exclusive app-only deals every week.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="flex h-12 items-center gap-2 rounded-full bg-black px-5 text-sm font-semibold text-white"
              >
                <span className="text-xl">🍎</span> App Store
              </a>
              <a
                href="#"
                className="flex h-12 items-center gap-2 rounded-full bg-black px-5 text-sm font-semibold text-white"
              >
                <span className="text-xl">▶</span> Google Play
              </a>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[16rem] leading-none opacity-90">
              🍕
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
