import { PrismaClient } from "@prisma/client";
import getResponse from "@/utils/getResponse";
const prisma = new PrismaClient();
import getSessionUser from "@/utils/session";


export async function POST(req: Request, { params }: any) {
    const user = await getSessionUser();
    // const user = {id: 1}
    const { group_id } = params;
    const {name, position, tags, deadline, description} = await req.json();
    const task = await prisma.task.create({
        data: {
            name,
            position,
            tags,
            deadline,
            description,
            group_id: +group_id
        }
    })

    await prisma.userTask.create({
        data: {
            user_id: user.id,
            task_id: task.id
        }
    })
    return getResponse(task, "Create task success", 200);
}


export async function GET(req: Request, { params }: any) {
    const { group_id } = params;
    const task = await prisma.task.findMany({
        where: {
            group_id: +group_id
        }
    })
    return getResponse(task, "Get task success", 200);
}
