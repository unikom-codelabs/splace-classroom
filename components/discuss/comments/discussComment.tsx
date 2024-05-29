import { Divider } from "@nextui-org/react";
import React, { useEffect } from "react";
import AddComment from "./addComment";
import CommentList from "./commentList";
import Comment from "./singleComment";
import fetchApi from "@/utils/fetchApi";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { mutateSWRPartialKey } from "@/utils/mutateSWR";

const DiscussComment = ({ data, showComment }: any) => {
  const { id } = useParams();
  const [detail, setDetail] = React.useState(false);
  const [detailReply, setDetailReply] = React.useState(false);

  const { data: session } = useSession() as any;

  const { cache }: any = useSWRConfig();

  const handleVote = async ({ c_id }: any) => {
    const res = await fetchApi(
      `/discustions/${data.id}/comment/${c_id}/like`,
      "POST",
      {
        id: c_id,
      }
    );

    mutateSWRPartialKey({ key: "/discustions", cache });

    toast.success(
      `${
        res.message === "Comment liked" ? "Liked" : "Unliked"
      } Comment Discussion`
    );
  };

  useEffect(() => {
    if (id) {
      setDetail(true);
      showComment.setShowComment(true);
    }
  }, []);

  return (
    <div className="my-2">
      {data.comments.length !== 0 && <Divider className="mb-1" />}
      {data.comments.length > 1 && (
        <button
          className=" text-gray-500 text-sm"
          onClick={() => setDetail(!detail)}
        >
          {detail
            ? "Hide Comments"
            : `View ${data.comments.length - 1} More Comments`}
        </button>
      )}

      {data.comments.length === 1 && (
        <button
          className=" text-gray-500 text-sm"
          onClick={() => setDetail(!detail)}
        >
          {detail ? "Hide Comments" : `View Detail Comments`}
        </button>
      )}

      {data.comments.length > 0 && !detail && (
        <Comment
          data={data.comments[0]}
          handleVote={handleVote}
          session={session}
        />
      )}
      {detail && (
        <CommentList
          discussionId={data.id}
          data={data.comments}
          detailReply={{ detailReply, setDetailReply }}
          handleVote={handleVote}
          session={session}
        />
      )}
      {showComment.showComment && <AddComment id={data.id} />}
    </div>
  );
};

export default DiscussComment;
