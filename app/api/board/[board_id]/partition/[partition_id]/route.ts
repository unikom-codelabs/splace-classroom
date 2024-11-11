import getResponse from "@/utils/getResponse";
import getSessionUser from "@/utils/session";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function DELETE(req:Request,{ params }: any) {
    const { partition_id } = params;
    const boardPartition = await prisma.boardPartition.findFirst({
      where: {
        id: +partition_id,
      },
    });
    if (!boardPartition) return getResponse(null, 'Partition not found', 404);
    await prisma.boardPartition.delete({
      where: {
        id: +partition_id,
      }
    });
    return getResponse(boardPartition, "Partition deleted", 200);
}

export async function PUT(req:Request,{ params }: any) {
  const { partition_id } = params;
  const {isOwner} = await req.json();
  const boardPartition = await prisma.boardPartition.findFirst({
    where: {
      id: +partition_id,
    },
  });
  if (!boardPartition) return getResponse(null, 'Partition not found', 404);
  const partitionUpdated = await prisma.boardPartition.update({
    where: {
      id: +partition_id,
    },
    data: {
      isOwner
    }
  });
  return getResponse(partitionUpdated, "Partition updated", 200);
}

