import getSessionUser from "@/utils/session";
import { PrismaClient } from "@prisma/client";
import getResponse from "@/utils/getResponse";
import { get } from "http";
const prisma = new PrismaClient();


export async function GET(req: Request) {
    const user = await getSessionUser();
    // const user = {id: 1}
    const boardPartition = await prisma.boardPartition.findMany({
        where: {
            user_id: user.id
        }
    });
    if (!boardPartition) return getResponse(null, 'Board not found', 404);
    return getResponse(boardPartition, "Get my board success", 200);
}
