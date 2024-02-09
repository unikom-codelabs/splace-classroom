import { clientIndex, clientIndexer, storageClient } from '@/config/azure';
import { craateDatasource, createIndex, createIndexer } from '@/utils/azure/searchDocuments';
import { createContainer } from '@/utils/azure/storageBlob';
import getResponse from '@/utils/getResponse';
import getSessionUser from '@/utils/session';
import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient()

export async function GET(req: Request, response: Response) {
  // const { id } = ;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (id) {
    const data:any[] = await prisma.$queryRaw`SELECT DISTINCT \`User\`.class_id,\`Course\`.name,\`User\`.Role,CASE WHEN \`User\`.Role = 'INSTRUCTOR' THEN \`User\`.id END AS instructor_id FROM \`Course\` JOIN \`User_course\` ON \`Course\`.id = \`User_course\`.course_id JOIN \`User\` ON \`User\`.id = \`User_course\`.user_id WHERE \`Course\`.id = ${id}`
    const result = data.map(item => ({
      name: item.name,
      role: item.Role,
      class_id: item.class_id,
      instructor_id: item.instructor_id && parseInt(item.instructor_id)
      })) 
    return getResponse(result, 'success get course', 200);
  }
 const result:any[] = await prisma.$queryRaw`
  SELECT \`Course\`.\`id\`,\`Course\`.\`name\`, COUNT(\`User\`.\`role\`) as \`student_count\`
  FROM \`Course\`
  JOIN \`User_course\` ON \`User_course\`.\`course_id\` = \`Course\`.\`id\`
  JOIN \`User\` ON \`User\`.\`id\` = \`User_course\`.\`user_id\`
  WHERE \`User\`.\`role\` = 'STUDENT'
  GROUP BY \`Course\`.\`id\`, \`User\`.\`role\`;
`;

const processedResult = result.map(row => ({
  name: row.name,
  id: row.id,
  "student count": Number(row.student_count)
}));
  return getResponse(processedResult, 'success get all courses', 200);
}

export async function POST(req: Request) {
  const { name, class_ids, instructor_id } = await req.json();
  if (!name|| !class_ids ||!instructor_id) return getResponse(null, 'please fill all inputs', 400);
  const userIds = (await prisma.user.findMany({
    where: {
      class_id: {
        in: class_ids
      }
    },
    select: {
      id: true
    }
  })).map(item=>item.id)
  
  const indexName = `${new Date().getTime()}-${name}-index`.toLowerCase()
  const containerName = `${new Date().getTime()}-${name}-container`.toLowerCase()
  const dataSourceName = `${new Date().getTime()}-${name}-datasource`.toLowerCase()
  const indexerName = `${new Date().getTime()}-${name}-indexer`.toLowerCase()
  
  await createIndex(indexName)
  await createContainer(containerName)
  await craateDatasource(dataSourceName,containerName) 
  await createIndexer(indexerName, dataSourceName, indexName)
  
  const courses = await prisma.course.create({
    data: {
      name,
      azure_container_name: containerName,
      azure_index_name: indexName,
      azure_indexer_name: indexerName,
      azure_datasource_name: dataSourceName
    }
  })
  await prisma.user_course.createMany({
    data: userIds.map(item=>({
      user_id: item,
      course_id: courses.id
    }))
  })
  await prisma.user_course.create({
    data: {
      user_id: +instructor_id,
      course_id: courses.id
    }
  })
  return getResponse(courses, 'success create course', 200);
}
