import { PrismaClient } from "@prisma/client";
import getResponse from "@/utils/getResponse";
const prisma = new PrismaClient();


export async function POST(req: Request, { params }: any) {
    const { board_id } = params;
    const {name, position, img_url} = await req.json();
    const group = await prisma.group.create({
        data: {
            name,
            position,
            img_url,
            board: {
                connect: {
                    id: +board_id
                }
            }
        }
    })
    return getResponse(group, "Create group success", 200);
}

export async function GET(req: Request, { params }: any) {
    const { board_id } = params;
    const group = await prisma.group.findMany({
        where: {
            board_id: +board_id
        }
    });
    if (!group) return getResponse(null, 'Group not found', 404);
    return getResponse(group, "Get group success", 200);
}