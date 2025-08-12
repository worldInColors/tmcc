import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/farms/components/sidebar/SideBar";
import { SearchBar } from "@/features/farms/components/SearchBar";
import { FilterDrawer } from "@/features/farms/components/FilterDrawer";
import { FarmsList } from "@/features/farms/components/FarmsList";

function FarmsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-6">
        <SidebarTrigger className="mb-4 cursor-pointer" />
        <div>
          <h1 className="text-3xl font-bold text-white">Farm Archives</h1>
          <p className="text-gray-300 tracking-wide mt-2 max-w-2xl">
            Explore a vast collection of Minecraft farm designs, from simple
            starter farms to complex automated systems. Find inspiration and
            schematics for your next build.
          </p>
          <div className="flex items-end gap-2">
            <SearchBar />
            <FilterDrawer />
          </div>
          <FarmsList />
        </div>
      </main>
    </SidebarProvider>
  );
}

export default FarmsPage;
