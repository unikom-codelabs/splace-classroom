import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown, faAnglesUp } from "@fortawesome/free-solid-svg-icons";

const UpDownVote = () => {
  return (
    <div className="flex bg-dark-blue/10 p-1 rounded-md gap-2">
      <button className="flex items-center gap-1">
        <FontAwesomeIcon
          icon={faAnglesUp}
          size="sm"
          className="text-dark-blue"
        />
        <span>1</span>
      </button>
      <span className="text-gray-400">|</span>
      <button className="flex items-center gap-1">
        <FontAwesomeIcon
          icon={faAnglesDown}
          size="sm"
          className="text-gray-500"
        />
        <span>0</span>
      </button>
    </div>
  );
};

export default UpDownVote;
