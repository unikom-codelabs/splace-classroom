import React from 'react'
import { Input, Select, SelectItem } from '@nextui-org/react'
export default function FormQuizManual({courses, questionTypes, handleChange}: {courses: any, questionTypes: any, handleChange: any}) {
  return (
    <>
      <div className='space-y-10'>
        <Input
          name='name'
          placeholder='Insert Your Quiz Name Here'
          label='Quiz Name :'
          variant='bordered'
          onChange={handleChange}
          labelPlacement='outside'
          radius='sm'
        />
        <Select
          name='course'
          variant='bordered'
          label='Course :'
          labelPlacement='outside' 
          onChange={handleChange}
          radius='sm'
          placeholder='Choose Course'
        >
          {courses.map((course:any) => (
            <SelectItem key={course.id} value={course.id}>
              {course.name}
            </SelectItem>
          ))}
        </Select>
        <Select
          name='type'
          variant='bordered'
          label='Question Type :'
          labelPlacement='outside' 
          onChange={handleChange}
          radius='sm'
          placeholder='Choose Type'
        >
          {questionTypes.map((type:any) => (
            <SelectItem key={type.name} value={type.name}>
              {type.name}
            </SelectItem>
          ))}
        </Select>
      </div>
    </>
  )
}
