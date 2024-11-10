import getResponse from "@/utils/getResponse";
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
      return getResponse(boardPartition, "Get Partition", 200);
    }

    const boardPartition = await prisma.boardPartition.findFirst({
      where: {
        id: +board_id
      }
    })
    if (!boardPartition) return getResponse(null, 'Partition not found', 404);
    return getResponse(boardPartition, "Get Partition", 200);
}