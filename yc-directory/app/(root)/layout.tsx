import Navbar from "@/components/Navbar";
import { LayoutProps } from "../layout";

export default function RootLayout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main className={``}>{children}</main>
    </>
  );
}
