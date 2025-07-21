type Category = {
  name: string;
  subCategories: string[];
};
import { ChevronDown } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Menu items.
const categories: Category[] = [
  {
    name: "Monsters",
    subCategories: [
      "overworld-monsters",
      "nether-monsters",
      "end-monsters",
      "fortress-monsters",
      "slime",
      "gold-and-bartering",
    ],
  },
  {
    name: "Creatures",
    subCategories: [
      "overworld-monsters",
      "nether-monsters",
      "end-monsters",
      "fortress-monsters",
      "slime",
      "gold-and-bartering",
    ],
  },
  {
    name: "Agriculture",
    subCategories: [
      "overworld-monsters",
      "nether-monsters",
      "end-monsters",
      "fortress-monsters",
      "slime",
      "gold-and-bartering",
    ],
  },
  {
    name: "Blocks & Items",
    subCategories: [
      "overworld-monsters",
      "nether-monsters",
      "end-monsters",
      "fortress-monsters",
      "slime",
      "gold-and-bartering",
    ],
  },
  {
    name: "Item processing",
    subCategories: [
      "overworld-monsters",
      "nether-monsters",
      "end-monsters",
      "fortress-monsters",
      "slime",
      "gold-and-bartering",
    ],
  },
  {
    name: "Infrastructure",
    subCategories: [
      "overworld-monsters",
      "nether-monsters",
      "end-monsters",
      "fortress-monsters",
      "slime",
      "gold-and-bartering",
    ],
  },
  {
    name: "Niche and Legacy",
    subCategories: [
      "overworld-monsters",
      "nether-monsters",
      "end-monsters",
      "fortress-monsters",
      "slime",
      "gold-and-bartering",
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="mt-[81px]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <Collapsible
                  key={category.name}
                  defaultOpen={category.name === "Monsters"}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        {category.name}
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {category.subCategories.map((subCategory) => (
                          <SidebarMenuSubItem key={subCategory}>
                            <SidebarMenuSubButton
                              isActive={subCategory === "overworld-monsters"}
                            >
                              {subCategory}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
