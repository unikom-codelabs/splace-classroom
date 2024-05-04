import getResponse from '@/utils/getResponse';
import getSessionUser from '@/utils/session';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
export async function PUT(req: Request, { params }: any) {
  const { id,c_id } = params;
  const { text } = await req.json();
  if (!text) return getResponse(null, 'text is required', 400);
  const comment = await prisma.comments.findFirst({
    where: {
      id: +c_id,
    },
  });
  if (!comment) return getResponse(null, "Comment not found", 404);
  const user = await getSessionUser();
  const commentUpdated = await prisma.comments.update({
    where: {
      id: +c_id,
    },
    data: {
      content: text,
    }
  });

  return getResponse(commentUpdated, "Comment updated", 200);
}

export async function DELETE(req: Request, { params }: any) {
  const { id, c_id } = params;
  const comment = await prisma.comments.findFirst({
    where: {
      id: +c_id,
    },
  });
  if (!comment) return getResponse(null, "Comment not found", 404);
  const user = await getSessionUser();
  if (comment.user_id !== user?.id) {
    return getResponse(null, "Unauthorized", 401);
  }
  await prisma.comments.delete({
    where: {
      id: +c_id,
    }
  });
  return getResponse(comment, "Comment deleted", 200);
}