"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

type APIEndpoint = {
  name: string;
  status: "Operational" | "Degraded" | "Down";
  responseTime: number;
};

const apiEndpoints: APIEndpoint[] = [
  { name: "Authentication API", status: "Operational", responseTime: 120 },
  { name: "Employee API", status: "Degraded", responseTime: 350 },
  { name: "Profit API", status: "Operational", responseTime: 180 },
  { name: "Notification API", status: "Down", responseTime: 0 },
  { name: "Website API", status: "Operational", responseTime: 90 },
];

const getStatusIcon = (status: APIEndpoint["status"]) => {
  switch (status) {
    case "Operational":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "Degraded":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case "Down":
      return <XCircle className="h-4 w-4 text-red-500" />;
  }
};

const getStatusColor = (status: APIEndpoint["status"]) => {
  switch (status) {
    case "Operational":
      return "bg-green-100 text-green-800";
    case "Degraded":
      return "bg-yellow-100 text-yellow-800";
    case "Down":
      return "bg-red-100 text-red-800";
  }
};

export default function APIHealthStatus() {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".api-endpoint", {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <Card className="overflow-hidden" ref={cardRef}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-techcrm-primary">
          API Health Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {apiEndpoints.map((endpoint, index) => (
            <div
              key={index}
              className="api-endpoint flex items-center justify-between p-3 bg-muted rounded-md"
            >
              <div className="flex items-center space-x-2">
                {getStatusIcon(endpoint.status)}
                <span className="font-medium">{endpoint.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(endpoint.status)}>
                  {endpoint.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {endpoint.status !== "Down"
                    ? `${endpoint.responseTime}ms`
                    : "N/A"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
