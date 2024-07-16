import fetchApi from "@/utils/fetchApi";
import { Course } from "../entity/Course";

export const getCourseUseCase = async (): Promise<Course[]> => {
  return fetchApi<Course[]>(`/courses`, "GET").then(
    (response) => response.data
  );
};
