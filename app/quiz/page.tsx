"use client";
import React, { useState, useEffect, useMemo } from "react";
import { quiz } from "@/config/data-dummy";
import {
  Table as T,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import FormQuizAI from "@/components/quiz/formQuizAI";
import fetchApi from "@/utils/fetchApi";
import FormQuizManual from "@/components/quiz/formQuizManual";
import { showFormattedDate, showFormattedDateOnly } from "@/utils/timeStamp";
import { Spinner } from "@nextui-org/react";
import { getQuizUseCase } from "@/core/usecase/getQuizUseCase";
import { getCourseUseCase } from "@/core/usecase/getCourseUseCase";
import { Quiz } from "@/core/entity/Quiz";
import { Course } from "@/core/entity/Course";
import Link from "next/link";

export default function page() {
  const modal1 = useDisclosure();
  const modal2 = useDisclosure();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [quizForm, setQuizForm] = useState({
    name: "",
    course: "",
    module: "",
    numberQuestion: 0,
  });

  const columns = [
    {
      key: "name",
      label: "Quiz Name",
    },
    {
      key: "numberOfQuestions",
      label: "Number Of Questions",
    },
    {
      key: "type",
      label: "Quiz Type",
    },
    {
      key: "course_id",
      label: "Course",
    },
    {
      key: "updatedAt",
      label: "Modify",
    },
    {
      key: "action",
      label: "Action",
    },
  ];
  const modules = [
    {
      id: 1,
      name: "Module 1",
    },
    {
      id: 2,
      name: "Module 2",
    },
    {
      id: 3,
      name: "Module 3",
    },
  ];

  useEffect(() => {
    getCourseUseCase().then((res) => {
      setCourses(res);
    });
    getQuizUseCase().then((res) => {
      setQuiz(res);
      setLoading(false);
    });
  }, []);

  function handleChange(e: any) {
    setQuizForm({
      ...quizForm,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmitQuizManual(e: any) {
    e.preventDefault();
    const { name, course } = quizForm;
    if (!name || !course)
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all the fields!",
      });
    router.push(`/quiz/create?qname=${name}&course_id=${course}`);
  }

  const tableBodyItem = useMemo(() => {
    return quiz.map((item) => {
      return {
        id: item.id,
        name: item.name,
        numberOfQuestions: item.questions?.length,
        type: item.type,
        course_id: courses?.find((c: any) => c.id === item.course_id)?.name,
        updatedAt: showFormattedDate(item.updatedAt),
      };
    });
  }, [quiz, courses]);

  return (
    <section className="p-5 w-screen lg:max-w-6xl lg:mx-auto space-y-5">
      <header className="bg-white p-4 shadow-md">
        <h1 className="text-xl font-bold text-dark-blue">Quiz</h1>
      </header>
      <section className="overflow-x-auto w-full">
        <T aria-label="Table Quiz" radius="none">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={tableBodyItem}
            isLoading={loading}
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
                          href={`/quiz/review/${item.id}`}
                          type="button"
                          radius="sm"
                          variant="flat"
                          className="text-white font-medium text-sm bg-dark-blue"
                        >
                          Review
                        </Button>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              );
            }}
          </TableBody>
        </T>
      </section>
      <section className="flex gap-3 items-center">
        {/* GENERATE QUIZ BY AI */}
        <Button
          size="sm"
          className="bg-dark-blue text-white font-bold px-6"
          radius="sm"
          startContent={<img src="/shinning.png" alt="icon" />}
          onPress={modal1.onOpen}
        >
          Quiz Generator
        </Button>
        <Modal
          title="Quiz Generator"
          isOpen={modal1.isOpen}
          onOpenChange={modal1.onOpenChange}
          btnActionTitle="Generate"
          submit={handleSubmitQuizManual}
        >
          <FormQuizAI
            courses={courses}
            modules={modules}
            handleChange={handleChange}
          />
        </Modal>
        {/* CREATE QUIZ MANUAL */}
        <Button
          size="sm"
          className="border-dark-blue text-dark-blue px-5"
          variant="ghost"
          radius="sm"
          onPress={modal2.onOpen}
        >
          Create Quiz
        </Button>
        <Modal
          title="Create Quiz"
          isOpen={modal2.isOpen}
          onOpenChange={modal2.onOpenChange}
          btnActionTitle="Next"
          submit={handleSubmitQuizManual}
        >
          <FormQuizManual courses={courses} handleChange={handleChange} />
        </Modal>
      </section>
    </section>
  );
}
