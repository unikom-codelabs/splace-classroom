import { upload } from "@/utils/azure/storageBlob";
import getResponse from "@/utils/getResponse";
import getSessionUser from "@/utils/session";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(req: Request) {
  const data = await req.formData();
  const content = data.get("content") as string;
  const type = data.get("type") as any;
  const tags = data.get("tags") as string;
  const attachments = data.getAll("attachments") as unknown as File[];
  if (!content) {
    return getResponse(400, "Content is required");
  }
  if (["DRAFT", "PUBLISHED", "ARCHIVED"].includes(type) === false) {
    return getResponse(400, "Invalid type");
  }

  const user = await getSessionUser();
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
  const discustion = await prisma.discustions.create({
    data: {
      content,
      type,
      tags: tags ? JSON.parse(tags) : [],
      attachments: attachmentsPaths || [],
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  return getResponse(discustion, "Discustion created", 200);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  // const filter_by = searchParams.get("filter_by") as
  //   | "tags"
  //   | "id"
  //   | "user"
  //   | "text";
  // const filter_value = searchParams.get("filter_value");
  const tags = searchParams.get("tags");
  const id = searchParams.get("id");
  const user = searchParams.get("user");
  const text = searchParams.get("text");

  const sort_by = searchParams.get("sort_by") as
    | "newest"
    | "oldest"
    | "top_vote";

  let discustions = await prisma.discustions.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          class: {
            select: {
              id: true,
              name: true,
            },
          },
          // email: true,
          // image: true,
        },
      },
      votes: true,
      comments: {
        select: {
          id: true,
          content: true,
          created_at: true,
          like_comments: true,
          replies: {
            select: {
              id: true,
              content: true,
              created_at: true,
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      discustion_bookmark: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  if (tags)
    discustions = discustions.filter(
      (item) => Array.isArray(item.tags) && item.tags.includes(tags)
    );
  if (id) discustions = discustions.filter((item) => item.id === +id);
  if (user) discustions = discustions.filter((item) => item.user.id === +user);
  if (text)
    discustions = discustions.filter((item) =>
      item.content.toLowerCase().includes(text.toLowerCase())
    );

  if (sort_by === "newest") {
    discustions = discustions.sort(
      (a: any, b: any) => b.created_at - a.created_at
    );
  }
  if (sort_by === "oldest") {
    discustions = discustions.sort(
      (a: any, b: any) => a.created_at - b.created_at
    );
  }
  if (sort_by === "top_vote") {
    const discustionsVote = discustions.map((item) => {
      return {
        ...item,
        upvote: item.votes.filter((vote: any) => vote.type === "UPVOTE").length,
        downvote: item.votes.filter((vote: any) => vote.type === "DOWNVOTE")
          .length,
      };
    });
    discustions = discustionsVote.sort(
      (a: any, b: any) => b.upvote - b.downvote - (a.upvote - a.downvote)
    );
  }
  return getResponse(discustions, "Discustions fetched", 200);
}
