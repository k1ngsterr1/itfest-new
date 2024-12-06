"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { name: "Jan", balance: 5000 },
  { name: "Feb", balance: 7000 },
  { name: "Mar", balance: 6500 },
  { name: "Apr", balance: 8000 },
  { name: "May", balance: 9500 },
  { name: "Jun", balance: 11000 },
];

export function FinanceBalanceCard() {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "power3.out",
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <Card ref={cardRef}>
      <CardHeader>
        <CardTitle>Finance Balance</CardTitle>
        <CardDescription>Your balance over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$11,000</div>
        <p className="text-xs text-muted-foreground">+10% from last month</p>
        <div className="h-[200px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FC6502" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FC6502" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{ background: "#fff", border: "1px solid #ccc" }}
                labelStyle={{ color: "#333" }}
                itemStyle={{ color: "#FC6502" }}
              />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="#FC6502"
                fillOpacity={1}
                fill="url(#colorBalance)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
