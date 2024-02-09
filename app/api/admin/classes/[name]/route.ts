import getResponse from "@/utils/getResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request ,{params}: any) {
  const { class: name } = await req.json();
  if (name === params.name) return getResponse(null, 'Old class name is same new class name', 400);
  if (!name) return getResponse(null, 'name is required', 400);
  const classes = await prisma.classes.findUnique({
    where: {
      name
    }
  })
  if(classes) return getResponse(null, 'class already exist', 400 );
  const classesCreated = await prisma.classes.update({
    where:{name: params.name},
    data: {
      name
    }
  })

  return getResponse(classesCreated, 'success get all class', 200);
}

export async function DELETE(req: Request ,{params}: any) {

  const classes = await prisma.classes.delete({
    where: {
      name: params.name
    }
  })
  return getResponse(classes, 'success get all class', 200);
}