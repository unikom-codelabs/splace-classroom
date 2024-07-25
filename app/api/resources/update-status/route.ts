import getResponse from "@/utils/getResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export async function POST(req: Request) {
  const { status, message, module_id, course_id } = await req.json();
  const resource = await prisma.resource.update({
		where: {
			id: +module_id,
		},
		data: {
			status_rag: status as any,
			error_message: message,
		},
  });
  return getResponse(resource, 'success update status', 200);
}