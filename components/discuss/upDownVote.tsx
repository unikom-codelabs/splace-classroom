import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown, faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import fetchApi from "@/utils/fetchApi";
import { mutate } from "swr";
import { useSession } from "next-auth/react";

const UpDownVote = ({ data }: any) => {
  const { data: session } = useSession() as any;

  const handleVote = async ({ type, id }: any) => {
    const res = await fetchApi(`/discustions/${id}/vote`, "POST", {
      vote: type,
    });
    mutate("/discustions");
  };

  console.log(session);

  return (
    <div className="flex bg-dark-blue/10 p-1 rounded-md gap-2">
      <button
        className={`flex items-center gap-1 ${
          data.votes.find(
            (item: any) =>
              item.user_id === session?.user?.id && item.type === "UPVOTE"
          )
            ? "text-blue-500 font-bold"
            : "text-gray-500"
        }`}
        onClick={() =>
          handleVote({
            type: "UPVOTE",
            id: data.id,
          })
        }
      >
        <FontAwesomeIcon icon={faAnglesUp} size="sm" />
        <span>
          {data.votes.filter((item: any) => item.type === "UPVOTE").length}
        </span>
      </button>
      <span className="text-gray-400">|</span>
      <button
        className={`flex items-center gap-1 ${
          data.votes.find(
            (item: any) =>
              item.user_id === session?.user?.id && item.type === "DOWNVOTE"
          )
            ? "text-red-500 font-bold"
            : "text-gray-500"
        }`}
        onClick={() =>
          handleVote({
            type: "DOWNVOTE",
            id: data.id,
          })
        }
      >
        <FontAwesomeIcon icon={faAnglesDown} size="sm" />
        <span>
          {data.votes.filter((item: any) => item.type === "DOWNVOTE").length}
        </span>
      </button>
    </div>
  );
};

export default UpDownVote;
