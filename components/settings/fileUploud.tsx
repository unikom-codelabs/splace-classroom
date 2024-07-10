"use client";

import React, { use, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadProps {
  label: string;
  ukuran: string;
  store: any;
  defaultImage?: string;
}

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  ukuran,
  store,
  defaultImage,
}) => {
  const [files, setFiles] = useState([]) as any;
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file: any) => (
    <div
      style={{
        display: "inline-flex",
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: "border-box",
      }}
      key={file.name}
    >
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, []);

  useEffect(() => {
    store(files);
  }, [files]);

  return (
    <div className="mb-4 flex flex-row justify-between gap-16">
      <div className="flex flex-row gap-1 text-gray-700 text-sm font-bold mb-2 w-32">
        {label} <span className="text-red-500">*</span>
      </div>

      <div className="flex items-center justify-center w-full">
        <label
          htmlFor={label.toLowerCase()}
          className={`flex flex-row items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
            acceptedFiles.length > 0
              ? "border-dark-blue  bg-dark-blue/15 hover:bg-dark-blue/20"
              : "border-gray-300  bg-gray-50 hover:bg-gray-100"
          } `}
        >
          <aside
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: 8,
            }}
          >
            {thumbs}
            {/* <img src={defaultImage} style={img} /> */}
          </aside>
          <div {...getRootProps({ className: "" })}>
            <div className="flex flex-col items-center justify-center ">
              <div className="mb-2 text-sm text-gray-500">
                {acceptedFiles.length > 0 ? (
                  <div className="flex flex-col">
                    <span>{acceptedFiles[0].name}</span>
                  </div>
                ) : (
                  <>
                    <span className="font-semibold text-dark-blue">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                    <p className="text-xs text-gray-500 text-center">
                      PNG, JPG, SVG ({ukuran})
                    </p>
                  </>
                )}
              </div>
            </div>
            {/* <input id={label.toLowerCase()} type="file" className="hidden" /> */}
            <input {...getInputProps()} />
          </div>
        </label>
      </div>
    </div>
  );
};

export default FileUpload;
