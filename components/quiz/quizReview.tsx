import { Answer } from "@/core/entity/Answer";
import { Question } from "@/core/entity/Question";
import { Card } from "@nextui-org/card";
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
import { useMemo, useState } from "react";

export const QuizReview = ({
  questions,
  answers,
  onSubmit,
}: {
  questions: Question[];
  answers: Answer[];
  onSubmit: () => void;
}) => {
  const questionsStatus = useMemo(() => {
    const status = questions.map((question, index) => {
      const isAnswered =
        (answers.find((ans) => ans.id === question.id)?.answer.length || 0) > 0;
      return {
        id: question.id,
        question: "Question " + (index + 1),
        status: isAnswered ? "Answer Saved" : "Answer Not Saved",
      };
    });
    return status;
  }, [questions, answers]);
  return (
    <Card className="flex flex-col">
      <Table aria-label="Table Quiz Review" shadow="none">
        <TableHeader columns={TABLE_COLUMNS}>
          {(column) => (
            <TableColumn
              className={`${column.key === "question" && "w-2/3"}`}
              key={column.key}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={questionsStatus} loadingContent={<Spinner />}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell className="whitespace-nowrap">
                  {getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="my-10 flex">
        <Button
          className="bg-dark-blue text-white min-w-[308px] font-medium text-lg mx-auto"
          size="md"
          radius="none"
          onClick={onSubmit}
        >
          Submit All and Finish
        </Button>
      </div>
    </Card>
  );
};

const TABLE_COLUMNS = [
  {
    key: "question",
    label: "Question",
  },
  {
    key: "status",
    label: "Status Answer",
  },
];
