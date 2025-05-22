// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),
     tailwindcss(),
  ],
});



// "use client";
// import { usePathname } from "next/navigation";
// import MainLayout from "@/components/layout/MainLayout";
// import DashboardLayout from "./DashboardLayout";
// import PublicLayout from "./PublicLayout";

// const dashboardLayout = ["/client-base", "/customer-service", "/faq", "/getting-started", "/landingpage", "/policy-guidelines", "/welcome-agents"];
// const sidebarRoutes = ["/leave-management", "/salary-management", "/shift-management", "/profile-details","/add-employee","","/visa-application", "/visa-req"];

// function getLayoutType(pathname: string): "sidebar" | "dashboard" | "public" {
//   if (sidebarRoutes.some((route) => pathname.startsWith(route))) return "sidebar";
//   if (dashboardLayout.some((route) => pathname.startsWith(route))) return "dashboard";
//   return "public";
// }

// export default function LayoutSelector({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const layoutType = getLayoutType(pathname);

//   switch (layoutType) {
//     case "sidebar":
//       return <MainLayout>{children}</MainLayout>;
//     case "dashboard":
//       return <DashboardLayout>{children}</DashboardLayout>;
//     default:
//       return <>{children}</>;
//   }
// }
