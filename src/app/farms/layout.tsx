import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-6">
        <SidebarTrigger className="mb-4 cursor-pointer" />
        {children}
      </main>
    </SidebarProvider>
  );
}
