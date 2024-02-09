import getResponse from '@/utils/getResponse';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function GET(req: Request, response: Response) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name')
  const filter: any = {}

  if (name) filter.name = name
  
  const classes = await prisma.classes.findMany({where: {...filter}})
  return getResponse(classes, 'success get all class', 200);
}

export async function POST(req: Request ) {
  const { class:name } = await req.json();
  if (!name) return getResponse(null, 'name is required', 400);
  const classes = await prisma.classes.findUnique({
    where: {
      name
    }
  })
  if(classes) return getResponse(null, 'class already exist', 400 );
  const classesCreated = await prisma.classes.create({
    data: {
      name
    }
  })

  return getResponse(classesCreated, 'success get all class', 200);
}
