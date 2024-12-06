"use client";

import { PopupChatButton } from "@/entities/ui/popup-chat/ui/popup-chat";
import APIHealthStatus from "@/entities/ui/technical/api-health-bar/ui/api-health-bar";
import KnowledgeBaseSearch from "@/entities/ui/technical/knowledge-base-research/ui/knowledge-base-research";
import RecentTickets from "@/entities/ui/technical/recent-tickets/ui/recent-tickets";
import { SystemPerformanceMonitor } from "@/entities/ui/technical/system-performance/ui/system-performance";
import Header from "@/features/ui/header/ui/header";
import Sidebar from "@/features/ui/sidebar/ui/sidebar";

export default function TechDashboard() {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-white to-gray-50">
      {" "}
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header />
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-primary">
            Technical Dashboard
          </h1>
          <div className="w-full grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            <APIHealthStatus />
            <SystemPerformanceMonitor />
          </div>
          <div className="w-full mt-8">
            <RecentTickets />
          </div>
        </main>
      </div>
      <PopupChatButton />
    </div>
  );
}