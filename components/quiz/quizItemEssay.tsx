"use client";
import { QuestionType } from "@/core/entity/QuestionType";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/react";
import { useMemo } from "react";

export default function QuizItemEssay({
  no,
  title,
  id,
  answer,
}: {
  no: number;
  title: string;
  id?: number;
  answer?: string[];
}) {
  const defaultValue = useMemo(() => {
    if(answer && answer.length > 0) {
      return answer[0]
    }
  }, [answer])
  return (
    <div
      data-question-id={`${id}`}
      data-question-type={`${QuestionType.Essay}`}
      className="quiz-container space-y-1"
    >
      <Card
        id={`${no}`}
        className="p-4 w-full border-gray-300 border-1"
        radius="none"
        shadow="none"
      >
        <h1>Question {no}</h1>
      </Card>
      <Card
        className="p-2 w-full border-gray-300 border-1"
        radius="none"
        shadow="none"
      >
        <CardBody className="space-y-2">
          <h1>{title}</h1>
          <Input type="text" placeholder="Type your answer here" defaultValue={defaultValue}/>
        </CardBody>
      </Card>
    </div>
  );
}
