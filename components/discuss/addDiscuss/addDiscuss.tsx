"use client";
import React, { FormEvent, useState, useMemo, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";

import "react-quill/dist/quill.snow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircleXmark,
  faClose,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import ImagePreview from "./ImagePreview";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import { mutate, useSWRConfig } from "swr";
import toast from "react-hot-toast";
import { mutateSWRPartialKey } from "@/utils/mutateSWR";

export default function AddDiscuss({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: any;
}) {
  const [value, setValue] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedKey, setSelectedKey] = React.useState<React.Key | null>(null);

  const { cache }: any = useSWRConfig();

  const onSelectionChange = (key: React.Key | null) => {
    setSelectedKey(key);
  };

  const [formData, setFormData] = useState<{
    content: string;
    tags: string;
    type: string;
    attachments: { name: string; file: File }[];
  }>({ content: value, tags: "", type: "PUBLISHED", attachments: [] });

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.content == "<p><br></p>") {
      toast.error("Content is required");
      return;
    }

    if (selectedKey == null) {
      toast.error("Select a category");
      return;
    }

    const data = new FormData(e.target as HTMLFormElement);
    data.append("content", formData.content);
    data.append("tags", `["${formData.tags}"]`);
    data.append("type", formData.type);
    formData.attachments.forEach((file) => {
      data.append("attachments", file.file);
    });

    setUploading(true);
    const res = await fetch("/api/discustions", {
      method: "POST",
      body: data,
    });
    if (res.ok) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your post has been submitted!",
      });
      onOpenChange(false);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }

    mutateSWRPartialKey({ key: ["/discustions", "/bookmark"], cache });

    setFormData({
      content: "",
      tags: "",
      type: "PUBLISHED",
      attachments: [],
    });
    setValue("");
    setUploading(false);
  };

  useEffect(() => {
    setFormData({ ...formData, content: value });
  }, [value]);

  useEffect(() => {
    setFormData({ ...formData, tags: selectedKey as string });
  }, [selectedKey]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      className="max-w-[600px]"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="p-0 rounded-none">
              <form className="" onSubmit={handleSubmit}>
                <div className="h-[230px]">
                  <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    placeholder="Write something..."
                    className="h-[200px] d-block"
                  />
                </div>
                <div className="flex justify-between p-4 mt-2">
                  <div className="flex gap-2">
                    <Button
                      variant="flat"
                      radius="sm"
                      className="bg-dark-blue text-white font-medium"
                      startContent={<FontAwesomeIcon icon={faPaperclip} />}
                      endContent={
                        images.length > 0 && (
                          <FontAwesomeIcon icon={faCheckCircle} />
                        )
                      }
                      onClick={() => {
                        const fileInput =
                          document.getElementById("upload-file");
                        if (fileInput) {
                          fileInput.click();
                        }
                      }}
                    >
                      Attach
                    </Button>
                    <input
                      type="file"
                      id="upload-file"
                      multiple
                      className={"hidden"}
                      accept="image/png, image/jpeg"
                      onChange={handleFileSelected}
                    />
                    <Autocomplete
                      placeholder="Category"
                      className="max-w-[180px]"
                      onSelectionChange={onSelectionChange}
                    >
                      <AutocompleteItem key={"algorithm"} value="Algorithm">
                        Algorithm
                      </AutocompleteItem>
                      <AutocompleteItem key={"data"} value="Data Structure">
                        Data Structure
                      </AutocompleteItem>
                      <AutocompleteItem key={"javascript"} value="JavaScript">
                        JavaScript
                      </AutocompleteItem>
                      <AutocompleteItem key={"python"} value="Python">
                        Python
                      </AutocompleteItem>
                    </Autocomplete>
                  </div>
                  <Button
                    variant="flat"
                    radius="sm"
                    className="bg-dark-blue text-white font-medium"
                    type="submit"
                    isLoading={uploading}
                    isDisabled={formData.content.length === 0}
                  >
                    Post
                  </Button>
                </div>
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
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
