"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/badge";

type PerformanceData = {
  time: string;
  cpu: number;
  memory: number;
  requests: number;
};

const initialData: PerformanceData[] = Array(20)
  .fill(null)
  .map((_, i) => ({
    time: `${i}s ago`,
    cpu: Math.floor(Math.random() * 100),
    memory: Math.floor(Math.random() * 100),
    requests: Math.floor(Math.random() * 1000),
  }));

export function SystemPerformanceMonitor() {
  const { t } = useTranslation("system_performance");
  const [data, setData] = useState<PerformanceData[]>(initialData);
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

    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [
          ...prevData.slice(1),
          {
            time: "0s ago",
            cpu: Math.floor(Math.random() * 100),
            memory: Math.floor(Math.random() * 100),
            requests: Math.floor(Math.random() * 1000),
          },
        ];
        return newData.map((d, i) => ({ ...d, time: `${i}s ago` }));
      });
    }, 100000);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, []);

  const getStatusColor = (value: number, threshold: number) => {
    return value > threshold
      ? "bg-red-100 text-red-800"
      : "bg-green-100 text-green-800";
  };

  return (
    <Card ref={cardRef}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="cpu"
                stroke="#8884d8"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="memory"
                stroke="#82ca9d"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="requests"
                stroke="#ffc658"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {t("cpuUsage")}
            </p>
            <div className="flex items-baseline space-x-2">
              <p className="text-2xl font-bold">{data[data.length - 1].cpu}%</p>
              <Badge className={getStatusColor(data[data.length - 1].cpu, 80)}>
                {data[data.length - 1].cpu > 80
                  ? t("status.high")
                  : t("status.normal")}
              </Badge>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {t("memoryUsage")}
            </p>
            <div className="flex items-baseline space-x-2">
              <p className="text-2xl font-bold">
                {data[data.length - 1].memory}%
              </p>
              <Badge
                className={getStatusColor(data[data.length - 1].memory, 90)}
              >
                {data[data.length - 1].memory > 90
                  ? t("status.high")
                  : t("status.normal")}
              </Badge>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {t("requestsPerSecond")}
            </p>
            <p className="text-2xl font-bold">
              {data[data.length - 1].requests}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
