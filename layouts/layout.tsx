import { Header } from "@/components/header";
import Sidebar from "@/components/sidebar";
import { MenuContext, MenuContextProvider } from "../app/context/MenuContext";
import { useContext } from "react";

export default function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
    <MenuContextProvider>
      <Header/>
      <div className="flex min-h-[90vh]">
        <Sidebar/>
        <main className="dark:bg-gray-900  h-auto flex-grow bg-purple-500">
          {children}
        </main>
      </div>
    </MenuContextProvider>
	);
}
