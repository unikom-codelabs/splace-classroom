"use client";

import SettingForm from "@/components/settings/settingsForm";
import AdminLayout from "@/layouts/AdminLayout";

import { useEffect, useState } from "react";
import { NoSSR } from "@/utils/no-ssr";
import Loading from "@/app/course/[id]/loading";

const Home = () => {
  const steps = ["User Profile", "Color Pallete"];

  const [currentStep, setCurrentStep] = useState(1);

  return (
    <AdminLayout title="LMS Management" subtitle="Manage your LMS Here" header>
      <NoSSR onSSR={() => <Loading />}>
        <SettingForm step={{ currentStep, setCurrentStep }} steps={steps} />
      </NoSSR>
    </AdminLayout>
  );
};

export default Home;
