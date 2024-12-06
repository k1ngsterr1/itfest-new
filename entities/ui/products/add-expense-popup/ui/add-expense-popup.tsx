"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePopup } from "@/shared/ui/contexts/popup-providers";
import { useTranslation } from "react-i18next";

export function AddExpensePopup() {
  const popupRef = useRef<HTMLDivElement>(null);
  const { isPopupOpen, closePopup } = usePopup();
  const { t } = useTranslation("add_expenses");

  useEffect(() => {
    if (isPopupOpen) {
      gsap.to(popupRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(popupRef.current, {
        autoAlpha: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [isPopupOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const category = formData.get("category") as string;
    const amount = parseFloat(formData.get("amount") as string);
    if (category && amount) {
      console.log("New Expense:", { category, amount });
      closePopup();
    }
  };

  return (
    <div
      ref={popupRef}
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${
        isPopupOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{t("addExpense")}</h2>
          <Button variant="ghost" size="icon" onClick={closePopup}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Category Selector */}
            <div>
              <Label htmlFor="category">{t("category")}</Label>
              <Select name="category">
                <SelectTrigger>
                  <SelectValue placeholder={t("selectCategory")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rent">{t("rent")}</SelectItem>
                  <SelectItem value="Utilities">{t("utilities")}</SelectItem>
                  <SelectItem value="Groceries">{t("groceries")}</SelectItem>
                  <SelectItem value="Transportation">
                    {t("transportation")}
                  </SelectItem>
                  <SelectItem value="Entertainment">
                    {t("entertainment")}
                  </SelectItem>
                  <SelectItem value="Insurance">{t("insurance")}</SelectItem>
                  <SelectItem value="Other">{t("other")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amount Input */}
            <div>
              <Label htmlFor="amount">{t("amount")}</Label>
              <Input
                type="number"
                id="amount"
                name="amount"
                placeholder={t("enterAmount")}
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#FC6502] hover:bg-[#e55a00]"
            >
              {t("addExpenseButton")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
