"use client";
import { QuizCreator } from "@/components/quiz/QuizCreator";
import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import fetchApi from "@/utils/fetchApi";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import {
  CalendarDate,
  DatePicker,
  DateValue,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { QUIZ_DURATION } from "./data";

export default function Page({
  searchParams,
}: {
  searchParams: {
    course_id: BigInt;
    qname: string;
    type: string;
  };
}) {
  const { course_id, qname, type } = searchParams;
  const router = useRouter();
  const [changeQuizName, setChangeQuizName] = useState(false);
  const [quizName, setQuizName] = useState(qname);
  const [loading, setLoading] = useState(false);
  const [quizDuration, setQuizDuration] = useState("45");
  const [deadline, setDeadline] = useState<CalendarDate | null>(null);

  const handleChangeQuizName = (value: string) => {
    setQuizName(value);
  };

  const handleChangeQuizDuration = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const quizDuration = e.target.value;
    setQuizDuration(quizDuration);
  };

  const handleToggleChangeQuizName = () => {
    if (quizName === "") setQuizName(qname);
    setChangeQuizName(!changeQuizName);
  };

  async function handleSubmit(e: any, data: any) {
    e.preventDefault();
    setLoading(true);
    try {
      if (!quizDuration || !deadline)
        throw new Error("Please fill in the duration and deadline");

      const res = await fetchApi("/quiz", "POST", {
        ...data,
        duration: parseInt(quizDuration),
        deadline: Date.parse(deadline?.toString() || ""),
      });
      if (res) return router.push(`/quiz`);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (course_id === undefined) return router.push("/quiz");
  }, []);

  return (
    <section className="max-w-4xl mx-auto my-5 space-y-3 p-2 lg:p-0">
      <header className="bg-white shadow-sm p-5 border-1 border-gray-300 flex gap-2 items-center sticky top-0">
        <Button
          radius="full"
          size="lg"
          variant="light"
          isIconOnly
          onClick={handleToggleChangeQuizName}
        >
          <FontAwesomeIcon icon={faPenToSquare} className="text-dark-blue" />
        </Button>
        {changeQuizName ? (
          <Input
            type="text"
            value={quizName}
            className="w-fit"
            variant="underlined"
            size="sm"
            onChange={(e) => handleChangeQuizName(e.target.value)}
          />
        ) : (
          <h1>{quizName}</h1>
        )}
        <div className="ml-auto flex flex-row gap-2">
          <Select
            label="Quiz Duration"
            placeholder="Select Quiz Duration"
            className="w-56"
            selectedKeys={[quizDuration]}
            onChange={handleChangeQuizDuration}
          >
            {QUIZ_DURATION.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>
          <DatePicker
            value={deadline}
            label="Deadline"
            className="w-[160px]"
            onChange={setDeadline}
          />
        </div>
      </header>
      <section>
        <QuizCreator
          courseId={course_id}
          quizName={quizName}
          onSubmit={handleSubmit}
          type={type}
          loadingSubmit={loading}
        />
      </section>
    </section>
  );
}
