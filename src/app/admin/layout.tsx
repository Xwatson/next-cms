'use client';

import AdminLayout from "@/components/layouts/AdminLayout";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";
import StyledComponentsRegistry from "@/components/AntdRegistry";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider>
        <AuthProvider>
          <AdminLayout>
            {children}
            <ThemeToggle />
          </AdminLayout>
        </AuthProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
