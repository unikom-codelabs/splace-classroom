"use client";

import { Quiz } from "@/core/entity/Quiz";
import { getQuizReviewUseCase } from "@/core/usecase/getQuizReviewUseCase";
import { showFormattedDate } from "@/utils/timeStamp";
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
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";

export default function page({
  params: { id: quizId },
}: {
  params: { id: number };
}) {
  const { data, isLoading } = useSWR<Quiz>(["quiz-review"], () =>
    getQuizReviewUseCase(quizId)
  );

  const tableBodyItem = useMemo(() => {
    if (!data) return [];
    return data.user_quiz || [];
  }, [data, isLoading]);

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
                <ReviewQuizDetailTitleItem title="Jumlah Soal" />
                <ReviewQuizDetailDescItem
                  desc={`${data?.questions?.length || 0}`}
                />
              </div>
              <div>
                <ReviewQuizDetailTitleItem title="Materi" />
                <ReviewQuizDetailDescItem desc={data?.name} />
              </div>
              <div>
                <ReviewQuizDetailTitleItem title="Modify" />
                <ReviewQuizDetailDescItem
                  desc={showFormattedDate(data?.updatedAt || "")}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="overflow-x-hidden w-full">
              <section className="overflow-x-auto w-full">
                <Table aria-label="Table Review" radius="none">
                  <TableHeader columns={TABLE_COLUMN}>
                    {(column) => (
                      <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                  </TableHeader>
                  <TableBody
                    items={tableBodyItem}
                    isLoading={isLoading}
                    loadingContent={<Spinner />}
                  >
                    {(item) => {
                      return (
                        <TableRow key={item.id}>
                          {(columnKey) => (
                            <TableCell>
                              {getKeyValue(item, columnKey)}
                              {columnKey === "action" && (
                                <Button
                                  as={Link}
                                  href={`/quiz/review/${quizId}/${item.id}`}
                                  type="button"
                                  radius="sm"
                                  variant="flat"
                                  className="text-dark-blue font-medium bg-transparent"
                                >
                                  <Icon icon="mage:edit" fontSize={20} />
                                </Button>
                              )}
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    }}
                  </TableBody>
                </Table>
              </section>
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

const ReviewQuizDetailDescItem = ({ desc }: { desc?: string }) => {
  return <p className="text-base font-bold text-dark-blue">{desc || "-"}</p>;
};

const TABLE_COLUMN = [
  {
    key: "username",
    label: "Username",
  },
  {
    key: "correct_answer",
    label: "Correct Answer",
  },
  {
    key: "wrong_answer",
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
