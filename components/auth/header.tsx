"use client";

import { Button, Divider } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faFileLines } from "@fortawesome/free-solid-svg-icons";
import UsageGuide from "./usageGuide";
import Link from "next/link";

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

const HeaderHomepage = ({ siteConfig }: any) => {
  return (
    <header className="bg-white p-4 px-10 flex flex-row justify-between shadow-md">
      <div className="flex flex-row gap-4">
        <Link href="/">
          <h1 className="font-bold text-dark-blue text-xl mt-1">
            {siteConfig.name}
          </h1>
        </Link>
        <UsageGuide learnMore={learnMore} guide={true} />
      </div>

      <div className="flex flex-row gap-2">
        <Button variant="light" href="mailto:lms@email.com">
          <span className="font-bold">Contact LMS:</span> lms@email.com
        </Button>
        <Divider orientation="vertical" />
        <Button
          className="bg-dark-blue text-white font-bold"
          endContent={<FontAwesomeIcon icon={faChevronRight} />}
        >
          <Link href="/auth/login">Login</Link>
        </Button>
      </div>
    </header>
  );
};

export default HeaderHomepage;
