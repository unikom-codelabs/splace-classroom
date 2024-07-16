"use client";
import { QuizCreator } from "@/components/quiz/QuizCreator";
import { Question } from "@/core/entity/Question";
import { QuestionType } from "@/core/entity/QuestionType";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  CalendarDate,
  DatePicker,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { QUIZ_DURATION } from "./data";
import { createQuizUseCase } from "@/core/usecase/createQuizUseCase";
import { QuizType } from "@/core/entity/QuizType";

const MULTIPLE_QUESTION_DEFAULT = {
  title: "",
  choices: ["", "", "", ""],
  answer: [""],
  point: 0,
  type: QuestionType.Choice,
};

const ESSAY_QUESTION_DEFAULT = {
  title: "",
  choices: [""],
  answer: [""],
  point: 0,
  type: QuestionType.Essay,
};

export default function Page({
  searchParams,
}: {
  searchParams: {
    course_id: number;
    qname: string;
  };
}) {
  const { course_id, qname } = searchParams;
  const router = useRouter();
  const [changeQuizName, setChangeQuizName] = useState(false);
  const [quizName, setQuizName] = useState(qname);
  const [loading, setLoading] = useState(false);
  const [quizDuration, setQuizDuration] = useState("45");
  const [deadline, setDeadline] = useState<CalendarDate | null>(null);

  const [questions, setQuestions] = useState<Question[]>([]);

  const [questionFormLoading, setQuestionFormLoading] = useState(true);

  const questionsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const listOfQuestions: Question[] = [];
    listOfQuestions.push(MULTIPLE_QUESTION_DEFAULT);
    listOfQuestions.push(ESSAY_QUESTION_DEFAULT);
    setQuestions(listOfQuestions);
    setQuestionFormLoading(false);
  }, []);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

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

  const extractQuestionsTitleAnswer = (): {
    title: string | undefined | null;
    answer: string[];
    choices: string[];
    type: QuestionType;
  }[] => {
    let result: { title: string | undefined | null; answer: string[], choices: string[], type: QuestionType }[] = [];

    questionsRef.current?.querySelectorAll(".question-card").forEach((el) => {
      let title: string | undefined | null = "";
      let choices: string[] = [];
      let choicesAnswer: any;
      let answer: string[] = [];
      let type: QuestionType = QuestionType.Choice;

      const questionType = el.getAttribute("data-question-type");

      title = el
        .querySelector(".question-title")
        ?.querySelector("input")?.value;

      if (!title) throw new Error("Question title is required"); 

      if (questionType === QuestionType.Choice) {
        type = QuestionType.Choice;
        let choicesElement = el.querySelectorAll(".question-choice");

        if(choicesElement.length === 0) throw new Error("Choices is required");


        choicesElement.forEach((el: Element) => {
          const choice = el.querySelector("input")?.value;
          console.log(choice)
          if (choice) {
            choices.push(choice);
          } else {
            throw new Error("Choices is required");
          }
        });
        
        choicesAnswer = el
          .querySelector(".question-choice-answer:checked")
          ?.getAttribute("data-index");

        if (choicesAnswer) {
          choicesAnswer = parseInt(choicesAnswer);
          answer.push(choices[choicesAnswer]);
        } else {
          throw new Error("Answer is required");
        }
      } else if (questionType === QuestionType.Multiple) {
        type = QuestionType.Multiple;
        let choicesElement = el.querySelectorAll(".question-choice");
        if(choicesElement.length === 0) throw new Error("Choices is required");

        choicesElement.forEach((el: Element) => {
          const choice = el.querySelector("input")?.value;
          if (choice) {
            choices.push(choice);
          } else {
            throw new Error("Choices is required");
          }
        });

        choicesAnswer = el.querySelectorAll(".question-choice-answer:checked");

        let selectedIndex: number[] = [];
        choicesAnswer.forEach((el: Element) => {
          const dataIndex = el.getAttribute("data-index");
          if (dataIndex) {
            selectedIndex.push(parseInt(dataIndex));
          } else {
            throw new Error("Answer is required");
          }
        });
        for (let i = 0; i < selectedIndex.length; i++) {
          answer.push(choices[selectedIndex[i]]);
        }
      } else {
        type = QuestionType.Essay;
        const questAnswer = el
          .querySelector(".question-answer")
          ?.querySelector("input")?.value;
        if (questAnswer) {
          answer.push(questAnswer);
        } else {
          throw new Error("Answer is required");
        }
      }
      result.push({ title, answer, choices, type });
    });

    return result;
  };

  async function handleCreateQuiz(e: any) {
    e.preventDefault();
    setLoading(true);
    try {
      const questionTitle = extractQuestionsTitleAnswer();
      const pointPerQuestion = 100 / questions.length;
      const newQuestions = questions.map((question, index) => {
        return {
          ...question,
          title: questionTitle[index].title,
          answer: questionTitle[index].answer,
          choices: questionTitle[index].choices,
          type: questionTitle[index].type,
          point: pointPerQuestion,
        };
      }) as Question[];

      if (deadline === null) {
        throw new Error("Deadline is required");
      }
      if (newQuestions.length === 0) {
        throw new Error("Question is required");
      }
      if (quizName === "") {
        throw new Error("Quiz name is required");
      }
      console.log(newQuestions)
      
      const res = await createQuizUseCase({
        course_id: course_id,
        name: quizName,
        type: QuizType.PUBLISHED,
        questions: newQuestions,
        deadline: deadline?.toString(),
        start_at: new Date().toISOString(),
        end_at: new Date().toISOString(),
        duration: parseInt(quizDuration),
      });
      if (res) return router.push(`/quiz`);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error instanceof Error ? error.message : "Something went wrong",
      });
      console.error(error);
    }
    setLoading(false);
  }

  const onAddQuestionMultiple = () => {
    setQuestions([...questions, MULTIPLE_QUESTION_DEFAULT]);
  };

  const onAddQuestionEssay = () => {
    setQuestions([...questions, ESSAY_QUESTION_DEFAULT]);
  };

  const onRemoveQuestion = (index: number) => {
    console.log(index);
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

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
          questionsRef={questionsRef}
          questions={questions}
          onSubmit={handleCreateQuiz}
          loadingSubmit={loading}
          questionFormLoading={questionFormLoading}
          onAddQuestionMultiple={onAddQuestionMultiple}
          onAddQuestionEssay={onAddQuestionEssay}
          onRemoveQuestion={onRemoveQuestion}
        />
      </section>
    </section>
  );
}
