import React from "react";
import UpDownVote from "./upDownVote";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faComments,
  faShare,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";

const DiscussInteract = ({ data }: any) => {
  return (
    <div className="flex gap-4">
      <UpDownVote data={data} />
      <button className="flex items-center gap-2 text-gray-500">
        <FontAwesomeIcon icon={faComments} />
        <span>{data.comments.length}</span>
      </button>
      <button className="flex items-center gap-2 text-gray-500">
        <FontAwesomeIcon icon={faShareNodes} />
        <span>{data.shere_count}</span>
      </button>
    </div>
  );
};

export default DiscussInteract;
