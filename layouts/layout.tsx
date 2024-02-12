"use client"
import { Header } from "@/components/header";
import Sidebar from "@/components/sidebar";
import { useState } from "react";

export default function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
	return (
    <div className="relative">
      <div className="h-[10vh] sticky top-0 z-[51] ">
        <Header open={open} toggle={toggle}/>
      </div>
      <div className="flex min-h-[90vh] relative">
        <Sidebar open={open} toggle={toggle}/>
        <main className="dark:bg-gray-900  h-auto flex-grow bg-purple-500">
          {children}
        </main>
      </div>
    </div>
      
	);
}
