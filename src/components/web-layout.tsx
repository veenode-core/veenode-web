import { type ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";

interface WebLayoutProps {
  children: ReactNode;
}

export default function WebLayout({ children }: WebLayoutProps) {
  return (
    <div className="bg-white min-h-screen font-sans antialiased text-[#1a1a1a] overflow-x-hidden">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
