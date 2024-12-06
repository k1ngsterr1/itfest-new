"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@radix-ui/react-checkbox";

const tasks = [
  { title: "Follow up with Client A", date: "Today" },
  { title: "Prepare proposal for Client B", date: "Tomorrow" },
  { title: "Review Q2 sales targets", date: "Jun 15" },
  { title: "Team meeting", date: "Jun 16" },
];

export default function UpcomingTasks() {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".task-item", {
        opacity: 0,
        x: 50,
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
        <CardTitle className="text-primary">Upcoming Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <li key={index} className="flex items-center space-x-2 task-item">
              <Checkbox id={`task-${index}`} />
              <label
                htmlFor={`task-${index}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {task.title}
              </label>
              <span className="ml-auto text-sm text-muted-foreground">
                {task.date}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
