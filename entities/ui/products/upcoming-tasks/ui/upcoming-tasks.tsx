"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

export function RecentActivity() {
  const activities = [
    {
      type: "Outgoing",
      product: "Stone Black Jacket",
      price: "$1500",
      quantity: 3,
      time: "2 minutes ago",
      icon: <ArrowUp className="text-purple-500" />,
    },
    {
      type: "Incoming",
      product: "Capital Creme",
      price: "$1200",
      quantity: 1,
      time: "5 minutes ago",
      icon: <ArrowDown className="text-teal-500" />,
    },
  ];

  return (
    <Card className="w-full max-w-md rounded-lg bg-white shadow-md">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Recent Activity
        </CardTitle>
        <button className="text-gray-400 hover:text-gray-600">
          <ArrowUp className="w-5 h-5" />
        </button>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center gap-4">
            {/* Icon */}
            <div className="flex-none w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              {activity.icon}
            </div>
            {/* Info */}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {activity.type} products
              </p>
              <p className="text-xs text-gray-500">
                {activity.product} · Qty: {activity.quantity} · {activity.time}
              </p>
            </div>
            {/* Price */}
            <p className="flex-none text-sm font-semibold text-gray-800">
              {activity.price}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
