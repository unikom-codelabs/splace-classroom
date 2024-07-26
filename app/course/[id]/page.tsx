"use client";
import React, { useEffect, useState } from "react";
import { Course, Resource } from "@/config/data-dummy";
import { Image } from "@nextui-org/image";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import fetchApi from "@/utils/fetchApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useSession } from "next-auth/react";
import { Spinner } from "@nextui-org/react";
import { User } from "@/types";
import { useDisclosure } from "@nextui-org/react";
import ResourceList from "@/components/resource/resourceList";
import EmptyResource from "@/components/resource/emptyResource";
import Modal from "@/components/modal";
import FormResource from "@/components/resource/formResource";
import Loading from "./loading";
import { Icon } from "@iconify/react";
import useSWR, { mutate } from "swr";

export default function page({ params }: any) {
  const modal = useDisclosure();
  const { data: session } = useSession();
  const userData = session?.user as User;

  const [canUpload, setCanUpload] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [moduleStatus, setModuleStatus] = useState("");
  const fetcher = (url: any) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `/api/courses/${params.id}`,
    fetcher,
    {
      refreshInterval: 10000,
    }
  );

  useEffect(() => {
    if (data) {
      const modulesWithPath = data.data.module.filter((mod: any) => mod.path);
      const lastModuleWithPath = modulesWithPath[modulesWithPath.length - 1];

      if (lastModuleWithPath) {
        setModuleStatus(lastModuleWithPath.status);
      }
    }
  }, [data]);

  async function handleUpload(e: any) {
    e.preventDefault();

    const apiServer = process.env.NEXT_PUBLIC_API_URL;

    setLoadingSubmit(true);
    const formData = new FormData(e.target);
    formData.append("course_id", params.id);
    const res = await fetch(apiServer + `/resources`, {
      method: "POST",
      body: formData,
    });
    if (res) {
      mutate(`/courses/${params.id}`);
    }
    setLoadingSubmit(false);
    modal.onClose();
  }

  useEffect(() => {
    if (userData?.role !== "STUDENT" && session) setCanUpload(true);
    else setCanUpload(false);
  }, [session]);

  if (isLoading) return <Spinner className="w-full text-center" />;
  return (
    <section className="w-full flex flex-col gap-5">
      <Card className="w-full h-60 col-span-12 sm:col-span-7 rounded-t-none">
        <Image
          removeWrapper
          alt="Course banner"
          className="z-0 h-full object-cover rounded-t-none"
          src="/liquid-cheese.svg"
        />
        <CardFooter className="absolute bottom-0 z-10 text-white px-5 flex flex-col items-start">
          <h1 className="text-3xl font-semibold">{data?.data.name}</h1>
          <p>{data?.data.instructor}</p>
        </CardFooter>
      </Card>
      {canUpload && (
        <>
          <Button
            variant="bordered"
            className="flex justify-start bg-white"
            radius="none"
            size="lg"
            startContent={<FontAwesomeIcon icon={faPlus} />}
            onPress={modal.onOpen}
          >
            Add Your Section In Here
          </Button>
          <Modal
            title="Add Section"
            isOpen={modal.isOpen}
            onOpenChange={modal.onOpenChange}
            btnActionTitle="Upload"
            submit={handleUpload}
            loading={loadingSubmit}
          >
            <FormResource />
          </Modal>
        </>
      )}
      <section>
        {moduleStatus === "on_progress" && (
          <div className="flex justify-between p-4 bg-primary/25 rounded-lg  items-center mb-3">
            <div className="flex justify-start gap-4">
              <Spinner />

              <div>
                <h2 className="text-md font-semibold">
                  Newly uploaded modules are being processed
                </h2>
                <span className="text-sm text-red-500/80">
                  (You cannot use the new module for chatbot & quiz generator
                  until the module process is complete)
                </span>
              </div>
            </div>
          </div>
        )}

        {data.data.module.length > 0 ? (
          <ResourceList
            userRole={userData?.role}
            module={data.data.module}
            params={params}
          />
        ) : (
          <EmptyResource />
        )}
      </section>
    </section>
  );
}