import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";

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
        <span>Create</span>
      </Link>

      <form action={signOutAction}>
        <button type="submit">Logout</button>
      </form>

      <Link href={`/user/${session.id}`}>
        <span>
          Welcome,{" "}
          <span className="text-cyan-400 text-shadow-sm">
            {session.user.name}
          </span>
        </span>
      </Link>
    </>
  ) : (
    <form action={signInAction}>
      <button type="submit">Login</button>
    </form>
  );
};
