import React from "react";

const Label = ({ text }: { text: string }) => {
  return (
    <div className="flex border-1 border-dark-blue p-1 rounded-md">
      <span className="text-dark-blue text-xs">{text}</span>
    </div>
  );
};

export default Label;
