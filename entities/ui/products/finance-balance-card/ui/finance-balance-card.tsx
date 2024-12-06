"use client";

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
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useTranslation } from "react-i18next";

const data = [
  { name: "Jan", balance: 5000 },
  { name: "Feb", balance: 7000 },
  { name: "Mar", balance: 6500 },
  { name: "Apr", balance: 8000 },
  { name: "May", balance: 9500 },
  { name: "Jun", balance: 11000 },
];

export function FinanceBalanceCard() {
  const { t } = useTranslation("finance_balance"); // Use the `finance_balance` namespace

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50">
      <CardHeader>
        <CardTitle>{t("financeBalance")}</CardTitle>
        <CardDescription>{t("balanceDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{t("currentBalance")}: $11,000</div>
        <p className="text-xs text-green-500">{t("lastMonthChange")}</p>
        <ChartContainer
          config={{
            balance: {
              label: t("currentBalance"),
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[200px] mt-4"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorBalance)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
