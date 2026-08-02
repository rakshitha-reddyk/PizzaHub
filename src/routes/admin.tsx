import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { DollarSign, ShoppingBag, TrendingUp, Users } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — PizzaHub" },
      { name: "description", content: "Manage products, orders, coupons and analytics." },
    ],
  }),
  component: AdminPage,
});

const stats = [
  { label: "Revenue today", value: "$3,842", delta: "+12.4%", icon: DollarSign },
  { label: "Orders", value: "218", delta: "+8.1%", icon: ShoppingBag },
  { label: "Customers", value: "1,204", delta: "+3.2%", icon: Users },
  { label: "Avg. order", value: "$28.4", delta: "+1.9%", icon: TrendingUp },
];
const revenueBars = [42, 65, 55, 78, 60, 92, 88, 74, 85, 96, 70, 82, 90, 100];
const recentOrders = [
  { id: "#A2039", customer: "Alex Doe", items: 3, total: 34.5, status: "Preparing" },
  { id: "#A2038", customer: "Priya S.", items: 2, total: 22.9, status: "Out for delivery" },
  { id: "#A2037", customer: "Marcus T.", items: 5, total: 58.4, status: "Delivered" },
  { id: "#A2036", customer: "Ana R.", items: 1, total: 12.9, status: "Delivered" },
  { id: "#A2035", customer: "Jordan K.", items: 4, total: 46.0, status: "Delivered" },
];

function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="chip">Internal</span>
          <h1 className="mt-2 text-4xl font-black sm:text-5xl">Dashboard</h1>
        </div>
        <div className="flex gap-2">
          <button className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-muted">
            Export
          </button>
          <button className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground">
            + New product
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {s.label}
              </span>
              <div className="grid h-9 w-9 place-items-center rounded-full bg-brand/10">
                <s.icon className="h-4 w-4 text-brand" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-black">{s.value}</p>
            <p className="mt-1 text-xs font-semibold text-emerald-600">{s.delta} vs last week</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black">Revenue · Last 14 days</h2>
            <span className="chip">+12.4%</span>
          </div>
          <div className="mt-6 flex h-56 items-end gap-2">
            {revenueBars.map((v, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${v}%` }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                className="flex-1 rounded-t-lg bg-brand/80 hover:bg-brand"
                style={{ minHeight: 4 }}
                title={`Day ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-lg font-black">Top categories</h2>
          <ul className="mt-4 space-y-3">
            {[
              { name: "Pizza", pct: 68 },
              { name: "Sides", pct: 18 },
              { name: "Drinks", pct: 9 },
              { name: "Desserts", pct: 5 },
            ].map((c) => (
              <li key={c.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{c.name}</span>
                  <span className="text-muted-foreground">{c.pct}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${c.pct}%` }}
                    className="h-full rounded-full bg-brand"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black">Recent orders</h2>
          <button className="text-sm font-semibold text-brand hover:underline">View all →</button>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="pb-3">Order</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Items</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentOrders.map((o) => (
                <tr key={o.id}>
                  <td className="py-3 font-bold">{o.id}</td>
                  <td className="py-3">{o.customer}</td>
                  <td className="py-3">{o.items}</td>
                  <td className="py-3 font-semibold">${o.total.toFixed(2)}</td>
                  <td className="py-3">
                    <span className="chip">{o.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
