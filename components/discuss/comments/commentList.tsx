import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { TimeAgo } from "@/utils/timeStamp";
import ReplyList from "./replyList";
import AddComment from "./addComment";
import Image from "next/image";

const CommentList = ({
  data,
  handleVote,
  detailReply,
  session,
  discussionId,
}: any) => {
  const [openReply, setOpenReply] = React.useState(0);
  const [commentReply, setCommentReply] = React.useState(0);

  return (
    <div className="ease-in duration-300">
      {data.map((comment: any) => (
        <div key={comment.id}>
          <div>
            <div className="flex flex-row justify-between items-center mb-2 gap-5">
              <div>
                <span className=" text-sm font-semibold text-gray-600">
                  {comment.user.name}
                </span>{" "}
                <div className="gap-2 grid grid-cols-3 ">
                  {comment.attachments.map((attachment: any) => (
                    <Image
                      key={attachment}
                      className="border border-gray-200 rounded-md"
                      width={200}
                      height={100}
                      alt="NextUI hero Image"
                      src={attachment}
                    />
                  ))}
                </div>
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

                  <button
                    className={`text-xs font-semibold ${
                      commentReply === comment.id
                        ? " text-blue-500"
                        : "text-gray-500"
                    }`}
                    onClick={() =>
                      setCommentReply(
                        commentReply === comment.id ? 0 : comment.id
                      )
                    }
                  >
                    Reply
                  </button>
                </div>
              </div>
              <button
                className={`flex items-center gap-1 ${
                  comment.like_comments.find(
                    (item: any) => item.user_id === session?.user?.id
                  )
                    ? "text-dark-blue font-bold"
                    : "text-gray-500"
                }`}
                onClick={() => handleVote({ id: comment.id, c_id: comment.id })}
              >
                <FontAwesomeIcon icon={faAnglesUp} size="sm" />
              </button>
            </div>
            <div className=" pl-5 my-2">
              {comment.replies.length > 0 && detailReply && (
                <button
                  className="text-gray-500 text-sm"
                  onClick={() =>
                    setOpenReply(openReply === comment.id ? 0 : comment.id)
                  }
                >
                  {openReply === comment.id
                    ? "Hide Replies"
                    : `View ${comment.replies.length} More Replies`}
                </button>
              )}
              {openReply === comment.id && <ReplyList data={comment.replies} />}
              {commentReply === comment.id && (
                <AddComment id={discussionId} c_id={comment.id} reply />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
