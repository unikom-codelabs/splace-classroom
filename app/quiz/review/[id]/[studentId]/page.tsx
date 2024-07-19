"use client";

import { Icon } from "@iconify/react";
import {
  Button,
  getKeyValue,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";

export default function page({
  params: { id: quizId, studentId },
}: {
  params: { id: number; studentId: number };
}) {
  const [isLoading, setIsLoading] = useState(true);

  const tableBodyItem = useMemo(() => {
    setIsLoading(false);
    return Array(20)
      .fill(null)
      .map((_, i) => {
        return {
          id: i + 1,
          nim: "123456789",
          class: "A",
          correctAnswer: "10",
          wrongAnswer: "10",
          score: "50",
        };
      });
  }, []);

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
                <ReviewQuizDetailDescItem desc="1021338" />
              </div>
              <div>
                <ReviewQuizDetailTitleItem title="Class" />
                <ReviewQuizDetailDescItem desc="IF-1" />
              </div>
              <div>
                <ReviewQuizDetailTitleItem title="Correct Answer" />
                <ReviewQuizDetailDescItem desc="8" stateColor="green" />
              </div>
              <div>
                <ReviewQuizDetailTitleItem title="Wrong Answer" />
                <ReviewQuizDetailDescItem desc="2" stateColor="red" />
              </div>
              <div>
                <ReviewQuizDetailTitleItem title="Score" />
                <ReviewQuizDetailDescItem desc="80" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div>
              <div className="flex justify-between">
                <h5>Question 1</h5>
                <select name="" id="">
                    <option value="">2</option>
                    <option value="">5</option>
                </select>
              </div>
              <div className="flex flex-col">
                <p>Definition of Data Science</p>
                <p>Answer: </p>
                <input type="text" />
                <div>
                  <p>Key Answer: </p>
                  <p>Data is number</p>
                </div>
              </div>
            </div>
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
  desc: string;
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
      {desc}
    </p>
  );
};

const TABLE_COLUMN = [
  {
    key: "nim",
    label: "NIM",
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
