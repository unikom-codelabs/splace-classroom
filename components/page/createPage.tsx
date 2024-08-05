import { QUIZ_DURATION } from "@/app/quiz/create/data";
import { createQuizUseCase } from "@/core/usecase/createQuizUseCase";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker } from "@nextui-org/date-picker";
import {
  Button,
  Input,
  Select,
  SelectItem,
  TimeInput,
} from "@nextui-org/react";
import { QuizCreator } from "../quiz/QuizCreator";

import { useRouter } from "next/navigation";

import { Question } from "@/core/entity/Question";
import { QuestionType } from "@/core/entity/QuestionType";
import { QuizType } from "@/core/entity/QuizType";
import { parseDeadlineDateTime } from "@/utils/dateUtils";
import {
  CalendarDate,
  CalendarDateTime,
  Time,
  ZonedDateTime,
} from "@internationalized/date";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const MULTIPLE_QUESTION_DEFAULT = {
  title: "",
  choices: ["", "", "", ""],
  answer: [""],
  point: 0,
  type: QuestionType.Choice,
  percentage: 0,
};

const ESSAY_QUESTION_DEFAULT = {
  title: "",
  choices: [""],
  answer: [""],
  point: 0,
  type: QuestionType.Essay,
  percentage: 0,
};

const DUMMY_PAGE_QUESTION: Question[] = [
  {
    title: "Silahkan piliha salah satu",
    choices: ["a", "b", "c", "d"],
    answer: ["a"],
    type: QuestionType.Choice,
    percentage: 0,
  },
  {
    title: "Esasay",
    choices: [],
    answer: ["jawaban essay"],
    type: QuestionType.Essay,
    percentage: 0,
  },
  {
    title: "Silahkan Pilih Semua Yang Menurut Anda Benar",
    choices: ["1", "2", "3", "4"],
    answer: ["1", "4"],
    type: QuestionType.Multiple,
    percentage: 0,
  },
];

const CreatePage = ({
  searchParams,
  pageQuestions = DUMMY_PAGE_QUESTION,
  quizDeadline,
  quizDurationHours,
  quizDurationMinutes,
}: {
  searchParams: {
    course_id: number;
    qname: string;
  };
  pageQuestions: Question[];
  quizDeadline?: CalendarDateTime;
  quizDurationHours?: number;
  quizDurationMinutes?: number;
}) => {
  const { course_id, qname } = searchParams;
  const router = useRouter();
  const [changeQuizName, setChangeQuizName] = useState(false);
  const [quizName, setQuizName] = useState(qname);
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(
    new Time(quizDurationHours, quizDurationMinutes)
  );
  const [deadline, setDeadline] = useState<
    ZonedDateTime | CalendarDate | CalendarDateTime | null
  >(quizDeadline || null);

  const [questions, setQuestions] = useState<Question[]>(pageQuestions);

  const [questionFormLoading, setQuestionFormLoading] = useState(true);

  const questionsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (pageQuestions.length == 0) {
      const listOfQuestions: Question[] = [];
      listOfQuestions.push(MULTIPLE_QUESTION_DEFAULT);
      listOfQuestions.push(ESSAY_QUESTION_DEFAULT);
      setQuestions(listOfQuestions);
    }
    setQuestionFormLoading(false);
  }, []);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  const handleChangeQuizName = (value: string) => {
    setQuizName(value);
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
    let result: {
      title: string | undefined | null;
      answer: string[];
      choices: string[];
      type: QuestionType;
    }[] = [];

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

        if (choicesElement.length === 0) throw new Error("Choices is required");

        choicesElement.forEach((el: Element) => {
          const choice = el.querySelector("input")?.value;
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
        if (choicesElement.length === 0) throw new Error("Choices is required");

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
      // const pointPerQuestion = 100 / questions.length;
      // get total question by type
      let choice = 0;
      let multipleChoice = 0;
      let essay = 0;

      questionTitle.forEach((question) => {
        if (question.type === QuestionType.Choice) {
          choice++;
        } else if (question.type === QuestionType.Multiple) {
          multipleChoice++;
        } else {
          essay++;
        }
      });

      //   quizzes.forEach(quiz => {
      //     const quizPoints = (totalPoints * quiz.percentage) / 100;
      //     points[quiz.type] = quizPoints / quiz.count;
      //   });

      //   return points;
      // }

      // const totalPoints = 100;
      // const points = calculatePoints(quizzes, totalPoints);

      const newQuestions = questions.map((question, index) => {
        const countQuizType =
          question.type === QuestionType.Choice
            ? choice
            : question.type === QuestionType.Multiple
            ? multipleChoice
            : essay;
        return {
          ...question,
          title: questionTitle[index].title,
          answer: questionTitle[index].answer,
          choices: questionTitle[index].choices,
          type: questionTitle[index].type,
          point:
            (100 * ((question.percentage || questions.length) * 100)) /
            100 /
            countQuizType,
        };
      }) as Question[];

      newQuestions.forEach((question) => {
        delete question.percentage;
      });

      if (newQuestions.length === 0) {
        throw new Error("Question is required");
      }
      if (deadline === null) {
        throw new Error("Deadline is required");
      }
      if (newQuestions.length === 0) {
        throw new Error("Question is required");
      }
      if (quizName === "") {
        throw new Error("Quiz name is required");
      }
      if (duration.hour === 0 && duration.minute === 0) {
        throw new Error("Quiz duration is not valid");
      }

      const res = await createQuizUseCase({
        course_id: course_id,
        name: quizName,
        type: QuizType.PUBLISHED,
        questions: newQuestions,
        deadline: parseDeadlineDateTime(deadline.toString()),
        start_at: parseDeadlineDateTime(deadline.toString()),
        end_at: parseDeadlineDateTime(deadline.toString()),
        duration: duration.hour * 60 + duration.minute,
      });
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Quiz has been created",
        }).then((e) => {
          e.isConfirmed && router.push("/quiz");
        });
      }
    } catch (error) {
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
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  useEffect(() => {
    if (course_id === undefined) router.push("/quiz");
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
          <TimeInput
            label="Quiz Duration"
            placeholder="Enter Quiz Duration"
            className="w-56"
            granularity="minute"
            variant="bordered"
            hourCycle={24}
            value={duration}
            onChange={setDuration}
          />
          <DatePicker
            value={deadline}
            label="Deadline"
            variant="bordered"
            className="w-56"
            hideTimeZone
            onChange={setDeadline}
            showMonthAndYearPickers
            hourCycle={24}
            granularity="minute"
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
};

export default CreatePage;
