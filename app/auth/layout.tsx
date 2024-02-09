import Layout from "@/layouts/layout";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="w-screen h-screen">
			{children}
		</section>
	);
}
