import { AnimatedCollapsibleMenuItem } from "./AnimatedCollapisableMenuItem";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";

// Menu items
const categories = [
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
      "passive-creatures",
      "neutral-creatures",
      "tameable-creatures",
      "aquatic-creatures",
    ],
  },
  {
    name: "Agriculture",
    subCategories: [
      "crop-farms",
      "tree-farms",
      "flower-farms",
      "mushroom-farms",
    ],
  },
  {
    name: "Blocks & Items",
    subCategories: [
      "building-blocks",
      "redstone-items",
      "tools-weapons",
      "decorative-blocks",
    ],
  },
  {
    name: "Item processing",
    subCategories: [
      "smelting-farms",
      "brewing-stations",
      "enchanting-setups",
      "storage-systems",
    ],
  },
  {
    name: "Infrastructure",
    subCategories: [
      "transportation",
      "power-generation",
      "lighting-systems",
      "security-systems",
    ],
  },
  {
    name: "Niche and Legacy",
    subCategories: [
      "experimental-farms",
      "legacy-designs",
      "novelty-builds",
      "challenge-farms",
    ],
  },
];

function AppSidebar() {
  return (
    <Sidebar className="mt-[71.5px] mb-[282px]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <AnimatedCollapsibleMenuItem
                  key={category.name}
                  category={category}
                  isDefaultOpen={category.name === "Monsters"}
                  activeSubCategory="overworld-monsters"
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
export { AppSidebar };
