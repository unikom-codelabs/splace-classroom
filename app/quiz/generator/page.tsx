'use client';
import { Icon } from '@iconify/react';
import {
  Button,
  Card,
  DatePicker,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useState } from 'react';

export default function page() {
  const [quizName, setQuizName] = useState('');
  const [quizMaterial, setQuizMaterial] = useState('');
  const [quizQuery, setQuizQuery] = useState('');
  const [quizDeadline, setQuizDeadline] = useState('');
  const [quizType, setQuizType] = useState<string[]>([]);
  const [quizDuration, setQuizDuration] = useState(0);

  return (
    <section className="p-5 w-screen lg:max-w-6xl lg:mx-auto space-y-5">
      <header className="bg-white p-4 shadow-md">
        <div className="flex items-center gap-1 ">
          <Button className="bg-transparent" variant="flat" size="sm">
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
          <Input />
        </FormQuizGroup>
        <FormQuizGroup>
          <FormQuizLabel label="Quiz Material" />
          <Select>
            <SelectItem key={1}>Material 1</SelectItem>
          </Select>
        </FormQuizGroup>
        <FormQuizGroup>
          <FormQuizLabel label="Quiz Query" />
          <Input />
        </FormQuizGroup>
        <FormQuizGroup>
          <FormQuizLabel label="Quiz Deadline" />
          <div className="flex items-center gap-16">
            <DatePicker />
            <div className="inline-flex items-center gap-4">
              <Input />
              <span className="font-medium text-[#494E50]">:</span>
              <Input />
            </div>
          </div>
        </FormQuizGroup>
        <FormQuizGroup>
          <FormQuizLabel label="Quiz Type" />
          <div className='flex flex-col gap-3'>
            <label htmlFor="a">
              <input id='a' type="checkbox" />
              Multiple Choice
            </label>
            <label htmlFor="b">
              <input id='b' type="checkbox" />
              Multiple Choice
            </label>
          </div>
        </FormQuizGroup>
        <FormQuizGroup>
          <FormQuizLabel label="Total Quiz Time" />
          <div className='flex'>
            <div>
              <Input type="number" />
              <label htmlFor="Hours">Hours</label>
            </div>
            <span>:</span>
            <div>
              <Input type="number" />
              <label htmlFor="Minutes">Minutes</label>
            </div>
          </div>
        </FormQuizGroup>
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
