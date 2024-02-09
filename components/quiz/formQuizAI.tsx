import React from 'react'
import { Input, Select, SelectItem } from '@nextui-org/react'
export default function FormQuizAI({courses, modules, questionTypes}: {courses: any, modules: any, questionTypes: any}) {
  return (
    <>
      <Input
        name='name'
        placeholder='Insert Your Quiz Name Here'
        label='Quiz Name :'
        variant='bordered'
        labelPlacement='outside'
        radius='sm'
      />
    <div className='flex gap-5'>
      <Select
        name='course'
        variant='bordered'
        label='Course :'
        labelPlacement='outside' 
        radius='sm'
        placeholder='Choose Course'
      >
        {courses.map((course:any) => (
          <SelectItem key={course.id} value={course.name}>
            {course.name}
          </SelectItem>
        ))}
      </Select>
      <Select
        name='module'
        variant='bordered'
        label='Module :'
        labelPlacement='outside' 
        radius='sm'
        placeholder='Choose Module'
      >
        {modules.map((module:any) => (
          <SelectItem key={module.id} value={module.name}>
            {module.name}
          </SelectItem>
        ))}
      </Select>
    </div>
    <div className='flex gap-5'>
      <Select
        name='type'
        variant='bordered'
        label='Question Type :'
        labelPlacement='outside' 
        radius='sm'
        placeholder='Choose Type'
      >
        {questionTypes.map((type:any) => (
          <SelectItem key={type.name} value={type.name}>
            {type.name}
          </SelectItem>
        ))}
      </Select>
      <Input
        name='numberQuestion'
        placeholder='Insert Your Number Question'
        label='Number Of Question :'
        variant='bordered'
        labelPlacement='outside'
        radius='sm'
      />
    </div>
    </>
  )
}
