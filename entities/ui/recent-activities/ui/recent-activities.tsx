"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
  { action: "New lead created", user: "John Doe", time: "2 hours ago" },
  { action: "Deal closed", user: "Jane Smith", time: "4 hours ago" },
  { action: "Meeting scheduled", user: "Mike Johnson", time: "Yesterday" },
  { action: "Email sent", user: "Sarah Brown", time: "Yesterday" },
];

export default function RecentActivities() {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".activity-item", {
        opacity: 0,
        x: -50,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <Card className="col-span-1 dashboard-card" ref={cardRef}>
      <CardHeader>
        <CardTitle className="text-primary">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li
              key={index}
              className="flex justify-between items-center activity-item"
            >
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.user}</p>
              </div>
              <span className="text-sm text-muted-foreground">
                {activity.time}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
