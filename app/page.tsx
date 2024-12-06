"use client";

import { PopupChatButton } from "@/entities/ui/popup-chat/ui/popup-chat";
import { AddExpensePopup } from "@/entities/ui/products/add-expense-popup/ui/add-expense-popup";
import { CustomerSatisfactionChart } from "@/entities/ui/products/customer-satisfaction/ui/customer-satisfaction";
import { ExpensesTab } from "@/entities/ui/products/expenses-tab/ui/expenses-tab";
import { FinanceBalanceCard } from "@/entities/ui/products/finance-balance-card/ui/finance-balance-card";
import RecentActivityTab from "@/entities/ui/products/recent-activities/ui/recent-activities";
import { TopPerformingCategories } from "@/entities/ui/products/top-product-categories/ui/top-product-categories";
import { RecentActivity } from "@/entities/ui/products/upcoming-tasks/ui/upcoming-tasks";
import Header from "@/features/ui/header/ui/header";
import Sidebar from "@/features/ui/sidebar/ui/sidebar";
import { PopupProvider, usePopup } from "@/shared/ui/contexts/popup-providers";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const pageRef = useRef(null);
  const { t } = useTranslation("dashboard");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("h1", {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.from(".metrics-card", {
        opacity: 0,
        y: 50,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.from(".dashboard-card", {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <PopupProvider>
      <div
        className="flex h-screen overflow-hidden bg-gradient-to-br from-white to-gray-50"
        ref={pageRef}
      >
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Header />
          <main className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-primary">
              {t("heading")}
            </h1>
            <div className="w-full grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <FinanceBalanceCard />
              <CustomerSatisfactionChart />
              <TopPerformingCategories />
              <RecentActivityTab />
            </div>
            <div className="w-full mt-8">
              <ExpensesTab />
            </div>
          </main>
        </div>
        <AddExpensePopup />
        <PopupChatButton />
      </div>
    </PopupProvider>
  );
}
