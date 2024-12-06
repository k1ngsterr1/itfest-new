"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  TicketCheck,
  UserPlus,
  AlertTriangle,
  Clock,
} from "lucide-react";

type Activity = {
  id: string;
  type: "message" | "ticket_update" | "new_customer" | "alert";
  content: string;
  timestamp: string;
  customer: string;
};

const activities: Activity[] = [
  {
    id: "1",
    type: "message",
    content: "New message from Acme Corp regarding API integration",
    timestamp: "2023-06-01T10:30:00",
    customer: "Acme Corp",
  },
  {
    id: "2",
    type: "ticket_update",
    content: 'Ticket T-1234 status changed to "Resolved"',
    timestamp: "2023-06-01T11:15:00",
    customer: "TechGiant",
  },
  {
    id: "3",
    type: "new_customer",
    content: "New customer onboarded: TechNova Solutions",
    timestamp: "2023-06-01T13:00:00",
    customer: "TechNova Solutions",
  },
];

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "message":
      return <MessageSquare className="h-4 w-4" />;
    case "ticket_update":
      return <TicketCheck className="h-4 w-4" />;
    case "new_customer":
      return <UserPlus className="h-4 w-4" />;
    case "alert":
      return <AlertTriangle className="h-4 w-4" />;
  }
};

const getActivityColor = (type: Activity["type"]) => {
  switch (type) {
    case "message":
      return "bg-blue-100 text-blue-800";
    case "ticket_update":
      return "bg-green-100 text-green-800";
    case "new_customer":
      return "bg-purple-100 text-purple-800";
    case "alert":
      return "bg-red-100 text-red-800";
  }
};

export default function RecentActivityTab() {
  const { t } = useTranslation("upcoming_tasks"); // Translation namespace
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".activity-item", {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <Card className="overflow-hidden" ref={cardRef}>
      <CardHeader>
        <CardTitle>{t("recentActivity")}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="activity-item flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
            >
              <Badge
                className={`p-1 ${getActivityColor(activity.type)}`}
                variant="secondary"
              >
                {getActivityIcon(activity.type)}
              </Badge>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">
                  {t(`activities.${activity.type}`)}: {activity.content}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">{activity.customer}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {t("minutesAgo", {
                      count: Math.round(
                        (Date.now() - new Date(activity.timestamp).getTime()) /
                          60000
                      ),
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
