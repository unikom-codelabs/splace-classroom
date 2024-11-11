import { PrismaClient } from "@prisma/client";
import getResponse from "@/utils/getResponse";
const prisma = new PrismaClient();
import getSessionUser from "@/utils/session";


export async function GET(req: Request) {
    const user = await getSessionUser();
    // const user = {id: 1}
    const task = await prisma.userTask.findMany({
        where: {
            user_id: user.id
        },
        include: {
            task: true
        }
    })
    return getResponse(task, "Get my task success", 200);
}
