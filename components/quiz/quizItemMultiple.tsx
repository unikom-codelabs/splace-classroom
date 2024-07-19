"use client";
import { QuestionType } from "@/core/entity/QuestionType";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { Button, Radio, RadioGroup } from "@nextui-org/react";
import React, { useEffect, useMemo } from "react";

export default function QuizItemMultiple({
  no,
  title,
  choices,
  questionType,
  id,
  answer,
}: {
  no: number;
  title: string;
  choices: string[];
  questionType: QuestionType;
  id?: number;
  answer?: string[];
}) {
  const defaultValue = useMemo(() => {
    if (answer && answer.length > 0) {
      return answer;
    }
  }, [answer]);

  return (
    <div
      data-question-id={`${id}`}
      data-question-type={questionType}
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
          {questionType == QuestionType.Multiple ? (
            <div className="flex flex-col gap-3">
              <CheckboxGroup radius="sm" color="primary" defaultValue={defaultValue}>
                {choices.map((choice, index) => {
                  return (
                    <Checkbox key={index} value={choice}>
                      {choice}
                    </Checkbox>
                  );
                })}
              </CheckboxGroup>
            </div>
          ) : (
            <RadioGroup defaultValue={defaultValue && defaultValue[0]}>
              {choices.map((choice, index) => {
                return (
                  <Radio
                    key={index}
                    value={choice}
                  >
                    {choice}
                  </Radio>
                );
              })}
            </RadioGroup>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
