"use client";
import { QuizList } from "@/components/quiz/quizList";
import QuizNavigation from "@/components/quiz/quizNavigation";
import { QuizReview } from "@/components/quiz/quizReview";
import { Answer } from "@/core/entity/Answer";
import { QuestionType } from "@/core/entity/QuestionType";
import { Quiz } from "@/core/entity/Quiz";
import { finishAnswerQuizUseCase } from "@/core/usecase/finishAnswerQuizUseCase";
import { getUserQuizUseCase } from "@/core/usecase/getUserQuizUseCase";
import fetchApi from "@/utils/fetchApi";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Swal from "sweetalert2";

const QUESTION_PER_PAGE = 5;

export default function page({ params: { id } }: { params: { id: any } }) {
  const router = useRouter();

  const [quiz, setQuiz] = useState<Quiz>();

  const [answers, setAnswers] = useState<Answer[]>([]);

  const [loading, setLoading] = useState(true);

  const quizListRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [timeLeft, setTimeLeft] = useState(0);

  const [isFinishAttempt, setIsFinishAttempt] = useState(false);

  const pageNumber = useMemo(() => {
    if (quiz?.questions) {
      return Math.ceil(quiz.questions.length / QUESTION_PER_PAGE);
    }
    return 0;
  }, [quiz]);

  useEffect(() => {
    const input = quizListRef.current?.querySelectorAll("input");
    input?.forEach((item) => {
      item.addEventListener("change", handleSaveAnswer);
    });
    return () => {
      input?.forEach((item) => {
        item.removeEventListener("change", handleSaveAnswer);
      });
    };
  });

  const handleSaveAnswer = useCallback(async () => {
    const listOfQuizContainer =
      quizListRef.current?.querySelectorAll(".quiz-container");

    listOfQuizContainer?.forEach((quizContainer, index) => {
      const questionId = quizContainer.getAttribute("data-question-id");
      const questionType = quizContainer.getAttribute("data-question-type");
      let questionAnswer: string[] = [];

      const quizInput = quizContainer.querySelectorAll("input");

      if (questionType == QuestionType.Essay) {
        if (quizInput[0].value) {
          questionAnswer.push(quizInput[0].value);
        }
      } else if (questionType == QuestionType.Choice) {
        const checkedInput = quizContainer.querySelector(
          "input:checked"
        ) as HTMLInputElement;
        if (checkedInput?.value) {
          questionAnswer.push(checkedInput?.value);
        }
      } else if (questionType == QuestionType.Multiple) {
        quizInput.forEach((input) => {
          if (input.checked) {
            if (input.value) {
              questionAnswer.push(input.value);
            }
          }
        });
      }
      if (questionId) {
        setAnswers((prev) => {
          const newAnswer = prev.filter(
            (item) => item.id !== parseInt(questionId)
          );
          return [
            ...newAnswer,
            {
              id: parseInt(questionId),
              answer: questionAnswer,
            },
          ];
        });
      }
    });
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    handleSaveAnswer();
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
    handleSaveAnswer();
  };

  const currentQuestions = useMemo(() => {
    const start = (currentPage - 1) * QUESTION_PER_PAGE;
    return (
      quiz?.questions
        ?.slice(start, start + QUESTION_PER_PAGE)
        .map((item, i) => ({
          ...item,
          no: start + i + 1,
        })) || []
    );
  }, [currentPage, pageNumber]);

  const handleNavigationPageClick = (page: number) => {
    const navigationPage = Math.ceil(page / QUESTION_PER_PAGE);
    setIsFinishAttempt(false);
    setCurrentPage(navigationPage);
    handleSaveAnswer();
  };

  const getUserQuiz = async () => {
    const quiz = await getUserQuizUseCase(id);
    setQuiz(quiz);
  };

  const getInitialAnswer = useCallback(() => {
    if (quiz?.questions) {
      const answer = quiz.questions.map((question) => ({
        id: question.id || 0,
        answer: [],
      }));
      setAnswers(answer);
    }
  }, [quiz]);

  useEffect(() => {
    getUserQuiz().then(() => setLoading(false));
  }, []);

  useEffect(() => {
    setTimeLeft((quiz?.duration || 0) * 60);
    getInitialAnswer();
  }, [quiz]);

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  const onSubmitAllAndFinish = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, submit it!",
        cancelButtonText: "No, cancel!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await handleSaveAnswer();
          await finishAnswerQuizUseCase(id, {
            answers,
            duration: timeLeft,
          });
          Swal.fire("Success!", "Your answer has been submitted.", "success").then((result) => {
            result.isConfirmed && router.push(`/quiz/${id}/result`);
          });
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error instanceof Error ? error.message : "Something went wrong",
      });
      console.error(error);
    }
  };

  if (loading) return <Spinner className="w-full text-center" />;
  return (
    <>
      <style>{"html { scroll-padding: 74px; scroll-behavior: smooth}"}</style>
      <header className="bg-white p-4 px-10">
        <h1 className="font-bold text-dark-blue text-xl">{quiz?.name}</h1>
      </header>
      <section>
        <div className="flex flex-col md:grid p-5 lg:px-28 gap-3 md:grid-cols-[1fr_400px]">
          {isFinishAttempt ? (
            <QuizReview
              questions={quiz?.questions || []}
              answers={answers}
              onSubmit={onSubmitAllAndFinish}
            />
          ) : (
            <div className=" container order-2 md:order-1">
              <QuizList
                questions={currentQuestions}
                quizListRef={quizListRef}
                answer={answers}
              />
              <div className="flex flex-row justify-between py-5">
                {currentPage > 1 && (
                  <Button
                    radius="sm"
                    variant="bordered"
                    className="font-bold text-gray-500"
                    onClick={handlePrevPage}
                  >
                    Previous Page
                  </Button>
                )}
                {currentPage < pageNumber && (
                  <Button
                    radius="sm"
                    variant="flat"
                    className="text-white font-bold bg-dark-blue"
                    onClick={handleNextPage}
                  >
                    Next Page
                  </Button>
                )}
              </div>
            </div>
          )}
          <QuizNavigation
            handleNavigationPageClick={handleNavigationPageClick}
            isFinishAttempt={isFinishAttempt}
            toggleFinishAttempt={() => {
              handleSaveAnswer();
              setIsFinishAttempt(!isFinishAttempt);
            }}
            questions={quiz?.questions || []}
            answers={answers}
            duration={timeLeft}
          />
        </div>
      </section>
    </>
  );
}
