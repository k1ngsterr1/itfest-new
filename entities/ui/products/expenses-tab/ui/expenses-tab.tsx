"use client";

import { useEffect, useRef, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePopup } from "@/shared/ui/contexts/popup-providers";
import { useTranslation } from "react-i18next";

const initialData = [
  { category: "Rent", amount: 1500 },
  { category: "Utilities", amount: 300 },
  { category: "Groceries", amount: 400 },
  { category: "Transportation", amount: 200 },
  { category: "Entertainment", amount: 150 },
  { category: "Insurance", amount: 250 },
];

export function ExpensesTab() {
  const [timeFrame, setTimeFrame] = useState("monthly");
  const { openPopup } = usePopup();
  const [data, setData] = useState(initialData);
  const chartRef = useRef(null);
  const { t } = useTranslation("expenses_tab");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(chartRef.current, {
        opacity: 0,
        y: 20,
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
        <CardTitle className="text-xl font-bold text-gray-800">
          {t("expensesOverview")}
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Select defaultValue={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={t("selectTimeframe")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">{t("weekly")}</SelectItem>
              <SelectItem value="monthly">{t("monthly")}</SelectItem>
              <SelectItem value="yearly">{t("yearly")}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={openPopup}>
            {t("addExpense")}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderColor: "#FC6502",
                }}
                labelStyle={{ color: "#FC6502" }}
              />
              <Bar dataKey="amount" fill="#FC6502" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">{t("totalExpenses")}</h3>
          <p className="text-2xl font-bold text-[#FC6502]">
            ${data.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
