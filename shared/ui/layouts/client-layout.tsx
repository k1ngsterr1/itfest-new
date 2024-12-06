import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import reactQueryClient from "../api/query-client";
interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <QueryClientProvider client={reactQueryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default ClientLayout;
