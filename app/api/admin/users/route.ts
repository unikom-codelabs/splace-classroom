import getResponse from '@/utils/getResponse';
import getSessionUser from '@/utils/session';
import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt-ts';
const prisma = new PrismaClient()

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filter:any = {}
  if(searchParams.get('username')) filter.username = searchParams.get('username')
  const users = await prisma.user.findMany({where:filter})
  return getResponse(users, 'success get all users', 200);
}

export async function POST(req: Request) {
  const { username, name, role,class_id}= await req.json()
  const isUserExist = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (isUserExist) return getResponse(null, 'username already exist', 400)
  const capitalName = name.charAt(0).toUpperCase() + name.slice(1)
  const user = await prisma.user.create({
    data: {
      username: username,
      name: capitalName,
      role: role,
      class_id: class_id ? +class_id : null,
      password: hashSync('password', 10),
    },
  });
  return getResponse(user, 'success get all users', 200);
}