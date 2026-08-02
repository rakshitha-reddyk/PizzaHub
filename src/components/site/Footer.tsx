import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-brand text-brand-foreground font-black">
              P
            </div>
            <span className="text-lg font-black">
              Pizza<span className="text-brand">Hub</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Hand-stretched dough, wood-fired ovens, delivered in under 30 minutes.
          </p>
          <div className="mt-4 flex gap-2">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social"
                className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-muted"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {[
          {
            title: "Explore",
            links: [
              ["Menu", "/menu"],
              ["Deals", "/deals"],
              ["Customize", "/customize"],
              ["Track order", "/track"],
            ] as const,
          },
          {
            title: "Company",
            links: [
              ["About", "#"],
              ["Careers", "#"],
              ["Press", "#"],
              ["Franchise", "#"],
            ] as const,
          },
          {
            title: "Help",
            links: [
              ["Contact", "#"],
              ["FAQ", "#"],
              ["Privacy", "#"],
              ["Terms", "#"],
            ] as const,
          },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-bold">{col.title}</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {col.links.map(([label, to]) => (
                <li key={label}>
                  {to.startsWith("/") ? (
                    <Link
                      to={to as "/" | "/menu" | "/deals" | "/track" | "/customize"}
                      className="hover:text-foreground"
                    >
                      {label}
                    </Link>
                  ) : (
                    <a href={to} className="hover:text-foreground">
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} PizzaHub. All rights reserved.</span>
          <span>Made with 🍕 in New York</span>
        </div>
      </div>
    </footer>
  );
}
