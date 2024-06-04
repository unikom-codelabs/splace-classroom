import fetchApi from "@/utils/fetchApi";
import { mutateSWRPartialKey } from "@/utils/mutateSWR";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Textarea } from "@nextui-org/input";
import React from "react";
import toast from "react-hot-toast";
import { mutate, useSWRConfig } from "swr";

const AddComment = ({
  id,
  reply,
  c_id,
}: {
  id: number;
  c_id?: number;
  reply?: boolean;
}) => {
  const [comment, setComment] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { cache }: any = useSWRConfig();

  const handleAddComment = async () => {
    setLoading(true);
    await fetchApi(`/discustions/${id}/comment`, "POST", {
      text: comment,
    });
    toast.success("Comment Added");
    mutateSWRPartialKey({ key: ["/discustions", "/bookmark"], cache });
    setComment("");
    setLoading(false);
  };

  const handleReply = async () => {
    setLoading(true);
    await fetchApi(`/discustions/${id}/comment/${c_id}/reply`, "POST", {
      text: comment,
    });
    toast.success("Comment Added");
    mutateSWRPartialKey({ key: ["/discustions", "/bookmark"], cache });

    setComment("");
    setLoading(false);
  };

  return (
    <div className="flex flex-row gap-3">
      {!reply ? (
        <>
          <Textarea
            minRows={1}
            maxRows={3}
            size={"md"}
            type="text"
            placeholder="Add Your Comments"
            onValueChange={setComment}
            value={comment}
            disabled={loading}
          />
          <button onClick={handleAddComment} disabled={loading}>
            <FontAwesomeIcon icon={faPaperPlane} size={"lg"} />
          </button>
        </>
      ) : (
        <>
          <Textarea
            minRows={1}
            maxRows={3}
            size={"sm"}
            type="text"
            placeholder="Add Your Reply Comments"
            onValueChange={setComment}
            value={comment}
            disabled={loading}
            className="w-3/4"
          />
          <button onClick={handleReply} disabled={loading}>
            <FontAwesomeIcon icon={faPaperPlane} size={"sm"} />
          </button>
        </>
      )}
    </div>
  );
};

export default AddComment;
