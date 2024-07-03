"use client";

import SettingForm from "@/components/settings/settingsForm";
import AdminLayout from "@/layouts/AdminLayout";
import HeaderSettings from "@/components/settings/headerSettings";
import FooterSettings from "@/components/settings/footerSettings";
import { useEffect, useState } from "react";
import fetchApi from "@/utils/fetchApi";
import { getColors } from "@/utils/getSettings";
import Loading from "@/app/course/[id]/loading";

const Home: React.FC = () => {
  const steps = ["User Profile", "Color Pallete"];

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  async function getData() {
    const dataSettings = await fetchApi("/settings", "GET");

    return dataSettings.data;
  }

  useEffect(() => {
    getData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  return (
    <AdminLayout
      header={
        <HeaderSettings
          stateStep={{ currentStep, setCurrentStep }}
          steps={steps}
        />
      }
      title="LMS Management"
      subtitle="Manage your LMS Here"
      footer={
        <FooterSettings
          stateStep={{ currentStep, setCurrentStep }}
          steps={steps}
        />
      }
    >
      {!loading ? <SettingForm data={data} step={currentStep} /> : <Loading />}
    </AdminLayout>
  );
};

export default Home;
