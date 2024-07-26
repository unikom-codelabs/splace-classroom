"use client";
import React from "react";
import ModuleItem from "./moduleItem";

import QuizItem from "./quizItem";
import { Button, Divider, Spinner } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import fetchApi from "@/utils/fetchApi";
import { mutate } from "swr";

type moduleProps = {
  userRole: string;
  module: any;
  params: any;
};

export default function ResourceList({
  userRole,
  module,
  params,
}: moduleProps) {
  const handleRetryRag = async (e: any, id: any) => {
    e.preventDefault();
    await fetchApi(`/resources/${id}/retry-rag`, "POST");

    mutate(`/courses/${params.id}`);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {module.map((item: any, index: any) => {
        const isQuiz = item.path === undefined;
        return (
          <div key={index}>
            {isQuiz ? (
              <QuizItem userRole={userRole} module={item} params={params} />
            ) : (
              <>
                <ModuleItem userRole={userRole} module={item} params={params} />
                {item.status === "failed" && (
                  <div className="flex justify-between p-2 bg-warning/25 rounded-lg  items-center mb-3 ml-4">
                    <div className="flex justify-start gap-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">
                          Module Process eror, module cannot be used in chatbot
                          & quiz generator
                        </span>
                        <span className="text-xs text-red-500/80">
                          (click the refresh button to repeat the process)
                        </span>
                      </div>
                    </div>

                    <Button
                      color="warning"
                      size="sm"
                      className="cursor-pointer"
                      onClick={(e) => handleRetryRag(e, item.id)}
                    >
                      Refresh
                      <Icon icon="zondicons:refresh" />
                    </Button>
                  </div>
                )}
              </>
            )}
            <Divider />
          </div>
        );
      })}
    </div>
  );
}
