import getResponse from "@/utils/getResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function PUT(req: Request, { params }: any) {
  const { id } = params;
  const discustion = await prisma.discustions.findFirst({
    where: {
      id: +id,
    },
  });
  if (!discustion) return getResponse(null, "Discustion not found", 404);
  await prisma.discustions.update({
    where: {
      id: +id,
    },
    data: {
      shere_count: {
        increment: 1,
      },
    },
  });
  return getResponse(discustion, "Discustion shared", 200);
}
