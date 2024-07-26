"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck, faCircle } from "@fortawesome/free-regular-svg-icons";
import NextLink from "next/link";
import { showFormattedDate } from "@/utils/timeStamp";
import { Button } from "@nextui-org/button";
import fetchApi from "@/utils/fetchApi";
import { mutate } from "swr";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function QuizItem({ userRole, module, params }: any) {
  const { id, name, createdAt, path, isAnswered } = module || {};
  const [quiz, setQuiz] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!path) setQuiz(true);
  }, []);

  const handleDeleteQuiz = async (e: any, id: any) => {
    e.preventDefault();
    await fetchApi(`/quiz/${id}`, "DELETE");
    mutate(`/courses/${params.id}`);
  };

  const handleQuiz = () => {
    if (isAnswered) {
      router.push(`/quiz/${id}/result`);
    } else {
      Swal.fire({
        title: "Do you want to start this quiz?",
        text: "You can't go back after starting the quiz",
        icon: "info",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Start",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/quiz/${id}`);
        }
      });
    }
  };

  return (
    <div onClick={() => handleQuiz()}>
      <div className="group flex gap-3 flex-row py-2 px-4 cursor-pointer justify-between items-center">
        <div className="flex gap-3 flex-row">
          <div className="rounded-3xl w-10 bg-yellow-500 flex justify-center items-center p-2">
            <FontAwesomeIcon icon={faFileLines} className="fa-xl text-white" />
          </div>
          <div className="flex flex-col">
            <p className="text-md">{name}</p>
            <p className="text-small text-default-500">
              {showFormattedDate(createdAt)}
            </p>
          </div>
        </div>
        <div>
          {userRole !== "STUDENT" ? (
            <div className="group-hover:flex hidden">
              <Button
                color="danger"
                size="sm"
                onClick={(e) => handleDeleteQuiz(e, id)}
              >
                Delete
              </Button>
            </div>
          ) : (
            <FontAwesomeIcon
              icon={isAnswered ? faCircleCheck : faCircle}
              className={`${isAnswered ? "text-green-500" : "text-gray-300"}`}
              size="xl"
            />
          )}
        </div>
      </div>
    </div>
  );
}
