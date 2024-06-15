import { upload } from "@/utils/azure/storageBlob";
import getResponse from "@/utils/getResponse";
import getSessionUser from "@/utils/session";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(req: Request, { params }: any) {
  const data = await req.formData();
  const { id } = params;
  const text = data.get("text") as any;

  const attachments = data.getAll("attachments") as unknown as File[];
  let attachmentsPaths: string[] = [];

  if (attachments) {
    if (!Array.isArray(attachments)) {
      return getResponse(400, "Attachments should be an array");
    }
    if (attachments.length > 5) {
      return getResponse(400, "Maximum 5 attachments allowed");
    }
    const attacmentUploaded = await Promise.all(
      attachments.map(async (attachment: any) => {
        const bytes = await attachment.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const now = new Date();
        const prefixFile = `${now.toLocaleString()}`;
        return upload(
          "attachments",
          `${prefixFile} -${attachment.name}`,
          buffer
        );
      })
    );
    attachmentsPaths = attacmentUploaded.map(
      (attachment: any) => attachment.request.url
    );
  }

  if (!text) return getResponse(null, "text is required", 400);
  const discustion = await prisma.discustions.findFirst({
    where: {
      id: +id,
    },
    include: {
      comments: true,
    },
  });
  if (!discustion) return getResponse(null, "Discustion not found", 404);
  const user = await getSessionUser();
  const comment = await prisma.comments.create({
    data: {
      user_id: user?.id || 1,
      discustion_id: +id,
      content: text,
      attachments: attachmentsPaths || [],
    },
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
