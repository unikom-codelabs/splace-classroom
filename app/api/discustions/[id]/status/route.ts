import getResponse from '@/utils/getResponse';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
export async function PUT(req: Request, { params }: any) {
  const { id } = params;
  const { status } = await req.json();
  if (!status) return getResponse(null, 'status is required', 400);
  if (["DRAFT", "PUBLISHED", "ARCHIVED"].includes(status) === false) {
    return getResponse(400, "Invalid status");
  }
  const discustion = await prisma.discustions.update({
    where: {
      id: +id,
    },
    data: {
      type: status,
    },
  });
  return getResponse(discustion, "Discustion status updated", 200);
}