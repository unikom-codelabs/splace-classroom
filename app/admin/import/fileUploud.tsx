"use client";

import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";

interface FileUploadProps {
  label: string;
  link: string;
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

const FileUpload: React.FC<FileUploadProps> = ({ label, link, store }) => {
  const [files, setFiles] = useState([]) as any;
  const [jsonData, setJsonData] = useState() as any;
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
      "text/csv": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    return () =>
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, []);

  useEffect(() => {
    store(files);
  }, [files]);

  return (
    <div className="mb-4 flex flex-row justify-between gap-6">
      <div className="flex flex-col gap-1 text-gray-700 text-sm font-bold mb-2 w-[130px]">
        {label}
        <Link href={link} className="text-xs text-blue-400">
          Template
        </Link>
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
          ></aside>
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
                      format: xls, xlsx, csv
                    </p>
                  </>
                )}
              </div>
            </div>

            <input {...getInputProps()} />
          </div>
        </label>
      </div>
    </div>
  );
};

export default FileUpload;
