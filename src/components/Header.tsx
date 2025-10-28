import Image from "next/image";
import Link from "next/link";
import Dock from "./ui/Dock";
import UserAvatar from "./UserAvatar";
import HeaderNav from "./HeaderNav";

async function Header() {
  return (
    <>
      <nav className="hidden md:flex p-4 pt-1 pb-1 pl-0 bg-card border-b border-border items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="font-bold text-2xl transition-colors duration-300 hover:text-muted-foreground"
          >
            <Image
              src="/archive_logo.webp"
              width={250}
              height={83}
              alt="Logo"
              priority
              className="h-auto w-auto"
            />
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <HeaderNav />
          <UserAvatar />
        </div>
      </nav>

      <Dock />
    </>
  );
}

export default Header;
