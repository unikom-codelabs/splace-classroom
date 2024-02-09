import Layout from "@/layouts/layout";

export default function QuizLayout({
	children,
}: {
	children: React.ReactNode;
}) {
  return(
    <Layout>
      {children}
    </Layout>
  )
}