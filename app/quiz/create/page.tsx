"use client";
import { QuizCreator } from "@/components/quiz/QuizCreator";
import { Question } from "@/core/entity/Question";
import { QuestionType } from "@/core/entity/QuestionType";
import { QuizType } from "@/core/entity/QuizType";
import { createQuizUseCase } from "@/core/usecase/createQuizUseCase";
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
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { QUIZ_DURATION } from "./data";
import CreatePage from "@/components/page/createPage";

export default function Page({
  searchParams,
}: {
  searchParams: {
    course_id: number;
    qname: string;
  };
}) {
  return <CreatePage searchParams={searchParams} pageQuestions={[]} />
}

