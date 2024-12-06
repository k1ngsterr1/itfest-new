"use client";

import { PopupChatButton } from "@/entities/ui/popup-chat/ui/popup-chat";
import Header from "@/features/ui/header/ui/header";
import Sidebar from "@/features/ui/sidebar/ui/sidebar";
import { AIBusinessReportGenerator } from "@/widgets/ai-screen-report-generator/ui/ai-screen-report-generator";
import { AIBusinessIntelligenceDashboard } from "@/widgets/ui/ai-screen-report";

export default function Report() {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-white to-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header />
        <AIBusinessIntelligenceDashboard />
      </div>
      <PopupChatButton />
    </div>
  );
}
