"use client";

import { QuestionType } from "@/core/entity/QuestionType";
import { getQuizReviewUserUseCase } from "@/core/usecase/getQuizReviewUserUseCase";
import {
  Checkbox,
  CheckboxGroup,
  Input,
  Radio,
  RadioGroup,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useMemo } from "react";
import useSWR from "swr";

export default function page({
  params: { id: quizId, studentId },
}: {
  params: { id: number; studentId: number };
}) {
  const { data, isLoading } = useSWR(["quiz", "user"], () =>
    getQuizReviewUserUseCase(quizId, studentId)
  );

  const quiz = useMemo(() => {
    return data?.quiz || [];
  }, [data, isLoading]);

  useEffect(() => {
    console.log(quiz);
  }, [quiz]);

  if (isLoading) return <Spinner className="w-full text-center" />;
  return (
    <>
      <section className="p-5 w-screen lg:max-w-6xl lg:mx-auto space-y-5">
        <header className="bg-white p-4 shadow-md">
          <h1 className="text-xl font-bold text-dark-blue">Quiz</h1>
        </header>
        <div className="flex gap-5 flex-col md:flex-row">
          <div>
            <div className="sticky top-[72px] flex flex-col bg-white p-5 rounded-xl border-[0.5px] border-[#BFBFBF] gap-4 md:max-w-72 md:min-w-72">
              <div>
                <ReviewQuizDetailTitleItem title="Student ID" />
                <ReviewQuizDetailDescItem desc={data?.username} />
              </div>
              <div>
                <ReviewQuizDetailTitleItem title="Class" />
                <ReviewQuizDetailDescItem desc={data?.course_name} />
              </div>
              <div>
                <ReviewQuizDetailTitleItem title="Correct Answer" />
                <ReviewQuizDetailDescItem
                  desc={`${data?.correct_answer}`}
                  stateColor="green"
                />
              </div>
              <div>
                <ReviewQuizDetailTitleItem title="Wrong Answer" />
                <ReviewQuizDetailDescItem
                  desc={`${data?.wrong_answer}`}
                  stateColor="red"
                />
              </div>
              <div>
                <ReviewQuizDetailTitleItem title="Score" />
                <ReviewQuizDetailDescItem desc={`${data?.score}`} />
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            {quiz.map((q, i) => (
              <div key={q.id} className="flex flex-col gap-2">
                <div className="border flex justify-between items-center px-4 py-5 bg-white">
                  <h5 className="font-medium">Question {i + 1}</h5>
                  <div className="flex items-center gap-3">
                    <select name="point" id={`questionValue-${i}`}>
                      <option value="0">0</option>
                      <option value="2">2</option>
                      <option value="5">5</option>
                      <option value={q.point} selected>
                        {q.point}
                      </option>
                    </select>
                    <label htmlFor={`questionValue-${i}`}>Points</label>
                  </div>
                </div>
                <div className="flex flex-col border p-3 bg-white">
                  <p className="text-lg mb-3">{q.title}</p>
                  <p className="mb-2 font-medium">Answer: </p>
                  {q.type === QuestionType.Essay && (
                    <Textarea
                      className="mb-3"
                      defaultValue={q.answer[0]}
                      readOnly
                    />
                  )}
                  {q.type === QuestionType.Choice && (
                    <RadioGroup defaultValue={q.answer[0]} isReadOnly>
                      {q.choices.map((choice, i) => (
                        <Radio key={i} value={choice}>
                          {choice}
                        </Radio>
                      ))}
                    </RadioGroup>
                  )}

                  {q.type === QuestionType.Multiple && (
                    <CheckboxGroup value={q.answer} isReadOnly>
                      {q.choices.map((choice, i) => (
                        <Checkbox
                          key={i}
                          value={choice}
                          checked={q.answer.includes(choice)}
                        >
                          {choice}
                        </Checkbox>
                      ))}
                    </CheckboxGroup>
                  )}
                  <div>
                    <p className="text-dark-blue mt-3 mb-1 font-medium">
                      Key Answer:{" "}
                    </p>
                    <p className="font-semibold">
                      {q.answer.map(
                        (a:any, i:any) => `${a} ${i + 1 !== q.answer.length ? "," : ""}`
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const ReviewQuizDetailTitleItem = ({ title }: { title: string }) => {
  return <h4 className="text-lg font-normal text-[#404040] mb-1">{title}</h4>;
};

const ReviewQuizDetailDescItem = ({
  desc,
  stateColor,
}: {
  desc?: string;
  stateColor?: "green" | "red";
}) => {
  return (
    <p
      className={`text-base font-bold ${
        stateColor == "green"
          ? "text-green-500"
          : stateColor == "red"
          ? "text-red-500"
          : "text-dark-blue"
      }`}
    >
      {desc || "-"}
    </p>
  );
};

const TABLE_COLUMN = [
  {
    key: "nim",
    label: "Username",
  },
  {
    key: "class",
    label: "Class",
  },
  {
    key: "correctAnswer",
    label: "Correct Answer",
  },
  {
    key: "wrongAnswer",
    label: "Wrong Answer",
  },
  {
    key: "score",
    label: "Score",
  },
  {
    key: "action",
    label: "Action",
  },
];
