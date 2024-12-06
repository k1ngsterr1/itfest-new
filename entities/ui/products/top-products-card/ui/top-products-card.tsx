"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const data = [
  {
    name: "T-shirt",
    value: 146,
  },
  {
    name: "Pants",
    value: 109,
  },
  {
    name: "Jacket",
    value: 75,
  },
];

export function TopProductsCard() {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bar-animate", {
        scaleY: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        transformOrigin: "bottom",
      });
      gsap.from(".value-animate", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.3,
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <Card
      className="overflow-hidden bg-gradient-to-br from-white to-gray-50"
      ref={cardRef}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Top 3 Product</h3>
          <div className="flex items-center space-x-2">
            <Select defaultValue="daily">
              <SelectTrigger className="w-[100px] bg-white border-none shadow-sm">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
              barGap={12}
            >
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 14, fontWeight: 500 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                dx={-10}
              />
              <Bar
                dataKey="value"
                radius={[6, 6, 0, 0]}
                className="bar-animate"
                barSize={50}
              >
                {data.map((entry, index) => (
                  <g key={`cell-${index}`}>
                    <path
                      d={`M 0,0 h ${entry.value} v 50 h -${entry.value} z`}
                      fill="#FC6502"
                    />
                    <text
                      x={25}
                      y={-25}
                      fill="#FC6502"
                      className="text-3xl font-bold value-animate"
                      textAnchor="middle"
                    >
                      {entry.value}
                    </text>
                  </g>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
