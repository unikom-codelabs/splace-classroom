//  id Int @id @default(autoincrement())
//   project_name String
//   university_name String
//   logo String
//   banner String 
//   description String
//   color Json @default("[]")
export interface Setting{
  project_name: string,
  university_name: string,
  logo: Blob,
  banner: Blob,
  description: string,
  color:Array<String>
}

export interface SettingWithId extends Setting{
  id:number
}