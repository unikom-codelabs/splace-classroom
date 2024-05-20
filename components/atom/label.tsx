import React from "react";

const Label = ({ text }: { text: string }) => {
  return (
    <div className="flex bg-dark-blue/10 p-1 rounded-md">
      <span className="text-dark-blue text-xs">{text}</span>
    </div>
  );
};

export default Label;
