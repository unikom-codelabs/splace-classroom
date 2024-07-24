import { getChatCompletions, getChatResponse } from "@/utils/azure/openAi";
import getResponse from '@/utils/getResponse';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
export async function POST(req: Request,{params}:any) {
  const { messages,query } = await req.json() 
  const course = await prisma.course.findUnique({
    where: {
      id: +params.id
    },
  })
  if (!course) return getResponse(null, 'course not found', 404);
  const response: any = await getChatResponse(course.id, messages, query);
  let resources:any[] = []
  if (response.hasOwnProperty('module_ids'))
		resources = await prisma.resource.findMany({
			where: {
				id: {
					in: response.module_ids,
				},
			},
		});
  return getResponse({message:response.message,resources:resources}, 'success', 200);
}