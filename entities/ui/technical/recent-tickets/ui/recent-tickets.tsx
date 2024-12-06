"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

type Ticket = {
  id: string;
  issue: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved";
  logs: string[];
};

const recentTickets: Ticket[] = [
  {
    id: "TechCRM-1234",
    issue: "Dashboard loading slow",
    priority: "High",
    status: "Open",
    logs: [
      "2023-06-05 10:00:00 - Ticket opened",
      "2023-06-05 10:15:00 - Assigned to DevOps team",
      "2023-06-05 11:30:00 - Initial investigation complete, identified potential database bottleneck",
    ],
  },
  {
    id: "TechCRM-1235",
    issue: "User authentication failing",
    priority: "High",
    status: "In Progress",
    logs: [
      "2023-06-04 14:00:00 - Ticket opened",
      "2023-06-04 14:30:00 - Assigned to Security team",
      "2023-06-04 16:00:00 - Initial investigation complete, suspect OAuth token expiration issue",
      "2023-06-05 09:00:00 - Implementing fix for token refresh",
    ],
  },
  {
    id: "TechCRM-1236",
    issue: "New feature request: Export to PDF",
    priority: "Medium",
    status: "Open",
    logs: [
      "2023-06-03 11:00:00 - Ticket opened",
      "2023-06-03 13:00:00 - Assigned to Product team for review",
    ],
  },
  {
    id: "TechCRM-1237",
    issue: "Data visualization bug",
    priority: "Medium",
    status: "In Progress",
    logs: [
      "2023-06-02 09:00:00 - Ticket opened",
      "2023-06-02 10:00:00 - Assigned to Frontend team",
      "2023-06-02 14:00:00 - Bug reproduced, working on fix",
      "2023-06-03 11:00:00 - Fix implemented, pending QA",
    ],
  },
  {
    id: "TechCRM-1238",
    issue: "Performance optimization for large datasets",
    priority: "Low",
    status: "Open",
    logs: [
      "2023-06-01 16:00:00 - Ticket opened",
      "2023-06-02 10:00:00 - Assigned to Backend team for analysis",
    ],
  },
];

export default function RecentTickets() {
  const tableRef = useRef(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(tableRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from("tbody tr", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
      });
    }, tableRef);

    return () => ctx.revert();
  }, []);

  return (
    <Card className="overflow-hidden" ref={tableRef}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-techcrm-primary">
          TechCRM Recent Tickets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{ticket.issue}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      ticket.priority === "High"
                        ? "destructive"
                        : ticket.priority === "Medium"
                        ? "warning"
                        : "default"
                    }
                  >
                    {ticket.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={ticket.status === "Open" ? "outline" : "secondary"}
                  >
                    {ticket.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        View Logs
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>
                          Ticket Logs: {selectedTicket?.id}
                        </DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                        {selectedTicket?.logs.map((log, index) => (
                          <p key={index} className="text-sm">
                            {log}
                          </p>
                        ))}
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
