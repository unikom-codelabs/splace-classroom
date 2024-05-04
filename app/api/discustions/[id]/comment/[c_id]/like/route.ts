import getResponse from "@/utils/getResponse";
import getSessionUser from "@/utils/session";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(req: Request, { params }: any) {
  const { id, c_id } = params;
  const user = await getSessionUser();
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
  const likedComment = await prisma.likeComments.findFirst({
    where: {
      comment_id: +c_id,
      user_id: user?.id || 1,
    },
  });
  if (likedComment) {
    await prisma.likeComments.delete({
      where: {
        id: likedComment.id,
      },
    });
    return getResponse(commentReply, "Comment unliked", 200);
  }
  await prisma.likeComments.create({
    data: {
      comment_id: +c_id,
      user_id: user?.id || 1,
    },
  });
  return getResponse(commentReply, "Comment liked", 200);
}

