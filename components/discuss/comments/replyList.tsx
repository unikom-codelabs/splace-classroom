import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { TimeAgo } from "@/utils/timeStamp";

const ReplyList = ({ data }: any) => {
  return (
    <div className="ease-in duration-300">
      {data.map((comment: any) => (
        <div
          className="flex flex-row justify-between items-center mb-2 gap-5"
          key={comment.id}
        >
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
          <FontAwesomeIcon icon={faAnglesUp} size="sm" />
        </div>
      ))}
    </div>
  );
};

export default ReplyList;
