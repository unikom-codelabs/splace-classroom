import getResponse from "@/utils/getResponse";
import getSessionUser from "@/utils/session";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(req: Request, { params }: any) {
  const { id } = params;
  const { vote } = await req.json();
  if (!vote) return getResponse(null, "vote is required", 400);
  if (["UPVOTE", "DOWNVOTE"].includes(vote) === false) {
    return getResponse(400, "Invalid vote");
  }
  const discustion = await prisma.discustions.findFirst({
    where: {
      id: +id,
    },
    include: {
      votes: true,
    },
  });
  if (!discustion) return getResponse(null, "Discustion not found", 404);
  const user = await getSessionUser();
  const voteExist = discustion.votes && discustion.votes.find((v: any) => v.user_id === user?.id && v.type === vote);
  if (voteExist) {
    await prisma.vote.delete({
      where: {
        id: voteExist.id,
      },
    });
  }
  await prisma.vote.create({
    data: {
      user_id: user?.id ||1,
      discustion_id: +id,
      type: vote,
    },
  });

  return getResponse(discustion, "Discustion voted", 200);
}
