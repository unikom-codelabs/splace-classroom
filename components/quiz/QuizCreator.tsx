"use client";
import { Question } from "@/core/entity/Question";
import { QuestionType } from "@/core/entity/QuestionType";
import { faPlus, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/react";
import { Switch } from "@nextui-org/switch";
import {
  memo,
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from "react";

interface QuizProps {
  onSubmit: any;
  type: string;
  loadingSubmit: boolean;
  questions: Question[];
  questionFormLoading: boolean;
  questionsRef: MutableRefObject<any>;
  onAddQuestionMultiple: () => void;
  onAddQuestionEssay: () => void;
  onRemoveQuestion: (index: number) => void;
}

export const QuizCreator = memo(
  ({
    onSubmit,
    loadingSubmit,
    type,
    questions,
    questionFormLoading,
    questionsRef,
    onAddQuestionMultiple,
    onAddQuestionEssay,
    onRemoveQuestion,
  }: QuizProps) => {
    if (questionFormLoading) return <Spinner className="text-center flex" />;
    return (
      <section ref={questionsRef}>
        <div className="space-y-4">
          {questions?.map((q, index) => {
            if (q.type === QuestionType.Essay) {
              return (
                <QuestionEssay
                  question={q}
                  key={index}
                  index={index}
                  onRemoveQuestion={onRemoveQuestion}
                />
              );
            }
            return (
              <QuestionMultiple
                key={index}
                question={q}
                index={index}
                onRemoveQuestion={onRemoveQuestion}
              />
            );
          })}
        </div>
        <div className="my-4 flex flex-wrap gap-3">
          <Button
            size="md"
            variant="bordered"
            radius="none"
            className="border-dark-blue text-dark-blue hidden"
          >
            Cancel
          </Button>
          <Button
            size="md"
            variant="bordered"
            radius="none"
            className={`border-dark-blue text-dark-blue ${
              type === "Multiple" || type === "Mixed" ? "" : "hidden"
            }`}
            onClick={onAddQuestionMultiple}
          >
            Add Question Multiple
          </Button>
          <Button
            size="md"
            variant="bordered"
            radius="none"
            className={`border-dark-blue text-dark-blue ${
              type === "Essay" || type === "Mixed" ? "" : "hidden"
            }`}
            onClick={onAddQuestionEssay}
          >
            Add Question Essay
          </Button>
          <Button
            size="md"
            className="bg-dark-blue text-white"
            radius="none"
            onClick={(e) => onSubmit(e)}
            isLoading={loadingSubmit}
          >
            Submit Quiz
          </Button>
        </div>
      </section>
    );
  }
);

const QuestionMultiple = ({
  question,
  index,
  onRemoveQuestion,
}: {
  question: Question;
  index: number;
  onRemoveQuestion: (index: number) => void;
}) => {
  const [questionTitle, setQuestionTitle] = useState(question.title);

  const [choices, setChoices] = useState<string[]>(question.choices);

  const [questionType, setQuestionType] = useState(question.type);

  const onQuestionTitleChange = useCallback((e: any) => {
    const { value } = e.target;
    setQuestionTitle(value);
  }, []);

  const onChoiceValueChange = useCallback((e: any, index: number) => {
    const { value } = e.target;
    setChoices((prev) => prev.map((c, i) => (i === index ? value : c)));
  }, []);

  const onSwitchChange = useCallback((e: any, index: number) => {
    const { checked } = e.target;
    setQuestionType(checked ? QuestionType.Multiple : QuestionType.Choice);
  }, []);

  useEffect(() => {
    console.log(questionType);
  }, [questionType]);

  const handleRemoveQuestChoice = (index: number) => {
    setChoices((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddQuestChoce = () => {
    setChoices((prev) => [...prev, ""]);
  };
  return (
    <Card
      data-question-type={questionType}
      key={index}
      className="question-card"
      shadow="sm"
    >
      <CardHeader className="py-3 px-10 flex justify-between border-b-1 border-gray-300">
        <h1 className="text-lg">Question {index + 1}</h1>
        <Button
          radius="full"
          color="danger"
          size="sm"
          variant="ghost"
          isIconOnly
          onClick={() => onRemoveQuestion(index)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </CardHeader>
      <CardBody className="p-5 px-10 space-y-3">
        <Input
          value={questionTitle}
          onChange={onQuestionTitleChange}
          type="text"
          className="question-title"
          size="sm"
          variant="underlined"
          placeholder="Write A Question Here"
          required
        />
        <div className="space-y-3">
          {choices.map((choice, choiceIndex) => {
            return (
              <div key={choiceIndex} className="flex gap-2 items-center">
                <input
                  type={`${
                    questionType === QuestionType.Multiple
                      ? "checkbox"
                      : "radio"
                  }`}
                  id={`choice-${index}-${choiceIndex}`}
                  name={`choice-${index}`}
                  required
                  className="w-4 h-4 question-choice-answer"
                  data-index={choiceIndex}
                />
                <Input
                  key={choiceIndex}
                  type="text"
                  required
                  placeholder="Write A Answer Here"
                  variant="bordered"
                  radius="sm"
                  size="sm"
                  className="w-fit question-choice"
                  value={choice}
                  onChange={(e) => onChoiceValueChange(e, choiceIndex)}
                />
                <Button
                  radius="full"
                  size="sm"
                  variant="light"
                  isIconOnly
                  onClick={() => handleRemoveQuestChoice(choiceIndex)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </Button>
              </div>
            );
          })}
        </div>
        <CardFooter className="space-x-2">
          <Switch size="sm" onChange={(e) => onSwitchChange(e, index)}>
            Mulitple Answers
          </Switch>
          <Button
            variant="light"
            startContent={<FontAwesomeIcon icon={faPlus} />}
            className="border-dark-blue text-dark-blue"
            onClick={() => handleAddQuestChoce()}
          >
            Add Choice
          </Button>
        </CardFooter>
      </CardBody>
    </Card>
  );
};

const QuestionEssay = ({
  question,
  index,
  onRemoveQuestion,
}: {
  question: Question;
  index: number;
  onRemoveQuestion: any;
}) => {
  const [questionTitle, setQuestionTitle] = useState(question.title);
  const [questionAnswer, setQuestionAnswer] = useState(question.answer[0]);

  useEffect(() => {
    console.log(question);
  }, []);

  useEffect(() => {
    console.log(questionTitle);
  }, [questionTitle]);

  const onQuestionTitleChange = useCallback((e: any) => {
    const { value } = e.target;
    setQuestionTitle(value);
  }, []);

  const onQuestionAnswerChange = useCallback((e: any) => {
    const { value } = e.target;
    setQuestionAnswer(value);
  }, []);

  return (
    <Card
      data-question-type="Essay"
      key={index}
      className="question-card"
      shadow="sm"
    >
      <CardHeader className="py-3 px-10 flex justify-between border-b-1 border-gray-300">
        <h1 className="text-lg">Question {index + 1}</h1>
        <Button
          radius="full"
          color="danger"
          size="sm"
          variant="ghost"
          isIconOnly
          onClick={() => onRemoveQuestion(index)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </CardHeader>
      <CardBody className="p-5 px-10 space-y-3">
        <Input
          value={questionTitle}
          onChange={onQuestionTitleChange}
          type="text"
          size="sm"
          className="question-title"
          variant="underlined"
          placeholder="Write A Question Here"
          required
        />
        <Input
          value={questionAnswer}
          onChange={onQuestionAnswerChange}
          type="text"
          size="sm"
          variant="bordered"
          placeholder="Write A Answer Here"
          className="question-answer"
          required
        />
      </CardBody>
    </Card>
  );
};
