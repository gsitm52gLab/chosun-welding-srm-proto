"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ClipboardList, FilePlus, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/customer/home", label: "홈", icon: Home },
  { href: "/customer/orders", label: "주문 목록", icon: ClipboardList },
  { href: "/customer/orders/new", label: "주문요청 작성", icon: FilePlus },
  { href: "/customer/company", label: "업체정보", icon: Building2 },
];

export function CustomerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-60 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center gap-2 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <span className="text-sm font-bold text-primary-foreground">CS</span>
        </div>
        <div>
          <p className="text-sm font-bold text-sidebar-foreground">조선선강 SRM</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border px-4 py-4">
        <p className="text-xs text-sidebar-foreground/50">v1.0.0</p>
      </div>
    </aside>
  );
}
