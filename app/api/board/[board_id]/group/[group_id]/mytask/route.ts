import { PrismaClient } from "@prisma/client";
import getResponse from "@/utils/getResponse";
const prisma = new PrismaClient();
import getSessionUser from "@/utils/session";


export async function GET(req: Request, { params }: any) {
    const user = await getSessionUser();
    const { board_id, group_id } = params;
    // const user = {id: 1}
    const task = await prisma.userTask.findMany({
        where: {
            user_id: user.id,
            task: { 
                group_id: +group_id  
            },
            user: { 
               boardPartition: {
                    some: {
                        board_id: +board_id  
                    }
               } 
            }
        },
        include: {
            task: true
        }
    })
    return getResponse(task, "Get my task success", 200);
}
