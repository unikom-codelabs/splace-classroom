import getResponse from '@/utils/getResponse';
import getSessionUser from '@/utils/session';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
export async function POST(req: Request, { params }: any) {
  const { id } = params;
  const { text } = await req.json();
  if (!text) return getResponse(null, 'text is required', 400);
  const discustion = await prisma.discustions.findFirst({
    where: {
      id: +id,
    },
    include: {
      comments: true
    }
  });
  if (!discustion) return getResponse(null, "Discustion not found", 404);
  const user = await getSessionUser();
  const comment = await prisma.comments.create({
    data: {
      user_id: user?.id ||1,
      discustion_id: +id,
      content: text,
    }
  });
  return getResponse(comment, "Comment created", 200);
}

export async function GET(req: Request, { params }: any) {
  const { id } = params;
  const discustion = await prisma.discustions.findFirst({
		where: {
      id: +id,
		},
		include: {
      comments: {
        where: {
          reply_id: null,
        },
				include: {
					user: {
						select: {
							id: true,
							name: true,
							username: true,
						},
          },
          reply: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  username: true,
                },
              },
            },
            
          },
          replies: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  username: true,
                },
              },
            },
            
          },
					like_comments: {
						select: {
							user_id: true,
						},
					},
				},
			},
		},
  });
  if (!discustion) return getResponse(null, "Discustion not found", 404);
  return getResponse(discustion.comments, "Comments fetched", 200);
}
