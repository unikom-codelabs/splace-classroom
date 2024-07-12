import getResponse from "@/utils/getResponse";
import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt-ts";
import { readXlsx } from "@/utils/xlsx";
const prisma = new PrismaClient();

export async function POST(req: Request) {
	const data = await req.formData();
	const file: any = data.get("file") as any;
	if (!file) return getResponse(null, "Please upload a file", 400);
	if (file.size > 10000000)
		return getResponse(null, "File size limit 10mb", 400);
  const datas: any = await readXlsx(file);
  console.log(datas)
  let [courses, users] = await Promise.all([
    await prisma.course.findMany({ where: { name: { in: datas.map((item: any) => (item['mata kuliah'])) } } }),
    await prisma.user.findMany({ where: { username: { in: datas.map((item: any) => (`${item['username']}`)) } } }),

  ])
  const alreadyUserCourse = await prisma.user_course.findMany({
		where: {
			AND: [
				{
					user_id: { in: users.map(item=>item.id)},
        },
        {
          course_id: { in: courses.map(item => item.id) }
        }
			],
		},
  });
users = users.filter(
	(user) => !alreadyUserCourse.some((item) => item.user_id === user.id)
);
	await prisma.user_course.createMany({
    data: users.map(user => {
      return courses.map(course => ({
        course_id: course.id,
        user_id:user.id
      }))[0]
    })as any
	});
	return getResponse(datas, "success Import User", 200);
}
