import fetchApi from "@/utils/fetchApi";
import { Course } from "../entity/Course";
import useSWR from "swr";

export const getCourseUseCase = async (): Promise<Course[]> => {
  return fetchApi<Course[]>(`/courses`, "GET").then(
    (response) => response.data
  );
};
