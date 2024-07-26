import { runIndexer } from "@/utils/azure/searchDocuments";
import { deleteBlob } from "@/utils/azure/storageBlob";
import getResponse from "@/utils/getResponse";
import {  PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export async function POST(req: Request, { params }: any) {
  const { id } = params;
  const resource = await prisma.resource.findUnique({
    where: {
      id: +id
    },
   
  })
  if (!resource) return getResponse(null, 'resource not found', 404);
   const formData = new FormData();
   formData.append("file_url", resource.path);
   formData.append("course_id", resource.course_id.toString());
   formData.append("module_id", resource.id.toString());
  formData.append(
  "callback_url",

  `${process.env.NEXT_PUBLIC_API_URL}/resources/update-status`
  );
   await fetch(process.env.GENERATE_UPLOAD_URL as string, {
		method: "POST",
		body: formData,
   });
  return getResponse(resource, 'success retry rag', 200);
}