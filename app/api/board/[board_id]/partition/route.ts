import getResponse from "@/utils/getResponse";
import getSessionUser from "@/utils/session";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function GET(req: Request, { params }: any) {
    const { board_id } = params;
    if (!board_id) {
      const boardPartition = await prisma.boardPartition.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true
            }
          }
        }
      });
    }

    const boardPartition = await prisma.boardPartition.findFirst({
      where: {
        id: +board_id
      }
    })
    if (!boardPartition) return getResponse(null, 'Partition not found', 404);
    return getResponse(boardPartition, "Partition", 200);
}