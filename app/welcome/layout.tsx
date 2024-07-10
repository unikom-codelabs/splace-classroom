import Footer from "@/components/auth/footer";
import HeaderHomepage from "@/components/auth/header";
import { Header } from "@/components/header";
import { siteConfig } from "@/config/site";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-screen h-screen">
      <Header siteConfig={siteConfig} />
      {children}
      <Footer siteConfig={siteConfig} />
    </section>
  );
}
