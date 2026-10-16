import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CreditCard, Heart, MapPin, ShoppingBag, User } from "lucide-react";
import { useState, useEffect } from "react";
// @ts-ignore
import { supabase } from "../supabaseClient";

export const Route = createFileRoute("/account")({
  validateSearch: (search: Record<string, unknown>): { tab?: Tab } => {
    return {
      tab: (search.tab as Tab) || undefined,
    };
  },
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
  const search = Route.useSearch();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>(search.tab || "profile");

 
  useEffect(() => {
    if (search.tab) {
      setTab(search.tab);
    }
  }, [search.tab]);

  useEffect(() => {
    
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: any } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

   
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="text-center py-20 font-semibold text-muted-foreground">
        Loading account... 🍕
      </div>
    );
  }

  
  if (!user) {
    return <AuthGate />;
  }

  const fullName = user.user_metadata?.full_name || "PizzaHub Customer";
  const email = user.email;
  const avatarLetter = fullName.charAt(0).toUpperCase();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand text-xl font-black text-brand-foreground overflow-hidden relative">
            {user.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt="Profile"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : null}
            <span className="absolute">{avatarLetter}</span>
          </div>
          <div>
            <h1 className="text-2xl font-black">{fullName}</h1>
            <p className="text-sm text-muted-foreground">{email} · Member since 2024</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-muted transition cursor-pointer"
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
              <Field label="Full name" value={fullName} />
              <Field label="Email" value={email} />
              <Field label="Phone number" value="+1 (555) 342-8891" />
              <Field label="Member status" value="VIP Pizza Lover 🍕" />
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

function AuthGate() {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/account`,
      },
    });
    if (error) {
      console.error("Error logging in with Google:", error.message);
    }
  };

  return (
    <div className="mx-auto grid max-w-md px-4 py-16 sm:px-6">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-soft text-center">
        <div className="text-6xl mb-4">🍕</div>
        <h1 className="text-2xl font-black">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground mb-6">
          Sign in with your Google account to see your orders and profile.
        </p>
        <button
          onClick={handleGoogleLogin}
          className="h-11 w-full rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          Sign in with Google
        </button>
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
        readOnly
        className="mt-1 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10"
      />
    </div>
  );
}
