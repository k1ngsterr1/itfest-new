"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";

const clients = [
  { name: "Acme Corp", revenue: "$50,000", avatar: "/avatars/acme.png" },
  { name: "Globex", revenue: "$45,000", avatar: "/avatars/globex.png" },
  { name: "Soylent Corp", revenue: "$40,000", avatar: "/avatars/soylent.png" },
  { name: "Initech", revenue: "$35,000", avatar: "/avatars/initech.png" },
];

export default function TopClients() {
  const { t } = useTranslation(); // Initialize translation hook

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>{t("topClients")}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {clients.map((client, index) => (
            <li key={index} className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={client.avatar} alt={client.name} />
                <AvatarFallback>{client.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{client.name}</p>
                <p className="text-sm text-muted-foreground">
                  {t("revenue")}: {client.revenue}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
