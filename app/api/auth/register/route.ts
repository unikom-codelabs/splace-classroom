import getResponse from '@/utils/getResponse';
import {hashSync} from 'bcrypt-ts';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export const dynamic = 'force-dynamic'
export  async function POST(req:  Request, ) {
  const { username, password }: any = await req.json()
  if (!username || !password) return getResponse(null, 'Username and Password is Required', 400);
  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })
  if(user) return getResponse(null, 'User Already Exist', 404);
  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashSync(password, 10)
    }
  })
  return getResponse(newUser, 'User Created Successfully', 200);
}