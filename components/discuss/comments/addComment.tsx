import fetchApi from "@/utils/fetchApi";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/input";
import React from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";

const AddComment = ({ id }: { id: number }) => {
  const [comment, setComment] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleAddComment = async () => {
    setLoading(true);
    await fetchApi(`/discustions/${id}/comment`, "POST", {
      text: comment,
    });
    toast.success("Comment Added");
    mutate("/discustions");
    setComment("");
    setLoading(false);
  };

  return (
    <div className="flex flex-row gap-3">
      <Input
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
    </div>
  );
};

export default AddComment;
