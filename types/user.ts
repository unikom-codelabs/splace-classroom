
export interface User{
  id: number;
  username: string;
  name?: string;
  role: string;
  class_id?: number;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}