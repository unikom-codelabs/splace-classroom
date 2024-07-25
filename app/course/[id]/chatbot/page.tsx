"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import fetchApi from "@/utils/fetchApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { chatbot } from "@/config/data-dummy";
import { Spinner } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function page({ params }: any) {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmitChat = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setData((prev: any) => [
      ...prev,
      {
        role: "user",
        content: message,
      },
    ]);

    let dataMessage =
      history.length > 2
        ? history
            .slice(0, 2)
            .concat(history.slice(history.length - 2, history.length))
        : history;

    dataMessage = dataMessage.map((item) => {
      return {
        role: item.role,
        content: item.content,
      };
    });

    // const res = await fetchApi(`/courses/${params.id}/chat`, "POST", {
    try {
      const res = await fetchApi(`/courses/101/chat`, "POST", {
        query: message,
        messages: dataMessage,
      });

      if (res) {
        if (res.data.resources.length > 0) {
          setHistory((prev: any) => [
            ...prev,
            {
              role: "user",
              content: message,
            },
            {
              role: "assistant",
              content: res.data.message,
              resources: res.data.resources,
            },
          ]);
        }

        setData((prev: any) => [
          ...prev,
          {
            role: "assistant",
            content: res.data.message,
            resources: res.data.resources,
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
      setData((prev: any) => [
        ...prev,
        {
          role: "assistant",
          content: "Chatbot feature is having issues, try again later",
        },
      ]);
    } finally {
      setMessage("");
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-white flex justify-center items-center ">
      <section className="max-w-4xl w-full rounded-lg flex flex-col h-[80vh]">
        <section className="flex-grow overflow-auto py-2 px-4">
          {data.length != 0 ? (
            data.map((message: any, index: number) => {
              const parsedMessage = message?.resources;
              return (
                <Card
                  key={index}
                  shadow="sm"
                  className={`mb-4 w-fit ${
                    message.role == "user"
                      ? "ms-auto bg-blue-400 text-white"
                      : ""
                  }`}
                >
                  <CardBody>
                    <div>{message.content}</div>
                  </CardBody>
                  <CardFooter
                    className={`flex flex-wrap gap-3 ${
                      (!parsedMessage || parsedMessage.length == 0) && "hidden"
                    }`}
                  >
                    <h3 className="font-semibold">Reference :</h3>
                    {message.role == "assistant" &&
                      parsedMessage &&
                      parsedMessage.map((item: any, index: number) => {
                        if (!item.path) return null;
                        return (
                          <Link
                            key={index}
                            href={item.path || ""}
                            target="_blank"
                            className="text-blue-500 hover:underline bg-blue-100 dark:bg-blue-950 px-2 rounded-lg flex flex-row items-center gap-1"
                          >
                            <Icon icon="hugeicons:pdf-02" className="mr-1" />
                            {item.name || "No Title"}
                          </Link>
                        );
                      })}
                  </CardFooter>
                </Card>
              );
            })
          ) : (
            <section className=" text-center space-y-8 h-full flex items-center justify-center flex-col">
              <div>
                <h1 className="text-xl md:text-3xl text-dark-blue">
                  Welcome to ChatBot
                </h1>
                <h1 className="text-sm md:text-lg">
                  Get the answer results based on the module in this class,
                  without taking data from outside.
                </h1>
              </div>
              <div className="md:grid hidden md:grid-cols-[300px_300px] gap-2">
                <Card shadow="sm" className="border-gray-200 border-1 px-4">
                  <CardHeader className="my-1">
                    <Icon
                      icon="quill:chat"
                      className="text-dark-blue text-3xl"
                    />
                    <h1 className="mx-2 text-xl">Example</h1>
                  </CardHeader>
                  <CardBody className="space-y-3 text-sm">
                    <p className="border-gray-200 border-1 p-2 rounded-md">
                      “Tell me about the history of the Taj Mahal”
                    </p>
                    <p className="border-gray-200 border-1 p-2 rounded-md">
                      “Calculate the derivate of the function y=3x^2+2x”
                    </p>
                    <p className="border-gray-200 border-1 p-2 rounded-md">
                      “What news happened in the world today?”
                    </p>
                  </CardBody>
                </Card>
                <Card shadow="sm" className="border-gray-200 border-1 px-4">
                  <CardHeader>
                    <Icon
                      icon="ph:warning-light"
                      className="text-dark-blue text-3xl"
                    />
                    <h1 className="mx-2 text-xl">Limitations</h1>
                  </CardHeader>
                  <CardBody className="space-y-3 text-sm">
                    <p className="border-gray-200 border-1 p-2 rounded-md ">
                      May sometimes produce inaccurate or erroneous data
                    </p>
                    <p className="border-gray-200 border-1 p-2 rounded-md">
                      Might create harmful or biased content at times
                    </p>
                    <p className="border-gray-200 border-1 p-2 rounded-md">
                      Data limitations are only based on references from
                      lecturers in this class
                    </p>
                  </CardBody>
                </Card>
              </div>
            </section>
          )}
          {loading && (
            <Card className={`mb-4 w-fit px-5`}>
              <CardBody>
                <Spinner size="sm" />
              </CardBody>
            </Card>
          )}
        </section>
        <section className="pt-4 px-6">
          <form onSubmit={handleSubmitChat} className="flex gap-4">
            <Input
              isRequired
              type="text"
              name="message"
              value={message}
              className="shadow py-0 border-2 border-dark-blue/50 rounded-xl"
              onChange={(e: any) => setMessage(e.target.value)}
              placeholder="Enter the command here"
              endContent={
                <Button variant="light" isIconOnly type="submit">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </Button>
              }
            />
          </form>
          <p className="my-2 text-center text-gray-400">
            ChatBot can make mistakes. Consider checking important information.
          </p>
        </section>
      </section>
    </section>
  );
}
