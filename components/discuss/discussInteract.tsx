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
import fetchApi from "@/utils/fetchApi";
import { mutate, useSWRConfig } from "swr";
import toast from "react-hot-toast";
import { Tooltip } from "@nextui-org/tooltip";
import { mutateSWRPartialKey } from "@/utils/mutateSWR";

const DiscussInteract = ({ data, comment }: any) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const shareLink: any =
    process.env.NEXT_PUBLIC_BASE_URL + "/discuss/" + data.id;
  const copylink = () => {
    navigator.clipboard.writeText(shareLink);
  };

  const { cache }: any = useSWRConfig();

  const handleShare = async () => {
    setIsLoading(true);
    const res = await fetchApi(`/discustions/${data.id}/share`, "PUT");
    copylink();

    mutateSWRPartialKey({ key: ["/discustions", "/bookmark"], cache });

    toast.success("Discussion has copied to clipboard");
    setIsLoading(false);
  };

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
        <Tooltip content="Copy Link Discussion" placement="top">
          <button
            className="flex items-center gap-2 text-gray-500"
            onClick={() => handleShare()}
            disabled={isLoading}
          >
            <FontAwesomeIcon icon={faShareNodes} />
            <span>{data.shere_count}</span>
          </button>
        </Tooltip>
      </div>
      <DiscussComment data={data} showComment={comment} />
    </div>
  );
};

export default DiscussInteract;
