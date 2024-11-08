import getResponse from "@/utils/getResponse";
import getSessionUser from "@/utils/session";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function GET(req: Request, { params }: any) {
  const { board_id } = params;
  const board = await prisma.board.findFirst({
    where: {
      id: +board_id
    }
  });
  if (!board) return getResponse(null, 'Partition not found', 404);
  return getResponse(board, "Get board by id success", 200);
}

export async function DELETE(req: Request, { params }: any) {
    const { board_id } = params;
    const board = await prisma.board.findFirst({
      where: {
        id: +board_id
      },
    });
    if (!board) return getResponse(null, 'Board not found', 404);
    await prisma.board.delete({
      where: {
        id: +board_id,
      },
    });
    return getResponse(board, "Board deleted", 200);
}

export async function PUT(req: Request, { params }: any) {
    const { board_id } = params;
    const {name,visibility} = await req.json();
    const board = await prisma.board.findFirst({
      where: {
        id: +board_id,
      },
    });
    if (!board) return getResponse(null, "board not found", 404);
    const newBoard = await prisma.board.update({
      where: {
        id: +board_id,
      },
      data: {
        name,
        visibility
      },
    });
    return getResponse(newBoard, "board Updated", 200);
  }