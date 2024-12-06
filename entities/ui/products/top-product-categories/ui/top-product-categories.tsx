"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

const data = [
  { category: "Electronics", revenue: 120000 },
  { category: "Clothing", revenue: 95000 },
  { category: "Home & Garden", revenue: 85000 },
  { category: "Books", revenue: 65000 },
  { category: "Sports", revenue: 55000 },
];

export function TopPerformingCategories() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(chartRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".bar", {
        scaleY: 0,
        transformOrigin: "bottom",
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
    }, chartRef);

    return () => ctx.revert();
  }, []);

  return (
    <Card
      className="overflow-hidden bg-gradient-to-br from-white to-gray-50"
      ref={chartRef}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-gray-800">
          Top Categories
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-gray-700"
        >
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis
                type="number"
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <YAxis dataKey="category" type="category" width={100} />
              <Tooltip
                formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                contentStyle={{
                  backgroundColor: "white",
                  borderColor: "#FC6502",
                }}
                labelStyle={{ color: "#FC6502" }}
              />
              <Bar
                dataKey="revenue"
                fill="#FC6502"
                className="bar"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
