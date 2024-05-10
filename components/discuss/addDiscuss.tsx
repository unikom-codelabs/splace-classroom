import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

export default function AddDiscuss({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: any;
}) {
  const [value, setValue] = useState("");
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
              <div className="h-[230px]">
                <ReactQuill
                  theme="snow"
                  value={value}
                  onChange={setValue}
                  placeholder="Write something..."
                  className="h-[200px] d-block"
                />
              </div>
              <div className="flex justify-between p-4">
                <div className="flex gap-2">
                  <Button
                    variant="flat"
                    radius="sm"
                    className="bg-dark-blue text-white font-medium"
                    startContent={<FontAwesomeIcon icon={faPaperclip} />}
                  >
                    Attach
                  </Button>
                  <Autocomplete
                    placeholder="Category"
                    className="max-w-[180px]"
                  >
                    <AutocompleteItem key={0} value="Algorithm">
                      Algorithm
                    </AutocompleteItem>
                    <AutocompleteItem key={1} value="Data Structure">
                      Data Structure
                    </AutocompleteItem>
                    <AutocompleteItem key={2} value="JavaScript">
                      JavaScript
                    </AutocompleteItem>
                    <AutocompleteItem key={3} value="Python">
                      Python
                    </AutocompleteItem>
                  </Autocomplete>
                </div>
                <Button
                  variant="flat"
                  radius="sm"
                  className="bg-dark-blue text-white font-medium"
                >
                  Post
                </Button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
