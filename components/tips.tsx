import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/react";

const Tips = () => {
  return (
    <div className="flex flex-col w-[180px] h-[166px] rounded-lg bg-dark-blue !mt-16">
      <div className="bg-white self-center p-3 rounded-full border-4 border-dark-blue relative -mt-8">
        <FontAwesomeIcon
          icon={faHeadset}
          className="text-dark-blue text-4xl mx-auto"
        />
      </div>
      <div className="text-center text-white text-sm font-medium p-[14px] mt-2">
        Get problem in this app? Chat us!
      </div>
      <Button
        variant="bordered"
        className="border-white border-1 text-white w-fit mx-auto"
      >
        Chat Now
      </Button>
    </div>
  );
};

export default Tips;
