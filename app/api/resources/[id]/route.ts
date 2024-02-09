import { runIndexer } from "@/utils/azure/searchDocuments";
import { deleteBlob } from "@/utils/azure/storageBlob";
import getResponse from "@/utils/getResponse";
import {  PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export async function DELETE(req: Request, { params }: any) {
  const { id } = params;
  console.log(id)
  const resource = await prisma.resource.findUnique({
    where: {
      id: +id
    },
    include: {
      course: true
    }
  })
  if (!resource) return getResponse(null, 'resource not found', 404);
  const containerName = resource.course.azure_container_name
  console.log(resource.path)
  await deleteBlob(containerName, resource.path)
  await runIndexer(resource.course.azure_indexer_name)
  await prisma.resource.delete({
    where: {
      id: +id
    }
  })
  return getResponse(null, 'success delete resource', 200);
}