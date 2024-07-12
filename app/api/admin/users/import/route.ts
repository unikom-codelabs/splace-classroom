import getResponse from '@/utils/getResponse';
import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt-ts';
import { readXlsx } from '@/utils/xlsx';
const prisma = new PrismaClient()

export async function POST(req: Request) {
  const data = await req.formData();
  const file: any = data.get('file') as any;
  if (!file) return getResponse(null, 'Please upload a file', 400);
  if (file.size > 10000000) return getResponse(null, 'File size limit 10mb', 400);
  const datas :any = await readXlsx(file)
  await prisma.user.createMany({
    data: datas.map((item: any) => ({
      ...item,
      username:`${item.username}`,
      password:hashSync('password')
  }))})
  return  getResponse(datas,"success Import User",200)
}