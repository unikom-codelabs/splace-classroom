"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faCircleMinus,
  faCirclePlus,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Skeleton } from "@nextui-org/react";
import UsageGuide from "@/components/auth/usageGuide";
import Link from "next/link";

import { useSettingsStore } from "@/utils/useSettingsStore";
import Image from "next/image";
import { useSession } from "next-auth/react";

const defaultContent = [
  {
    title: "How to Use the Application ?",
    content:
      "You can use this application by signing up and logging in to the application. After that, you can access the features provided by the application.",
  },
  {
    title: "The Application Open to the Public?",
    content:
      "This application is only open to students and lecturers of Universitas Universitas Komputer Indonesia. You can only access this application with an account provided by the university.",
  },
  {
    title: "How Many Class  Accommodate?",
    content:
      "This application can accommodate up to 100 classes. Each class can accommodate up to 30 students and 1 lecturer.",
  },
];

const learnMore = [
  {
    title: "Guide for Students",
    icon: faFileLines,
    link: "/guide/student",
  },
  {
    title: "Guide for Lecturers",
    icon: faFileLines,
    link: "/guide/lecturer",
  },
  {
    title: "Slides for Lecturers",
    icon: faFileLines,
    link: "/guide/slides",
  },
  {
    title: "Usage Video",
    icon: faFileLines,
    link: "/guide/video",
  },
];

const Page = () => {
  const { settings, loading } = useSettingsStore();
  const { data: session } = useSession();

  return (
    <main className="flex flex-col justify-center w-full items-center bg-gray-100">
      <div className="flex flex-col justify-center items-center mt-10">
        <div className="relative top-7 z-10 transform bg-white p-4 rounded-xl shadow-md">
          {loading ? (
            <Skeleton className="rounded-lg">
              <div className="h-40 w-40 rounded-lg bg-default-300"></div>
            </Skeleton>
          ) : (
            <Image
              src={settings.logo}
              alt={settings.university_name}
              height={160}
              width={160}
              className="h-40"
            />
          )}
        </div>
        <div className="relative -mt-16 bg-white shadow-md rounded-lg overflow-hidden">
          {loading ? (
            <Skeleton className="rounded-lg">
              <div className="w-[80rem] h-[35rem] rounded-lg bg-default-300"></div>
            </Skeleton>
          ) : (
            <Image
              src={settings.banner}
              alt="Background"
              width={1280}
              height={560}
              objectFit="cover"
              className="w-[80rem] h-[35rem] "
            />
          )}

          <div className="absolute mt-36 w-[45rem] h-[25rem] px-4 self-center mx-auto text-center rounded-lg inset-0 flex flex-col gap-4 justify-center items-center bg-white/10 border-3 border-white backdrop-blur-sm">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
              Welcome to LMS
            </h1>
            <p className="text-white text-center mb-6">
              LMS {settings.university_name} merupakan media pembelajaran daring
              untuk memudahkan proses pengajaran di lingkungan{" "}
              {settings.university_name}
            </p>
            <div className="flex space-x-4">
              <UsageGuide learnMore={learnMore} settings={settings} />

              {session == null ? (
                <Button
                  className="bg-dark-blue text-white font-bold"
                  endContent={<FontAwesomeIcon icon={faChevronRight} />}
                >
                  <Link href="/auth/login">Login</Link>
                </Button>
              ) : (
                <Button
                  className="bg-dark-blue text-white font-bold"
                  endContent={<FontAwesomeIcon icon={faChevronRight} />}
                >
                  <Link href="/">Dashboard</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className=" w-2/3 py-5 my-12">
        <h1 className="text-2xl font-bold text-center mt-8">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-lg mt-1 mb-4">
          Everything you need to know about the product and service
        </p>
        <Accordion defaultExpandedKeys={["0"]}>
          {defaultContent.map((item, index) => (
            <AccordionItem
              key={index}
              aria-label={item.title}
              indicator={({ isOpen }) =>
                !isOpen ? (
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    className="text-dark-blue"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleMinus}
                    className="text-dark-blue/30"
                  />
                )
              }
              title={item.title}
              classNames={{
                titleWrapper: "font-bold",
                content: "text-gray-500 -mt-2",
              }}
            >
              {item.content}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
};

export default Page;
