import React from "react";
import UpDownVote from "./upDownVote";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faComments,
  faShare,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";

const DiscussInteract = () => {
  return (
    <div className="flex gap-4">
      <UpDownVote />
      <button className="flex items-center gap-2 text-gray-500">
        <FontAwesomeIcon icon={faComments} />
        <span>0</span>
      </button>
      <button className="flex items-center gap-2 text-gray-500">
        <FontAwesomeIcon icon={faShareNodes} />
        <span>0</span>
      </button>
    </div>
  );
};

export default DiscussInteract;
