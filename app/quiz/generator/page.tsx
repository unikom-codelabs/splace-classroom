"use client";
import CreatePage from "@/components/page/createPage";
import { Course } from "@/core/entity/Course";
import { GenerateQuizRequest } from "@/core/entity/GenerateQuizRequest";
import { Module } from "@/core/entity/Module";
import { Question } from "@/core/entity/Question";
import { QuestionType } from "@/core/entity/QuestionType";
import { QuizType } from "@/core/entity/QuizType";
import { generateQuizRAGUseCase } from "@/core/usecase/generateQuizRAGUseCase";
import { getCourseUseCase } from "@/core/usecase/getCourseUseCase";
import { getModuleUseCase } from "@/core/usecase/getModuleUseCase";
import { parseDayDate, parseMonthDate, parseYearDate } from "@/utils/dateUtils";
import { Icon } from "@iconify/react";
import { CalendarDateTime } from "@internationalized/date";
import {
  Button,
  CalendarDate,
  Card,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Input,
  Select,
  Selection,
  SelectItem,
  Spinner,
  Tooltip,
} from "@nextui-org/react";

import { Slider } from "@nextui-org/slider";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import useSWR from "swr";

export default function page() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizName, setQuizName] = useState("");
  const [quizCourses, setQuizCourses] = useState("");
  const [quizModule, setQuizModule] = useState("");
  const [quizQuery, setQuizQuery] = useState("");
  const [quizDeadlineDate, setQuizDeadlineDate] = useState<CalendarDate | null>(
    null
  );
  const [quizDeadlineHours, setQuizDeadlineHours] = useState("00");
  const [quizDeadlineMinutes, setQuizDeadlineMinutes] = useState("00");
  const [quizDurationHours, setQuizDurationHours] = useState("00");
  const [quizDurationMinutes, setQuizDurationMinutes] = useState("00");
  const [questionType, setQuestionType] = useState<string[]>([]);
  const [numberOfQuestionChoice, setNumberOfQuestionChoice] = useState("");
  const [numberOfQuestionMultiple, setNumberOfQuestionMultiple] = useState("");
  const [numberOfQuestionEssay, setNumberOfQuestionEssay] = useState("");
  const [choicePointPercentage, setChoicePointPercentage] = useState(0);
  const [multiplePointPercentage, setMultiplePointPercentage] = useState(0);
  const [essayPointPercentage, setEssayPointPercentage] = useState(0);

  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [isGenerated, setIsGenerated] = useState(false);

  const { data: courses, isValidating: isGettingCourses } = useSWR<Course[]>(
    "courses",
    getCourseUseCase
  );
  const { data: modules, isValidating: isGettingModules } = useSWR<Module[]>(
    ["modules", quizCourses],
    () => getModuleUseCase(quizCourses)
  );

  const typeChecked = useMemo(() => {
    const choice = questionType.includes(QuestionType.Choice);
    const multiple = questionType.includes(QuestionType.Multiple);
    const essay = questionType.includes(QuestionType.Essay);

    if (!choice) {
      setNumberOfQuestionChoice("");
      setChoicePointPercentage(0);
    }
    if (!multiple) {
      setNumberOfQuestionMultiple("");
      setMultiplePointPercentage(0);
    }
    if (!essay) {
      setNumberOfQuestionEssay("");
      setEssayPointPercentage(0);
    }

    return {
      choice: choice,
      multiple: multiple,
      essay: essay,
    };
  }, [questionType]);

  const quizDeadline = useCallback(() => {
    return `${quizDeadlineDate?.toString()} ${quizDeadlineHours || 0}:${
      quizDeadlineMinutes || 0
    }:00`;
  }, [quizDeadlineDate, quizDeadlineHours, quizDeadlineMinutes]);

  const validate = () => {
    if (!quizName) throw new Error("Quiz name is required");
    if (!quizCourses) throw new Error("Quiz course is required");
    if (!quizModule) throw new Error("Quiz module is required");
    if (!quizQuery) throw new Error("Quiz query is required");
    if (!quizDeadlineHours) throw new Error("Quiz deadline hours is required");
    if (!quizDeadlineMinutes)
      throw new Error("Quiz deadline minutes is required");
    if (!quizDeadlineDate) throw new Error("Quiz deadline date is required");
    if (!questionType.length) throw new Error("Question type is required");
    if (!quizDurationHours) throw new Error("Quiz duration hours is required");
    if (!quizDurationMinutes)
      throw new Error("Quiz duration minutes is required");

    if (typeChecked.choice) {
      if (!numberOfQuestionChoice) {
        throw new Error("Number of choice question is required");
      }
      if (choicePointPercentage === 0) {
        throw new Error("Choice Point percentage not valid");
      }
    }
    if (typeChecked.multiple) {
      if (!numberOfQuestionMultiple) {
        throw new Error("Number of multiple question is required");
      }
      if (multiplePointPercentage === 0) {
        throw new Error("Multiple Point percentage not valid");
      }
    }
    if (typeChecked.essay) {
      if (!numberOfQuestionEssay) {
        throw new Error("Number of essay question is required");
      }
      if (essayPointPercentage === 0) {
        throw new Error("Essay Point percentage not valid");
      }
    }
  };

  const onGenerateClick = async () => {
    try {
      validate();
      const generateQuizRequest: GenerateQuizRequest = {
        name: quizName,
        course_id: parseInt(quizCourses),
        module_id: parseInt(quizModule),
        query: quizQuery,
        deadline: quizDeadline(),
        start_at: quizDeadlineDate?.toString() || "",
        end_at: quizDeadlineDate?.toString() || "",
        type: QuizType.PUBLISHED,
        duration:
          (parseInt(quizDurationHours) || 0) * 60 +
          (parseInt(quizDurationMinutes) || 0),
        count_types: {
          choices: parseInt(numberOfQuestionChoice) || 0,
          essay: parseInt(numberOfQuestionEssay) || 0,
          multiple: parseInt(numberOfQuestionMultiple) || 0,
        },
        choicesPerception: choicePointPercentage,
        essayPerception: essayPointPercentage,
        multiplePerception: multiplePointPercentage,
      };
      Swal.fire({
        title: "Do you want to generate this quiz?",
        text: "You are about to generate a quiz. Make sure all the information is correct before proceeding.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Generate",
        cancelButtonText: "Cancel",
      }).then(async (response) => {
        if (response.isConfirmed) {
          setIsGenerating(true);
          const res = await generateQuizRAGUseCase(generateQuizRequest);
          if (res) {
            setGeneratedQuestions(res);
            setIsGenerating(false);
            setIsGenerated(true);
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Quiz generated successfully",
            });
          }
          if (!res) {
            setIsGenerating(false);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to generate quiz",
            });
          }
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  };

  const handleChangeChoicePointPercentage = (value: number) => {
    const totalPercentage = 1;
    const remainingPercentage =
      totalPercentage - multiplePointPercentage - essayPointPercentage;
    if (remainingPercentage - value >= 0) {
      setChoicePointPercentage(value);
      return;
    } else {
      setChoicePointPercentage(remainingPercentage);
    }
  };

  const handleChangeMultiplePointPercentage = (value: number) => {
    const totalPercentage = 1;
    const remainingPercentage =
      totalPercentage - choicePointPercentage - essayPointPercentage;

    if (remainingPercentage - value >= 0) {
      setMultiplePointPercentage(value);
      return;
    } else {
      setMultiplePointPercentage(remainingPercentage);
    }
  };

  const handleChangeEssayPointPercentage = (value: number) => {
    const totalPercentage = 1;
    const remainingPercentage =
      totalPercentage - choicePointPercentage - multiplePointPercentage;

    if (remainingPercentage - value >= 0) {
      setEssayPointPercentage(value);
      return;
    } else {
      setEssayPointPercentage(remainingPercentage);
    }
  };

  if (isGenerated) {
    generatedQuestions.forEach((question) => {
      if (question.type === QuestionType.Choice) {
        question.percentage = choicePointPercentage;
      }
      if (question.type === QuestionType.Multiple) {
        question.percentage = multiplePointPercentage;
      }
      if (question.type === QuestionType.Essay) {
        question.percentage = essayPointPercentage;
      }
    });

    return (
      <CreatePage
        searchParams={{ course_id: parseInt(quizCourses), qname: quizName }}
        pageQuestions={generatedQuestions}
        quizDeadline={
          new CalendarDateTime(
            parseInt(parseYearDate(quizDeadline())),
            parseInt(
              parseMonthDate(quizDeadline()),
              parseInt(parseDayDate(quizDeadline()))
            ),
            parseInt(quizDeadlineHours),
            parseInt(quizDeadlineMinutes),
            0
          )
        }
        quizDurationHours={parseInt(quizDurationHours)}
        quizDurationMinutes={parseInt(quizDurationMinutes)}
      />
    );
  }

  return (
    <section className="p-5 w-screen lg:max-w-6xl lg:mx-auto space-y-5">
      {isGenerating && (
        <div className="fixed w-full text-center h-screen top-0 left-0 my-auto bg-black backdrop-blur-[2px] bg-opacity-10 z-[999]">
          <Image
            alt="loading quiz"
            className="mx-auto mt-80"
            src={"/animation/LoadingQuiz.gif"}
            width={150}
            height={150}
          />
          <span className="text-lg font-medium text-black">
            Generating quiz...
          </span>
        </div>
      )}
      <header className="bg-white p-4 shadow-md">
        <div className="flex items-center gap-1 ">
          <Button
            onClick={() => router.back()}
            className="bg-transparent"
            variant="flat"
            size="sm"
          >
            <Icon
              icon="heroicons:chevron-left-solid"
              className="text-2xl font-bold text-dark-blue"
            />
          </Button>
          <h1 className="text-xl font-bold text-dark-blue">Quiz Generator</h1>
        </div>
      </header>
      <Card className="flex flex-col w-full py-6 px-8 gap-5">
        <FormQuizGroup>
          <FormQuizLabel label="Quiz Name" />
          <Input
            value={quizName}
            variant="bordered"
            placeholder="Enter the quiz name here"
            onChange={(e) => setQuizName(e.target.value)}
          />
        </FormQuizGroup>
        <FormQuizGroup>
          <FormQuizLabel label="Course" />
          <Select
            id="courses"
            name="course"
            aria-label="Course"
            onChange={(e) => setQuizCourses(e.target.value)}
            placeholder="Select the quiz course"
            variant="bordered"
            value={quizCourses}
            disabledKeys={[""]}
          >
            {isGettingCourses ? (
              <SelectItem key="">
                <div className="flex w-full items-center justify-center">
                  <Spinner />
                </div>
              </SelectItem>
            ) : (
              courses?.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.name}
                </SelectItem>
              )) || <SelectItem key="">No course available</SelectItem>
            )}
          </Select>
        </FormQuizGroup>
        <FormQuizGroup>
          <FormQuizLabel label="Module" />
          <Select
            id="modules"
            name="module"
            aria-label="Module"
            placeholder="Select the quiz module"
            variant="bordered"
            onChange={(e) => setQuizModule(e.target.value)}
            selectedKeys={quizModule}
            disabledKeys={[""]}
            selectionMode={"single"}
          >
            {isGettingModules ? (
              <SelectItem key="">
                <div className="flex w-full items-center justify-center">
                  <Spinner />
                </div>
              </SelectItem>
            ) : (
              modules?.map((module) => (
                <SelectItem key={module.id}>{module.name}</SelectItem>
              )) || (
                <SelectItem key="">
                  {!quizCourses
                    ? "Select the quiz course"
                    : "No course available"}
                </SelectItem>
              )
            )}
          </Select>
        </FormQuizGroup>
        <FormQuizGroup>
          <FormQuizLabel label="Quiz Query" />
          <Input
            value={quizQuery}
            variant="bordered"
            onChange={(e) => setQuizQuery(e.target.value)}
            placeholder="Enter the title of the material that will be used as a quiz, separate with ',' if more than one material"
          />
        </FormQuizGroup>
        <FormQuizGroup>
          <FormQuizLabel label="Quiz Deadline" />
          <div className="flex items-center gap-5">
            <DatePicker
              aria-labelledby="Deadline"
              variant="bordered"
              value={quizDeadlineDate}
              className="w-56"
              placeholder="Select a date for the quiz deadline"
              onChange={setQuizDeadlineDate}
            />
            <div className="inline-flex items-center gap-4">
              <Input
                type="number"
                maxLength={2}
                max={23}
                min={0}
                variant="bordered"
                value={quizDeadlineHours}
                placeholder="00"
                className=" w-16"
                onChange={(e) => {
                  if (e.target.value.length > 2) return;
                  if (parseInt(e.target.value || "0") > 23) return;
                  setQuizDeadlineHours(e.target.value);
                }}
              />
              <span className="font-medium text-[#494E50]">:</span>
              <Input
                type="number"
                maxLength={2}
                max={59}
                min={0}
                variant="bordered"
                value={quizDeadlineMinutes}
                placeholder="00"
                className="w-16"
                onChange={(e) => {
                  if (e.target.value.length > 2) return;
                  if (parseInt(e.target.value || "0") > 59) return;
                  setQuizDeadlineMinutes(e.target.value);
                }}
              />
            </div>
          </div>
        </FormQuizGroup>
        <FormQuizGroup>
          <FormQuizLabel label="Question Type" />
          <div className="flex flex-col gap-3">
            <CheckboxGroup
              aria-label="Questions Type"
              value={questionType}
              onValueChange={setQuestionType}
            >
              <Checkbox id="choices" value={QuestionType.Choice}>
                Choices
              </Checkbox>
              {typeChecked.choice && (
                <div className="bg-slate-500  p-4 rounded-lg bg-opacity-5 w-fit">
                  <NumberOfQuestionsInput
                    label="Choice"
                    value={numberOfQuestionChoice}
                    onChange={(e) => setNumberOfQuestionChoice(e.target.value)}
                  />
                  <div className="flex flex-col gap-2 mt-2">
                    <p>
                      Question Point Percentage{" "}
                      {Math.round(choicePointPercentage * 100)}%
                    </p>
                    <Slider
                      showTooltip
                      marks={[
                        { value: 0, label: "0%" },
                        { value: 0.2, label: "20%" },
                        { value: 0.4, label: "40%" },
                        { value: 0.6, label: "60%" },
                        { value: 0.8, label: "80%" },
                        { value: 1, label: "100%" },
                      ]}
                      className="max-w-md"
                      value={choicePointPercentage}
                      maxValue={1}
                      minValue={0}
                      step={0.01}
                      formatOptions={{ style: "percent" }}
                      tooltipProps={{ placement: "right" }}
                      onChange={(value) => {
                        value instanceof Array
                          ? handleChangeChoicePointPercentage(value[0])
                          : handleChangeChoicePointPercentage(value);
                      }}
                      aria-label="Choice Question Point Percentage"
                    />
                  </div>
                </div>
              )}
              <Checkbox id="multiple" value={QuestionType.Multiple}>
                Multiple Answer Choice
              </Checkbox>
              {typeChecked.multiple && (
                <div className="bg-slate-500  p-4 rounded-lg bg-opacity-5 w-fit">
                  <NumberOfQuestionsInput
                    label="Multiple"
                    value={numberOfQuestionMultiple}
                    onChange={(e) =>
                      setNumberOfQuestionMultiple(e.target.value)
                    }
                  />
                  <div className="flex flex-col gap-2 mt-2">
                    <p>
                      Question Point Percentage{" "}
                      {Math.round(multiplePointPercentage * 100)}%
                    </p>
                    <Slider
                      showTooltip
                      marks={[
                        { value: 0, label: "0%" },
                        { value: 0.2, label: "20%" },
                        { value: 0.4, label: "40%" },
                        { value: 0.6, label: "60%" },
                        { value: 0.8, label: "80%" },
                        { value: 1, label: "100%" },
                      ]}
                      className="max-w-md"
                      value={multiplePointPercentage}
                      maxValue={1}
                      minValue={0}
                      step={0.01}
                      formatOptions={{ style: "percent" }}
                      tooltipProps={{ placement: "right" }}
                      onChange={(value) => {
                        value instanceof Array
                          ? handleChangeMultiplePointPercentage(value[0])
                          : handleChangeMultiplePointPercentage(value);
                      }}
                      aria-label="Multiple Question Point Percentage"
                    />
                  </div>
                </div>
              )}
              <Checkbox id="essay" value={QuestionType.Essay}>
                Essay
              </Checkbox>
              {typeChecked.essay && (
                <div className="bg-slate-500  p-4 rounded-lg bg-opacity-5 w-fit">
                  <NumberOfQuestionsInput
                    label="Essay"
                    value={numberOfQuestionEssay}
                    onChange={(e) => setNumberOfQuestionEssay(e.target.value)}
                  />
                  <div className="flex flex-col gap-2 mt-2">
                    <p>
                      Question Point Percentage{" "}
                      {Math.round(essayPointPercentage * 100)}%
                    </p>
                    <Slider
                      showTooltip
                      marks={[
                        { value: 0, label: "0%" },
                        { value: 0.2, label: "20%" },
                        { value: 0.4, label: "40%" },
                        { value: 0.6, label: "60%" },
                        { value: 0.8, label: "80%" },
                        { value: 1, label: "100%" },
                      ]}
                      className="max-w-md"
                      value={essayPointPercentage}
                      maxValue={1}
                      minValue={0}
                      step={0.01}
                      formatOptions={{ style: "percent" }}
                      tooltipProps={{ placement: "right" }}
                      onChange={(value) => {
                        value instanceof Array
                          ? handleChangeEssayPointPercentage(value[0])
                          : handleChangeEssayPointPercentage(value);
                      }}
                      aria-label="Choice Question Point Percentage"
                    />
                  </div>
                </div>
              )}
            </CheckboxGroup>
          </div>
        </FormQuizGroup>
        <FormQuizGroup>
          <FormQuizLabel label="Quiz Duration" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                variant="bordered"
                id="Hours"
                placeholder="00"
                className="w-16"
                min={0}
                onChange={(e) => setQuizDurationHours(e.target.value)}
                value={quizDurationHours}
              />
              <label className="font-medium" htmlFor="Hours">
                Hours
              </label>
            </div>
            <span>:</span>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                variant="bordered"
                id="Minutes"
                maxLength={2}
                max={59}
                min={0}
                placeholder="00"
                className="w-16"
                onChange={(e) => {
                  if (e.target.value.length > 2) return;
                  if (parseInt(e.target.value || "0") > 59) return;
                  setQuizDurationMinutes(e.target.value);
                }}
                value={quizDurationMinutes}
              />
              <label className="font-medium" htmlFor="Minutes">
                Minutes
              </label>
            </div>
          </div>
        </FormQuizGroup>
        <div className="flex justify-end gap-2 mt-10">
          <Button
            size="md"
            className="border border-red-500 text-red-500 font-medium bg-transparent min-w-24 md:min-w-32"
          >
            Cancel
          </Button>
          <Button
            size="md"
            className="bg-dark-blue text-white font-medium min-w-24 md:min-w-32"
            onClick={onGenerateClick}
          >
            Generate
          </Button>
        </div>
      </Card>
    </section>
  );
}

const FormQuizGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-3">{children}</div>;
};

const FormQuizLabel = ({ label }: { label: string }) => {
  return <p className="font-medium text-[#404040]">{label}</p>;
};

const NumberOfQuestionsInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label
      htmlFor={`numberOfQuestions-${label}`}
      className="inline-flex whitespace-nowrap items-center gap-2"
    >
      Number of Questions{" "}
      <Input
        id={`numberOfQuestions-${label}`}
        variant="bordered"
        value={value}
        onChange={onChange}
        type="number"
        min={0}
        placeholder="Enter the number of questions"
        className="w-56"
      />{" "}
      Questions
    </label>
  );
};
