import getResponse from "@/utils/getResponse";
import getSessionUser from "@/utils/session";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(req: Request, { params }: any) {
	const { id, c_id } = params;
	const { text } = await req.json();
	if (!text) return getResponse(null, "text is required", 400);
	const comment = await prisma.comments.findFirst({
		where: {
			id: +c_id,
		},
	});
	if (!comment) return getResponse(null, "Comment not found", 404);
	const user = await getSessionUser();
  const commentReply = await prisma.comments.create({
    data: {
      discustion_id: +id,
      user_id: user?.id || 1,
      reply_id: +c_id,
      content: text,
    },
  });
	return getResponse(commentReply, "Comment updated", 200);
}
