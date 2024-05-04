import getResponse from '@/utils/getResponse';
import getSessionUser from '@/utils/session';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
export async function POST(req: Request, { params }: any) {
  const { id } = params;
  const user = await getSessionUser();
  const discustion = await prisma.discustions.findFirst({
    where: {
      id: +id,
    },
  });
  if (!discustion) return getResponse(null, 'Discustion not found', 404);
  const bookmark = await prisma.discustionBookmark.findFirst({
    where: {
      discustion_id: +id,
      user_id: user?.id || 1,
    },
  });
  if (bookmark) {
    await prisma.discustionBookmark.delete({
      where: {
        id: bookmark.id,
      },
    });
    return getResponse(bookmark, 'Discustion bookmark removed', 200);
  }
  await prisma.discustionBookmark.create({
    data: {
      discustion_id: +id,
      user_id: user?.id || 1,
    },
  });
  return getResponse(discustion, 'Discustion bookmarked', 200);

}

