import getResponse from "@/utils/getResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: any) {
  const { username, name, class_id, role } = await req.json();
  const { username: oldUsername } = params;
  
  if (!username || !role || !name) return getResponse(null, ' Please Fill all Inputs', 400);
  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })
  if (user && username !== oldUsername) return getResponse(null, 'username isAlready Exsist', 400);
  const userUpdated = await prisma.user.update({
    where: {
      username: oldUsername
    },
    data: {
      username,
      name,
      class_id,
      role
    }
  })
  return getResponse(userUpdated, 'success update user', 200);
}

export async function DELETE(req: Request ,{params}: any) {
  const user = await prisma.user.delete({
    where: {
      username: params.username
    }
  })
  return getResponse(user, 'success delete user', 200);
}