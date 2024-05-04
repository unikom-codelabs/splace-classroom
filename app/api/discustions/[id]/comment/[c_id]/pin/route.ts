import getResponse from "@/utils/getResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(req: Request, { params }: any) {
  const { id, c_id } = params;
  
  const comment = await prisma.comments.findFirst({
    where: {
      id: +c_id,
    },
  });
  if (!comment) return getResponse(null, "Comment not found", 404);
  const commentReply = await prisma.comments.findFirst({
    where: {
      id: +c_id,
    },
  });
  if (!commentReply) return getResponse(null, "Comment not found", 404);
  await prisma.comments.update({
    where: {
      id: +c_id,
    },
    data: {
      is_pin: !commentReply.is_pin,
    },
  });
  return getResponse(commentReply, "Comment updated", 200);
}
