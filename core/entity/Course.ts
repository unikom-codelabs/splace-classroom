import { UserCourse } from "./UserCourse";

export interface Course {
  id: number;
  name: string;
  azure_index_name: string;
  azure_indexer_name: string;
  azure_container_name: string;
  azure_datasource_name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  user_course: UserCourse[];
  instructor: string;
}
