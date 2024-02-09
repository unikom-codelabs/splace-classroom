import { getChatCompletions } from '@/utils/azure/openAi';
import getResponse from '@/utils/getResponse';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
export async function POST(req: Request,{params}:any) {
  const { message } = await req.json() 
  const course = await prisma.course.findUnique({
    where: {
      id: +params.id
    },
  })
  if (!course) return getResponse(null, 'course not found', 404);
  const indexName = course.azure_index_name;
  const response = await getChatCompletions(indexName, message);
  return getResponse(response.choices[0].message, 'success', 200);
}