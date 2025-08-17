import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default async function Navbar() {
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans animate-top">
      <nav className="flex-between ">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          <UserStatus />
        </div>
      </nav>
    </header>
  );
}

const UserStatus = async () => {
  const session = await auth();

  const signInAction = async () => {
    "use server";
    await signIn("github");
  };

  const signOutAction = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };

  return session ? (
    <>
      <Link href="/startup/create">
        <span className="max-sm: hidden">Create</span>
        <BadgePlus className="size-6 sm:hidden" />
      </Link>

      <form action={signOutAction}>
        <span className="max-sm: hidden">Logout</span>
        <LogOut className="size-6 sm:hidden text-red-500" />
      </form>

      <Link href={`/user/${session.id}`}>
        <Avatar className="size-10">
          <AvatarImage
            src={session?.user?.image || ""}
            alt={session?.user?.name || "avatar"}
          />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
      </Link>
    </>
  ) : (
    <form action={signInAction}>
      <button type="submit">Login</button>
    </form>
  );
};
