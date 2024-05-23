import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { TimeAgo } from "@/utils/timeStamp";
import ReplyList from "./replyList";
import fetchApi from "@/utils/fetchApi";
import { mutate } from "swr";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const CommentList = ({ data, idDiscussion, detailReply }: any) => {
  const { data: session } = useSession() as any;

  const handleVote = async ({ c_id }: any) => {
    const res = await fetchApi(
      `/discustions/${idDiscussion}/comment/${c_id}/like`,
      "POST",
      {
        id: c_id,
      }
    );

    mutate("/discustions");

    toast.success(
      `${
        res.message === "Comment liked" ? "Liked" : "Unliked"
      } Comment Discussion`
    );
  };

  return (
    <div className="ease-in duration-300">
      {data.map((comment: any) => (
        <div key={comment.id}>
          <div className="flex flex-row justify-between items-center mb-2 gap-5">
            <div>
              <span className=" text-sm font-semibold text-gray-600">
                {comment.user.name}
              </span>{" "}
              <span className="text-sm text-gray-600 leading-snug">
                {comment.content}
              </span>
              <div className="flex gap-1 mt-1">
                <span className="text-xs text-gray-400">
                  {TimeAgo(comment.created_at)}
                </span>
                <span className="text-xs text-gray-600">•</span>
                <span className="text-xs text-gray-500 font-semibold">
                  {comment.like_comments.length} likes
                </span>
                <span className="text-xs text-gray-600">•</span>

                <button className="text-xs text-gray-500 font-semibold">
                  Reply
                </button>
              </div>
            </div>
            <button
              className={`flex items-center gap-1 ${
                comment.like_comments.find(
                  (item: any) => item.user_id === session?.user?.id
                )
                  ? "text-primary font-bold"
                  : "text-gray-500"
              }`}
              onClick={() => handleVote({ id: comment.id, c_id: comment.id })}
            >
              <FontAwesomeIcon icon={faAnglesUp} size="sm" />
            </button>
          </div>
          {comment.replies.length > 0 && detailReply && (
            <ReplyList data={comment.replies} />
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
