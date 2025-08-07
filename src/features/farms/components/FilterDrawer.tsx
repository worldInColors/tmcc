"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FilterIcon } from "lucide-react";

interface FilterDrawerProps {
  onApplyFilters?: () => void;
  onCancelFilters?: () => void;
}

interface FilterProps {
  value?: string;
  onChange?: (value: string) => void;
}

function FilterDrawer({ onApplyFilters, onCancelFilters }: FilterDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="p-2 pb-3 rounded-md hover:bg-muted transition mt-[-4px] cursor-pointer">
          <FilterIcon size={32} />
        </button>
      </DrawerTrigger>
      <DrawerContent className="">
        <DrawerHeader>
          <DrawerTitle>Filter Farms</DrawerTitle>
          <DrawerDescription>Set your filter options below</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 flex flex-col sm:flex-row gap-4">
          <VersionFilter />
          <DifficultyFilter />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <button
              onClick={onApplyFilters}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition cursor-pointer"
            >
              Apply Filters
            </button>
          </DrawerClose>
          <DrawerClose asChild>
            <button
              onClick={onCancelFilters}
              className="px-4 py-2 rounded-md border border-border hover:bg-muted transition cursor-pointer"
            >
              Cancel
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function VersionFilter({ value, onChange }: FilterProps) {
  const versions: string[] = [
    "1.13",
    "1.13.1",
    "1.13.2",
    "1.14",
    "1.14.1",
    "1.14.2",
    "1.14.3",
    "1.14.4",
    "1.15",
    "1.15.1",
    "1.15.2",
    "1.16",
    "1.16.1",
    "1.16.2",
    "1.16.3",
    "1.16.4",
    "1.16.5",
    "1.17",
    "1.17.1",
    "1.18",
    "1.18.1",
    "1.18.2",
    "1.19",
    "1.19.1",
    "1.19.2",
    "1.19.3",
    "1.19.4",
    "1.20",
    "1.20.1",
    "1.20.2",
    "1.20.3",
    "1.20.4",
    "1.20.5",
    "1.20.6",
    "1.21",
    "1.21.1",
    "1.21.2",
    "1.21.3",
    "1.21.4",
  ];

  return (
    <div className="space-y-2 flex-1">
      <Label>Minecraft Version</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a Version" />
        </SelectTrigger>
        <SelectContent className="max-h-[200px]">
          <SelectItem value="any">Any Version</SelectItem>
          {versions.map((version: string) => (
            <SelectItem key={version} value={version}>
              {version}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function DifficultyFilter({ value, onChange }: FilterProps) {
  const difficulties: string[] = ["Simple", "Intermediate", "Advanced"];

  return (
    <div className="space-y-2 flex-1">
      <Label>Difficulty Level</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Difficulty" />
        </SelectTrigger>
        <SelectContent className="max-h-[200px]">
          <SelectItem value="any">Any Difficulty</SelectItem>
          {difficulties.map((difficulty: string) => (
            <SelectItem key={difficulty} value={difficulty}>
              {difficulty}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export { FilterDrawer };
