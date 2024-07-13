'use client';
import { QuizCreator } from '@/components/quiz/QuizCreator';
import { Question } from '@/core/entity/Question';
import { QuestionType } from '@/core/entity/QuestionType';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import {
  CalendarDate,
  DatePicker,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { QUIZ_DURATION } from './data';
import { convertToObject } from 'typescript';

const MULTIPLE_QUESTION_DEFAULT = {
  title: '',
  choices: ['', '', '', ''],
  answer: [''],
  point: 0,
  type: QuestionType.Multiple,
};

const ESSAY_QUESTION_DEFAULT = {
  title: '',
  choices: [''],
  answer: [''],
  point: 0,
  type: QuestionType.Essay,
};

export default function Page({
  searchParams,
}: {
  searchParams: {
    course_id: number;
    qname: string;
    type: string;
  };
}) {
  const { course_id, qname, type } = searchParams;
  const router = useRouter();
  const [changeQuizName, setChangeQuizName] = useState(false);
  const [quizName, setQuizName] = useState(qname);
  const [loading, setLoading] = useState(false);
  const [quizDuration, setQuizDuration] = useState('45');
  const [deadline, setDeadline] = useState<CalendarDate | null>(null);

  const [questions, setQuestions] = useState<Question[]>([]);

  const [questionFormLoading, setQuestionFormLoading] = useState(true);

  const questionsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const listOfQuestions: Question[] = [];
    if (type === QuestionType.Multiple) {
      listOfQuestions.push(MULTIPLE_QUESTION_DEFAULT);
    } else if (type === QuestionType.Essay) {
      listOfQuestions.push(ESSAY_QUESTION_DEFAULT);
    } else if (type === QuestionType.Mixed) {
      listOfQuestions.push(MULTIPLE_QUESTION_DEFAULT);
      listOfQuestions.push(ESSAY_QUESTION_DEFAULT);
    }
    setQuestions(listOfQuestions);
    setQuestionFormLoading(false);
  }, [type]);

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
    if (quizName === '') setQuizName(qname);
    setChangeQuizName(!changeQuizName);
  };

  const onAddQuestChoice = (index: number) => {
    const newQuestions = questions.map((q, i) => {
      if (i === index) {
        return {
          ...q,
          choices: [...q.choices, ''],
        };
      }
      return q;
    });
    setQuestions(newQuestions);
  }

  const onRemoveQuestChoice = (index: number, choiceIndex: number) => {
    const currentChoiceValue = questionsRef.current?.querySelectorAll('.question-card')[index].querySelectorAll('.question-choice')[choiceIndex].querySelector('input')?.value;
    
    setQuestions(prev => {
      const newQuestions = prev.map((q, i) => {
        if (i === index) {
          return {
            ...q,
            choices: q.choices.filter((_, i) => i !== choiceIndex),
          };
        }
        return q;
      });
      return newQuestions;
    });
  }

  async function handleCreateQuiz(e: any) {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(questions);
      questionsRef.current?.querySelectorAll('.question-card').forEach((el) => {
        const questionType = el.getAttribute('data-question-type')

        let title, choices, choicesAnswer, answer : string | undefined | null = '';

        title = el.querySelector('.question-title')?.querySelector('input')?.value;

        if(questionType === 'Multiple') {
          choicesAnswer = el.querySelector('.question-choice-answer:checked')?.getAttribute('data-index')

          
          if(choicesAnswer) {
            choicesAnswer = parseInt(choicesAnswer);
            choices = el.querySelectorAll('.question-choice input');
            answer = (choices[choicesAnswer] as HTMLInputElement).value;
          }
        } else {
          answer = el.querySelector('.question-answer')?.querySelector('input')?.value;
        }
        
        console.log("Question Type: ", questionType)
        console.log("Title: ", title);
        console.log("Answer: ", answer);
        console.log("---------------------")
      });
      // const res = await createQuizUseCase(createQuizRequest);
      // if (res) return router.push(`/quiz`);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
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
    if (course_id === undefined) return router.push('/quiz');
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
          type={type}
          loadingSubmit={loading}
          questionFormLoading={questionFormLoading}
          onAddQuestionMultiple={onAddQuestionMultiple}
          onAddQuestionEssay={onAddQuestionEssay}
          onAddQuestChoice={onAddQuestChoice}
          onRemoveQuestChoice={onRemoveQuestChoice}
          onRemoveQuestion={onRemoveQuestion}
        />
      </section>
    </section>
  );
}
