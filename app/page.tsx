import MetricsCards from "@/entities/ui/metrics-card/ui/metrics-card";
import RecentActivities from "@/entities/ui/recent-activities/ui/recent-activities";
import UpcomingTasks from "@/entities/ui/upcoming-tasks/ui/upcoming-tasks";
import Header from "@/features/ui/header/ui/header";
import Sidebar from "@/features/ui/sidebar/ui/sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header />
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-primary">Dashboard</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <MetricsCards />
          </div>
          <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
            <RecentActivities />
            <UpcomingTasks />
            {/* <TopClients /> */}
          </div>
        </main>
      </div>
    </div>
  );
}
