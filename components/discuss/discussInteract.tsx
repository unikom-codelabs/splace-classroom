import React from "react";
import UpDownVote from "./upDownVote";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faComments,
  faShare,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import DiscussComment from "./comments/discussComment";

const DiscussInteract = ({ data, comment }: any) => {
  return (
    <div>
      <div className="flex gap-4">
        <UpDownVote data={data} />
        <button
          className="flex items-center gap-2 text-gray-500"
          onClick={() => comment.setShowComment(!comment.showComment)}
        >
          <FontAwesomeIcon
            icon={faComments}
            className={comment.showComment ? " text-primary" : ""}
          />
          <span>{data.comments.length}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-500">
          <FontAwesomeIcon icon={faShareNodes} />
          <span>{data.shere_count}</span>
        </button>
      </div>
      <DiscussComment data={data} showComment={comment} />
    </div>
  );
};

export default DiscussInteract;
