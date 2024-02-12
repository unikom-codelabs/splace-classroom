"use client";
import { CourseItem } from "./CourseItem";
import NextLink from "next/link";
export const CourseList = ({data}:any) => {
	return (
    <section className="flex flex-wrap gap-5">
      {data.map((course:any) =>{
        return (
          <NextLink href={`/course/${course.id}`} key={course.id}>
            <CourseItem course={course}/>
          </NextLink>
        )
      })}
    </section>
	);
};
