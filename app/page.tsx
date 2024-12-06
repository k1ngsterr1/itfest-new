"use client";

import { CustomerSatisfactionChart } from "@/entities/ui/customer-satisfaction/ui/customer-satisfaction";
import { FinanceBalanceCard } from "@/entities/ui/finance-balance-card/ui/finance-balance-card";
import MetricsCards from "@/entities/ui/metrics-card/ui/metrics-card";
import RecentActivities from "@/entities/ui/recent-activities/ui/recent-activities";
import TopClients from "@/entities/ui/top-clients/ui/top-clients";
import { TopProductsCard } from "@/entities/ui/top-products-card/ui/top-products-card";
import UpcomingTasks from "@/entities/ui/upcoming-tasks/ui/upcoming-tasks";
import Header from "@/features/ui/header/ui/header";
import Sidebar from "@/features/ui/sidebar/ui/sidebar";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function Home() {
  const pageRef = useRef(null);

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
    <div className="flex h-screen overflow-hidden" ref={pageRef}>
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header />
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-primary">Dashboard</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <FinanceBalanceCard />
            <TopProductsCard />
            <CustomerSatisfactionChart />
          </div>
          <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3"></div>
        </main>
      </div>
    </div>
  );
}
