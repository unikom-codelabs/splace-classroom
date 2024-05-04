import getResponse from "@/utils/getResponse";
import getSessionUser from "@/utils/session";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(req: Request, { params }: any) {
	const user = await getSessionUser();
	const bookmark = await prisma.discustionBookmark.findFirst({
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
        },
      },
    },
	});
	return getResponse(bookmark, "Discustion bookmarked", 200);
}
