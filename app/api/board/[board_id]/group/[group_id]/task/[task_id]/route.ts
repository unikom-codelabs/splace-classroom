import { PrismaClient } from "@prisma/client";
import getResponse from "@/utils/getResponse";
const prisma = new PrismaClient();


export async function PUT(req: Request, { params }: any) {
    const { task_id } = params;
    const {name, position, tags, deadline, description} = await req.json();
    const newTask = await prisma.task.update({
        where: {
            id: +task_id
        },
        data: {
            name,
            position,
            tags,
            deadline,
            description
        }
    })
    return getResponse(newTask, "Update task success", 200);
}

export async function DELETE(req: Request, { params }: any) {
    const { task_id } = params;
    const Task = await prisma.task.delete({
        where: {
            id: +task_id
        }
    })
    return getResponse(Task, "Task deleted", 200);
}


// export async function GET(req: Request, { params }: any) {
//     const { group_id } = params;
//     if(!group_id) {
//         const task = await prisma.task.findMany({
//             where: {
//                 group_id: +group_id
//             }
//         })
//     }
//     const task = await prisma.task.findMany({
//         where: {
//             group_id: +group_id
//         }
//     })
//     return getResponse(task, "Get task success", 200);
// }
