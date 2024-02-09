import { deleteDatasource, deleteIndexer } from "@/utils/azure/searchDocuments";
import { deleteContainer } from "@/utils/azure/storageBlob";
import getResponse from "@/utils/getResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request ,{params}: any) {
  const { course: name ,class_ids,instructor_id} = await req.json();
  const { id } = params
  const updatedCourse = await prisma.course.update({
    where: {
      id: +id
    },
    data: {
      name
    }
  })
  await prisma.user_course.deleteMany({
    where: {
      course_id: +id
    }
  })
  const users = await prisma.user.findMany({
    where: {
      class_id: {
        in: class_ids.map((item: any) => +item)
      }
    },
    select: {
      id: true
    }
  })
  await prisma.user_course.createMany({
    data: users.map(item => ({
      user_id: item.id,
      course_id: +id
    }))
  })
  await prisma.user_course.create({
    data: {
      user_id: +instructor_id,
      course_id: +id
    }
  
  })
  return getResponse(updatedCourse, 'success update course', 200);
}


export async function POST(req: Request ,{params}: any) {
  const { ids } = await req.json();
  const { id } = params
  
  const course = await prisma.course.findUnique({
    where: {
      id:+id
    }
  })
  if (!course) return getResponse(null, 'course not found', 400);
  await prisma.user_course.createMany({
    data: ids.map((item: any) => ({
      user_id: +item,
      course_id: +id
    }))
  })

  return getResponse(course, 'success get all class', 200);
}

export async function DELETE(req: Request, { params }: any) {
  const course = await prisma.course.findUnique({
    where: {
      id: +params.id
    }
  })
  if (!course) return getResponse(null, 'course not found', 400);
  
  await deleteIndexer(course.azure_indexer_name)
  await deleteIndexer(course.azure_index_name)
  await deleteDatasource(course.azure_datasource_name)
  await deleteContainer(course.azure_container_name)

  await prisma.user_course.deleteMany({
    where: {
      course_id: +params.id
    }
  })
  const courseDeleted = await prisma.course.delete({
    where: {
      id: +params.id
    }
  })
  return getResponse(course, 'success get all class', 200);
}