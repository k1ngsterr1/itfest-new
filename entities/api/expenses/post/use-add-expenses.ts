import { useState } from "react";

type ExpenseData = {
  category: string;
  amount: number;
  description?: string;
};

export function useAddExpense() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addExpense = async (
    expenseData: ExpenseData,
    onSuccess?: (response: any) => void,
    onError?: (error: any) => void
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://itfest-backend-production.up.railway.app/api/company/add-expense",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(expenseData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add expense");
      }

      const result = await response.json();
      console.log("Expense added successfully:", result);

      // Invoke the success callback if provided
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err: any) {
      console.error("Error adding expense:", err);
      setError(err.message || "An error occurred");

      // Invoke the error callback if provided
      if (onError) {
        onError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return { addExpense, loading, error };
}
