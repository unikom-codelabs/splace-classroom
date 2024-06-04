import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown, faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import fetchApi from "@/utils/fetchApi";
import { mutate, useSWRConfig } from "swr";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Tooltip } from "@nextui-org/tooltip";
import { mutateSWRPartialKey } from "@/utils/mutateSWR";

const UpDownVote = ({ data }: any) => {
  const { data: session } = useSession() as any;
  const [isLoading, setIsLoading] = React.useState(false);

  const { cache }: any = useSWRConfig();

  const handleVote = async ({ type, id }: any) => {
    setIsLoading(true);
    const res = await fetchApi(`/discustions/${id}/vote`, "POST", {
      vote: type,
    });
    mutateSWRPartialKey({ key: ["/discustions", "/bookmark"], cache });

    toast.success(
      `${res.message === "Discustion voted" ? "Vote" : "Unvote"} Discussion`
    );
    setIsLoading(false);
  };

  return (
    <div className="flex bg-dark-blue/10 p-1 rounded-md gap-2">
      <Tooltip content="Upvote">
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
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faAnglesUp} size="sm" />
          <span>
            {data.votes.filter((item: any) => item.type === "UPVOTE").length}
          </span>
        </button>
      </Tooltip>
      <span className="text-gray-400">|</span>
      <Tooltip content="Downvote">
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
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faAnglesDown} size="sm" />
          <span>
            {data.votes.filter((item: any) => item.type === "DOWNVOTE").length}
          </span>
        </button>
      </Tooltip>
    </div>
  );
};

export default UpDownVote;
