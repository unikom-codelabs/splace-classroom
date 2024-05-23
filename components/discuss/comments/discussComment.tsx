import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider } from "@nextui-org/react";
import React from "react";
import AddComment from "./addComment";
import CommentList from "./commentList";

const DiscussComment = ({ data, showComment }: any) => {
  const [detail, setDetail] = React.useState(false);
  const [detailReply, setDetailReply] = React.useState(false);

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
        <Comment data={data.comments[0]} />
      )}
      {detail && (
        <CommentList
          data={data.comments}
          detailReply={{ detailReply, setDetailReply }}
          idDiscussion={data.id}
        />
      )}
      {showComment.showComment && <AddComment id={data.id} />}
    </div>
  );
};

const Comment = ({ data }: any) => {
  return (
    <div className="flex flex-row justify-between items-center mb-2">
      <div>
        <span className=" text-sm font-semibold text-gray-600">
          {data.user.name}
        </span>{" "}
        <span className="text-sm text-gray-600">{data.content}</span>
      </div>
      <FontAwesomeIcon icon={faAnglesUp} size="sm" />
    </div>
  );
};

export default DiscussComment;
