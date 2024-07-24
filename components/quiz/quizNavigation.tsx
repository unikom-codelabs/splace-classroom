"use client";
import { Answer } from "@/core/entity/Answer";
import { Question } from "@/core/entity/Question";
import { Icon } from "@iconify/react";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import NextLink from "next/link";
import { useCallback } from "react";
export default function QuizNavigation({
  handleNavigationPageClick,
  isFinishAttempt,
  toggleFinishAttempt,
  questions,
  answers,
  duration,
}: {
  handleNavigationPageClick: (index: number) => void;
  toggleFinishAttempt: () => void;
  isFinishAttempt: boolean;
  questions: Question[];
  answers: Answer[];
  duration?: number;
}) {
  const formatTime = useCallback((timeInSeconds: number) => {
    let formattedTime = "";
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60).toString().padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");

    if (hours > 0) {
      formattedTime += `${hours}:`;
    }
    formattedTime += `${minutes}:${seconds}`;

    return formattedTime;
  }, []);

  return (
    <Card
      className="order-1 md:order-2 h-fit px-5 py-2 md:sticky md:top-20 bg-[#E7F1F9]"
      radius="sm"
      shadow="none"
    >
      <CardHeader>
        <h1 className="text-center w-full font-medium">Quiz Navigation</h1>
      </CardHeader>
      <CardBody>
        <div className="flex flex-row w-full flex-wrap md:grid md:grid-cols-[repeat(3,minmax(40px,1fr))] lg:grid-cols-[repeat(5,minmax(40px,1fr))] gap-5">
          {questions.map((question, index: number) => {
            const answered =
              (answers.find((answer) => answer.id === question.id)?.answer
                .length || 0) > 0 || false;
            return (
              <NextLink
                href={`#${index + 1}`}
                onClick={() => handleNavigationPageClick(index + 1)}
                key={index}
                className={`bg-white items-center flex justify-between flex-col w-8 h-8 md:w-auto md:h-10`}
              >
                <p className="font-medium flex-1">{index + 1}</p>
                <div
                  className={`${
                    answered ? "bg-dark-blue" : "bg-gray-300"
                  } h-1/4 w-full`}
                />
              </NextLink>
            );
          })}
        </div>
      </CardBody>
      <CardFooter>
        <div className="flex flex-col w-full gap-4">
          <div>
            <Button
              onClick={toggleFinishAttempt}
              className="w-full bg-white font-medium text-base"
              radius="sm"
            >
              {isFinishAttempt ? "Return Attempt" : "Finish Attempt"}
            </Button>
          </div>
          <div className="inline-block w-fit px-3 py-1 bg-[#B0FEC1] rounded-[4px]">
            <div className="flex gap-2 items-center">
              <span className="bg-[#FD5839] text-white inline-flex p-2 rounded-full text-xl">
                <Icon icon="icon-park-outline:time" />
              </span>
              <p className="font-medium text-[#09A554]">
                Time Left:{" "}
                <span className="font-bold">{formatTime(duration || 0)}</span>
              </p>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
