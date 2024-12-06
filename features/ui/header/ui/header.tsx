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
  const { t, i18n } = useTranslation("common_language");
  const currentLanguage = i18n.language;

  const handleLanguageChange = (lang: "en" | "ru") => {
    i18n.changeLanguage(lang);
  };

  if (!i18n.isInitialized) {
    return <div>Loading...</div>;
  }

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
            {/* Use full key path */}
            <DropdownMenuLabel>{t("selectLanguage")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleLanguageChange("en")}>
              <span className={currentLanguage === "en" ? "font-bold" : ""}>
                EN
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange("ru")}>
              <span className={currentLanguage === "ru" ? "font-bold" : ""}>
                RU
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
            {/* Add translation keys for other labels */}
            <DropdownMenuLabel>{t("myAccount")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{t("profile")}</DropdownMenuItem>
            <DropdownMenuItem>{t("settings")}</DropdownMenuItem>
            <DropdownMenuItem>{t("logout")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
