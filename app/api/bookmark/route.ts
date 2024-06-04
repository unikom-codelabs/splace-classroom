import getResponse from "@/utils/getResponse";
import getSessionUser from "@/utils/session";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(req: Request, { params }: any) {
  const user = await getSessionUser();
  const bookmark = await prisma.discustionBookmark.findMany({
    where: {
      user_id: user?.id || 1,
    },
    include: {
      discustions: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
            },
          },
          discustion_bookmark: true,
          comments: {
            select: {
              id: true,
              content: true,
              created_at: true,
              like_comments: true,
              replies: {
                select: {
                  id: true,
                  content: true,
                  created_at: true,
                  user: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          votes: true,
        },
      },
    },
  });
  return getResponse(bookmark, "Discustion bookmarked", 200);
}
