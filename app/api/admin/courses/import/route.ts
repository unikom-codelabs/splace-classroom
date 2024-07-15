import getResponse from "@/utils/getResponse";
import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt-ts";
import { readXlsx } from "@/utils/xlsx";
import { craateDatasource, createIndex, createIndexer } from "@/utils/azure/searchDocuments";
import { createContainer } from "@/utils/azure/storageBlob";
const prisma = new PrismaClient();

export async function POST(req: Request) {
	const data = await req.formData();
	const file: any = data.get("file") as any;
	if (!file) return getResponse(null, "Please upload a file", 400);
	if (file.size > 10000000)
		return getResponse(null, "File size limit 10mb", 400);
  let datas: any = await readXlsx(file);
  
  const courseNames = datas.map((item: any) => item["Mata Kuliah"]);
  const courses = await prisma.course.findMany({
    where: {
      name: {
        in: courseNames
      }
    }
  });
  const courseNamesExist = courses.map((course) => course.name);
  datas = datas.filter((item: any) => !courseNamesExist.includes(item["Mata Kuliah"]));
  
  await prisma.course.createMany({
    data: await Promise.all(datas.map(async (item: any) => {
      const name = item["Mata Kuliah"];
      const newName = name.split(" ").join("-");
      const indexName =
        `${new Date().getTime()}-${newName}-index`.toLowerCase();
      const containerName =
        `${new Date().getTime()}-${newName}-container`.toLowerCase();
      const dataSourceName =
        `${new Date().getTime()}-${newName}-datasource`.toLowerCase();
      const indexerName =
        `${new Date().getTime()}-${newName}-indexer`.toLowerCase();
      await createIndex(indexName);
      await createContainer(containerName);
      await craateDatasource(dataSourceName, containerName);
      await createIndexer(indexerName, dataSourceName, indexName);
  
      return {
			name: name,
			azure_index_name: indexName,
			azure_indexer_name: indexerName,
			azure_container_name: containerName,
			azure_datasource_name:dataSourceName
		};
    }))
  })
	return getResponse(datas, "success Import User", 200);
}
