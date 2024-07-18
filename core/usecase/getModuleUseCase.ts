import fetchApi from "@/utils/fetchApi";
import { Module } from "../entity/Module";

export const getModuleUseCase = async (
  course_id: string
): Promise<Module[]> => {
  const data = await fetchApi<Module[]>(`/courses/${course_id}`, "GET").then(
    (res) => res.data.module
  );
  const listOfModule = data.filter(
    (module: Module) => module.path !== undefined
  );
  return listOfModule;
};
