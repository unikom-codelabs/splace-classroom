import TabsCourse from "@/app/course/[id]/tabs";
import Layout from "@/layouts/layout";

export default function CourseLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Layout>
			<section className="w-full min-h-[90vh]">
				<div className="max-w-5xl mx-auto mt-5 mb-10">
					<TabsCourse/>
					<div className="flex justify-center flex-1 items-stretch mx-2 md:mx-0">
						{children}
					</div>
				</div>
			</section>
		</Layout>
		
	);
}
