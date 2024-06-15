import fetchApi from "@/utils/fetchApi";
import { mutateSWRPartialKey } from "@/utils/mutateSWR";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import {
  faCheckCircle,
  faPaperclip,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import React, { FormEvent, useEffect } from "react";
import toast from "react-hot-toast";
import { mutate, useSWRConfig } from "swr";
import ImagePreview from "../addDiscuss/ImagePreview";

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
  const [images, setImages] = React.useState<File[]>([]);
  const [formData, setFormData] = React.useState<{
    text: string;
    attachments: { name: string; file: File }[];
  }>({ text: comment, attachments: [] });

  const { cache }: any = useSWRConfig();

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files.length > 5) {
        toast.error("Maximum 5 attachments allowed");
        return;
      }

      const _files = Array.from(e.target.files);
      setImages(_files);
      setFormData({
        ...formData,
        attachments: _files.map((file) => ({ name: file.name, file })),
      });
    }
  };

  const handleAddComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);

    const data = new FormData(e.target as HTMLFormElement);
    data.append("text", formData.text);
    formData.attachments.forEach((file) => {
      data.append("attachments", file.file);
    });

    console.log(data);

    setLoading(true);
    const res = await fetch(`/api/discustions/${id}/comment`, {
      method: "POST",
      body: data,
    });
    if (res.ok) {
      toast.success("Comment Added");
    } else {
      toast.error("Failed to add comment");
    }

    mutateSWRPartialKey({ key: ["/discustions", "/bookmark"], cache });

    setComment("");
    setLoading(false);
    setImages([]);
    setFormData({ text: "", attachments: [] });
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

  useEffect(() => {
    setFormData({ ...formData, text: comment });
  }, [comment]);

  return (
    <div className="flex flex-col gap-3 w-full">
      {!reply ? (
        <form className="flex flex-row gap-3" onSubmit={handleAddComment}>
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
          <div className="flex flex-row gap-1">
            <Button
              variant="flat"
              radius="sm"
              className="bg-dark-blue text-white font-medium"
              startContent={<FontAwesomeIcon icon={faPaperclip} />}
              onClick={() => {
                const fileInput = document.getElementById("upload-file");
                if (fileInput) {
                  fileInput.click();
                }
              }}
            ></Button>
            <input
              type="file"
              id="upload-file"
              multiple
              className={"hidden"}
              accept="image/png, image/jpeg"
              onChange={handleFileSelected}
            />
            <Button
              variant="flat"
              radius="sm"
              className="bg-dark-blue text-white font-medium"
              type="submit"
              isLoading={loading}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-row gap-3">
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
        </div>
      )}

      {images.length > 0 && (
        <div className="bg-dark-blue/20 p-4 mx-4 mb-4 rounded-md flex flex-col relative">
          <button
            className="text-red-500 absolute -right-1 -top-2"
            onClick={() => setImages([])}
          >
            <FontAwesomeIcon icon={faCircleXmark} size="lg" />
          </button>
          <ImagePreview images={images} />
        </div>
      )}
    </div>
  );
};

export default AddComment;
