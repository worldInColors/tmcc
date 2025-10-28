import { auth, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import fs from "fs";
import path from "path";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { LogOut, Palette, User } from "lucide-react";

function fallbackTwoLetters(name: string) {
  return name.slice(0, 2).toUpperCase();
}

function pickRandomFileFromFolder(folderPath: string) {
  const files = fs.readdirSync(folderPath);
  if (files.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * files.length);
  return files[randomIndex];
}

export default async function UserAvatar() {
  const session = await auth();
  const name = session?.user.name || "User";
  let avatarSrc = session?.user.image;

  if (!avatarSrc) {
    const avatarsFolder = path.join(process.cwd(), "public", "avatars");
    const randomAvatar = pickRandomFileFromFolder(avatarsFolder);
    avatarSrc = randomAvatar ? `/avatars/${randomAvatar}` : undefined;
  }

  if (!session) {
    return (
      <Link href="/api/auth/signin">
        <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
            <AvatarImage src={avatarSrc} alt={name} />
            <AvatarFallback>{fallbackTwoLetters(name)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/designs/createDesign" className="cursor-pointer">
            <Palette className="mr-2 h-4 w-4" />
            <span>Create Design</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
