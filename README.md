
# Splace Classroom

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://choosealicense.com/licenses/mit/) [![NEXTJS](https://img.shields.io/badge/Next.js-13-green.svg)](https://nextjs.org/) [![Tailwind](https://img.shields.io/badge/Tailwind-lastest-green.svg)](https://tailwindcss.com/) [![Mysql](https://img.shields.io/badge/mysql-lastest-green.svg)](https://www.mysql.com/) [![Prisma](https://img.shields.io/badge/Prisma-lastest-green.svg)](https://www.prisma.io/)

## Project Description

Classroom with Smart ChatBot is an AI-powered chatbot that can be used to support and enhance learning in a variety of ways. It can provide students with instant answers to their questions according to the module being learnt. In addition, chatbots can be used to create interactive learning experiences.
## Table of Content

 - [How to Install and Run the Project](#How-to-Install-and-Run-the-Project)
 - [How to Use the Project](#How-to-Use-the-Project)
 - [Credits](#Credits)
 - [License](#license)
 - [How to Contribute to the Project](#How-to-Contribute-to-the-Project)

## How to Install and Run the Project
To install and run the Splace Classroom project locally, please follow these steps:

 1.Clone the repository from GitHub:    
```bash
  git clone https://github.com/lutfianRhdn/lms-classroom.git
```

Navigate to the project directory:
```bash
  cd lms-classroom
```
Install the project dependencies using a package manager such as npm or yarn:
```bash
  npm install
```
or
```bash
  yarn install
```
Copy example environment file to new file
```bash
  cp .env.example .env
```

Generate Prisma Client.
```bash
  npx prisma generate
```

Migrate Database.
```bash
  npm run prisma:migrate
```

Run the development server.
```bash
  npm run dev
```
or
```bash
  yarn dev
```
Access the website locally at http://localhost:3000.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
`NEXT_PUBLIC_BASE_URL` 
`NEXT_PUBLIC_API_URL` 
`NEXTAUTH_SECRET`  
`NEXTAUTH_URL` 
`DATABASE_URL`  
`AZURE_OPENAI_KEY`
`AZURE_OPENAI_ENDPOINT`
`AZURE_OPENAI_MODEL_NAME`   
`AZURE_SEARCH_ENDPOINT`
`AZURE_SEARCH_KEY`  
`AZURE_STORAGE_KEY`
`AZURE_STORAGE_ACCOUNT`
`AZURE_STORAGE_CONNECTION_STRING`
`AZURE_STORAGE_URL`


## Demo
You can access the demo at https://aicroom.azurewebsites.net

| **Role** | **Username**| **Password** |
| :---: | :-----------: | :----------------------: |
| Admin| SplaceRoom | admin |
| Student | Student  | password |
| Instructor | Asifa  | password |

## How to Use the Project

Once you have accessed the Splace Classroom, you can perform the following actions:
- Add Master Data: must Add Master data on admin(class,users,course).
- Add Course Resource: Login Instructor Account and go to course detail can upload the resource.
- Chatbot: can access instructor account and student account, and go to chatbot menu, type the question and chatbot will answer the question by refenreces course resource.
## Credits


The Space Classroom project was developed by  
- [@alfa000](https://www.github.com/alfa000)
- [@mazizr](https://www.github.com/mazizr)
- [@asifalestari](https://www.github.com/asifalestari)
- [@aprnna](https://www.github.com/aprnna)

## License

This project is licensed under the MIT License.


