"use client";

import { Bell, User, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import spark from "@/assets/logo.svg";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handleLanguageChange = (lang: "en" | "ru") => {
    i18n.changeLanguage(lang); // Change language in i18next
  };

  return (
    <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
      <div className="font-semibold text-lg text-primary">
        <div className="flex items-center gap-2 text-2xl">
          <Image src={spark.src} alt="Spark Logo" width={48} height={48} />{" "}
          Spark CRM
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5 text-primary" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5 text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Select Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
              <span className={currentLanguage === "en" ? "font-bold" : ""}>
                English
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange("ru")}>
              <span className={currentLanguage === "ru" ? "font-bold" : ""}>
                Русский
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5 text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
