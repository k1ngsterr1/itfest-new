import { useState } from "react";

type EmployeeData = {
  name: string;
  companyName: string;
  salary: number;
  image?: string;
};

export function useAddEmployee() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addEmployee = async (
    newEmployee: EmployeeData,
    avatarFile: File | null,
    onSuccess: (employee: EmployeeData) => void
  ) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      // Append file if available
      if (avatarFile) {
        console.log("Uploading avatar file:", avatarFile);
        formData.append("image", avatarFile);
      }

      // Append other fields
      formData.append("name", newEmployee.name);
      formData.append("companyName", newEmployee.companyName);
      formData.append("salary", newEmployee.salary.toString());

      // Make API request
      const response = await fetch(
        "https://itfest-backend-production.up.railway.app/api/employers/add-employee",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      const result = await response.json();
      console.log("Server response:", result);

      // Generate final image URL
      const imageUrl = result.image?.startsWith("https://res.cloudinary.com")
        ? result.image
        : result.image?.startsWith("http")
        ? result.image
        : `https://itfest-backend-production.up.railway.app${result.image}`;

      console.log("Final image URL:", imageUrl);

      // Success callback
      onSuccess({ ...result, image: imageUrl });
    } catch (err: any) {
      console.error("Error adding employee:", err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { addEmployee, loading, error };
}
