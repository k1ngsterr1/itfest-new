"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const data = [
  { name: "satisfied", value: 65 }, // Keys should match translation keys
  { name: "neutral", value: 25 },
  { name: "unsatisfied", value: 10 },
];

const orangeColor = "#FC6502";
const COLORS = [orangeColor, "#FFB86C", "#FF8A4C"];

export function CustomerSatisfactionChart() {
  const chartRef = useRef(null);
  const { t } = useTranslation("customer_satisfaction");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(chartRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: "power3.out",
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
        <CardTitle className="text-lg md:text-2xl font-bold text-gray-800">
          {t("customerSatisfaction")}
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
        <div className="h-[200px] md:h-[300px] lg:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius="70%"
                fill={orangeColor}
                dataKey="value"
                label={({ name, percent }) =>
                  `${t(name)} ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [
                  `${value}%`,
                  t(`tooltipLegend.${name}`),
                ]}
              />
              <Legend
                formatter={(value) => t(value)}
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
