'use client'
import React from "react";
import { Table as T, TableHeader, TableColumn, TableBody, TableRow, TableCell, RadioGroup, Radio, ButtonGroup, Button, Spinner } from "@nextui-org/react";
import Link from "next/link";

export default function Table({ headers, module, data, uniqueKey, onDelete, loading }:any) {
  return (
    <div className="flex flex-col gap-3 overflow-x-auto">
      <T
        color="default"
        // selectionMode={isMultiple ? "multiple" : "single"}
        aria-label="Example static collection table"
        classNames={loading && {
          table: "min-h-[200px]",
        }}
      >
        <TableHeader>
          {headers.map((header:string, index:number) => (
            <TableColumn className="text-center" key={index}>{header}</TableColumn>
          ))}
          <TableColumn className="text-center" >Aksi</TableColumn>

        </TableHeader>
        <TableBody isLoading={loading} loadingContent={<Spinner/>}>
          {data?.map((row:any, index:number) => (
            <TableRow key={index}>
              {headers.map((header:string, index:number) => (
                <TableCell className=" text-center" key={index}>{row[header]}</TableCell>
              ))}
              <TableCell >
                <div className="flex gap-2 items-center justify-center ">
                  <Button color="warning" as={Link} href={`/${module}/edit/${row[uniqueKey]}`} >Edit</Button>
                  <Button color="danger" onClick={() => onDelete(row[uniqueKey])} >Delete</Button>
                </div>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </T>
    
    </div>
  );
}
