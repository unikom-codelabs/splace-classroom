import getSessionUser from "@/utils/session";
import { PrismaClient } from "@prisma/client";
import getResponse from "@/utils/getResponse";
const prisma = new PrismaClient();


export async function POST(req: Request) {
    const {name,visibility, isOwner, status} = await req.json();
    const user = await getSessionUser();
    // const user = {id: 1}
    const board = await prisma.board.create({
        data: {
            name,
            visibility
        }
    })
    const boardPartition = await prisma.boardPartition.create({
        data: {
            board_id: board.id,
            user_id: user.id,
            isOwner,
            status
        }
    })
    return getResponse(board, "Board and partition created", 200);
}

export async function GET(req: Request) {
    const board = await prisma.board.findMany();
    if (!board) return getResponse(null, 'Board not found', 404);
    return getResponse(board, "Get board success", 200);
}