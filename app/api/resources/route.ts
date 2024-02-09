import { User } from "@/types";
import getResponse from "@/utils/getResponse";
import getSessionUser from "@/utils/session";
import { PrismaClient } from "@prisma/client";
import { upload } from "@/utils/azure/storageBlob";
import { runIndexer } from "@/utils/azure/searchDocuments";

const prisma = new PrismaClient()
export async function POST(req: Request) {
  const data = await req.formData();
  const course_id = data.get('course_id') as string;
  const name = data.get('name') as string;
  const description = data.get('description') as string;
  const file: File | null = data.get('file') as unknown as File;
  const session = await getSessionUser() as User  
  // const user_id = 3
  if (!session || !course_id || !file || !name) return getResponse(null, ' please fill all data!', 400);
  if (file.size > 10000000) return getResponse(null, 'file size limit 10mb', 400);
  const date = new Date()
  
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const course = await prisma.course.findUnique({
    where: {
      id: +course_id
    },
  })
  if (!course) return getResponse(null, 'course not found', 404);

  const containerName = course.azure_container_name
  const { request } = await upload(containerName, `${date.getTime()}-${file.name}`, buffer)
  await runIndexer(course.azure_indexer_name)
  const resource = await prisma.resource.create({
    data: {
      name,
      description:description,
      path: request.url,
      course_id: +course_id,
      user_id: session?.id as number   
    }
  })


  return getResponse(resource, 'success get create new resource', 200);
}