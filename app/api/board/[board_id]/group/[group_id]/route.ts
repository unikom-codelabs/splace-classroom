import { PrismaClient } from "@prisma/client";
import getResponse from "@/utils/getResponse";
const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: any) {
    const { group_id } = params;
    const group = await prisma.group.findFirst({
        where: {
            id: +group_id
        }
    });
    if (!group) return getResponse(null, 'Group not found', 404);

    const {name, position, img_url} = await req.json();
    const newGroup = await prisma.group.update({
        where: {
            id: +group_id
        },
        data: {
            name,
            position,
            img_url
        }
    });
    return getResponse(newGroup, "Group updated", 200);
}


export async function DELETE(req: Request, { params }: any) {
    const { group_id } = params;
    const group = await prisma.group.findFirst({
        where: {
            id: +group_id
        }
    });
    if (!group) return getResponse(null, 'Group not found', 404);
    const newGroup = await prisma.group.delete({
        where: {
            id: +group_id
        }
    });
    return getResponse(newGroup, "Group deleted", 200);
}