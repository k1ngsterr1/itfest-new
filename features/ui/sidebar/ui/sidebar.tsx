"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Users,
  Briefcase,
  Calendar,
  Settings,
  Bot,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useTranslation } from "react-i18next";

const sidebarItems = [
  { name: "Staff", href: "/staff", icon: Users },
  { name: "Products", href: "/products", icon: ShoppingBag },
  { name: "Business Dashboard", href: "/", icon: Briefcase },
  { name: "Technical Performance", href: "/technical", icon: BarChart },
  { name: "Staff", href: "/staff", icon: Users },
  { name: "AI Report", href: "/report", icon: Bot },
  { name: "Expenses", href: "/expenses", icon: Calendar },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const sidebarRef = useRef(null);
  const { t } = useTranslation("sidebar");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sidebar-item", {
        opacity: 0,
        x: -50,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sidebarRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="hidden border-r w-1/6 bg-gray-100/40 lg:block dark:bg-gray-800/40"
      ref={sidebarRef}
    >
      <ScrollArea className="flex h-full flex-col">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-primary">
              {t("menu")}
            </h2>
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <Button
                  key={item.key}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start sidebar-item",
                    pathname === item.href &&
                      "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {t(`items.${item.key}`)}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
