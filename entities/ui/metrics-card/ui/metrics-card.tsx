"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Briefcase, TrendingUp } from "lucide-react";

const metrics = [
  {
    title: "Total Revenue",
    value: "$54,231",
    icon: DollarSign,
    change: "+12%",
  },
  { title: "New Leads", value: "235", icon: Users, change: "+5%" },
  { title: "Active Deals", value: "48", icon: Briefcase, change: "-2%" },
  {
    title: "Conversion Rate",
    value: "12.3%",
    icon: TrendingUp,
    change: "+2.5%",
  },
];

export default function MetricsCards() {
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".metrics-card", {
        opacity: 0,
        y: 50,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, cardsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardsRef}>
      {metrics.map((metric) => (
        <Card key={metric.title} className="metrics-card ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              {metric.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
