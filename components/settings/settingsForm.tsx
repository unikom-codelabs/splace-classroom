"use client";

import React, { FormEvent, useEffect } from "react";
import FileUpload from "./fileUploud";
import { Button, Divider, Input } from "@nextui-org/react";
import { RadioGroup, Radio, cn } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSettingsStore } from "@/utils/useSettingsStore";
import FooterSettings from "./footerSettings";

const CustomRadio = (props: any) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-1 border-gray-200",
          "data-[selected=true]:border-primary"
        ),
      }}
    >
      {children}
    </Radio>
  );
};

const colors = [
  {
    name: "Blue",
    hex: "#0057EE",
  },
  {
    name: "Red",
    hex: "#FC0B0B",
  },
  {
    name: "Orange",
    hex: "#FF5C1B",
  },
  {
    name: "Yellow",
    hex: "#FFC815",
  },
  {
    name: "Green",
    hex: "#54F546",
  },
  {
    name: "Teal",
    hex: "#00CFEE",
  },
];

const SettingForm = ({ step, steps }: any) => {
  const router = useRouter();
  const { settings } = useSettingsStore();

  const { currentStep, setCurrentStep } = step;

  const [nameUniversity, setNameUniversity] = React.useState(
    settings.university_name
  );
  const [contact, setContact] = React.useState(
    settings.contact_us[0].email
  ) as any;
  const [imagesLogo, setImagesLogo] = React.useState<File[]>([]);
  const [imagesBanner, setImagesBanner] = React.useState<File[]>([]);
  const [uploading, setUploading] = React.useState(false);
  const [submitForm, setSubmitForm] = React.useState(settings);
  const [formData, setFormData] = React.useState({}) as any;
  const [colorHex, setColorHex] = React.useState(settings.color[0]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const colors = [`${colorHex}`, "#000"];
    const contacts = [
      {
        email: contact,
      },
    ];

    const datas = new FormData(e.target as HTMLFormElement);
    datas.append("project_name", "EduClassAI");
    datas.append("university_name", nameUniversity);
    datas.append("contact_us", JSON.stringify(contacts));
    datas.append(
      "description",
      "LMS Universitas Komputer Indonesia merupakan media pembelajaran daring untuk memudahkan proses pengajaran di lingkungan Universitas Komputer Indonesia"
    );

    colorHex && datas.append("color", JSON.stringify(colors));

    imagesLogo.length > 0 && datas.append("logo", imagesLogo[0]);

    imagesBanner.length > 0 && datas.append("banner", imagesBanner[0]);

    setUploading(true);

    const apiServer = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(apiServer + "/settings", {
      method: "POST",
      body: datas,
    });
    if (res.ok) {
      toast.success("Settings Updated");
      setTimeout(function () {
        router.push("/welcome");
        router.refresh();
      }, 1000);
    } else {
      toast.error("Update Settings Error");
    }

    setFormData({});

    setUploading(false);
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <div className={`p-4 bg-white ${currentStep == 1 ? "" : "hidden"}`}>
        <h3 className="text-xl font-semibold mb-4">
          Change To Your University
        </h3>
        <form>
          <div className="mb-4 flex flex-row gap-16">
            <div className="flex flex-row gap-1 text-gray-700 text-sm font-bold mb-2 w-32">
              University <span className="text-red-500">*</span>
            </div>
            <Input
              isClearable
              radius="md"
              placeholder="Name University"
              value={nameUniversity}
              onValueChange={setNameUniversity}
            />
          </div>
          <div className="mb-4 flex flex-row gap-16">
            <div className="flex flex-row gap-1 text-gray-700 text-sm font-bold mb-2 w-32">
              Email Contact <span className="text-red-500">*</span>
            </div>
            <Input
              isClearable
              radius="md"
              placeholder="example@gmail.com"
              type="email"
              value={contact}
              onValueChange={setContact}
            />
          </div>

          <FileUpload label="Logo" ukuran="1:1" store={setImagesLogo} />
          <FileUpload label="Banner" ukuran="4:3" store={setImagesBanner} />
        </form>
      </div>
      <div
        className={`p-4 bg-white max-h-min h-fit ${
          currentStep >= 2 ? "" : "hidden"
        }`}
      >
        <h3 className="text-xl font-semibold mb-4">Color Pallate</h3>

        <div className="mb-10 flex flex-row gap-16 ">
          <div className="flex flex-row gap-1 text-gray-700 text-sm font-bold mb-2 w-44">
            Select Color Pallate <span className="text-red-500">*</span>
          </div>
          <RadioGroup
            defaultValue={"#0057EE"}
            onValueChange={setColorHex}
            value={colorHex}
          >
            <div className="flex flex-row gap-4 flex-wrap">
              {colors.map((color, index) => (
                <CustomRadio value={color.hex} key={index}>
                  <div className="flex flex-row gap-4 align-middle justify-items-center items-center">
                    <div
                      className="w-10 h-10"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <div className="flex flex-col gap-0">
                      <span className="font-semibold text-sm">
                        {color.name}
                      </span>
                      <span className="text-xs">{color.hex}</span>
                    </div>
                  </div>
                </CustomRadio>
              ))}
            </div>
          </RadioGroup>
        </div>
        <div className="mb-4 flex flex-row gap-16">
          <div className="flex flex-row gap-1 text-gray-700 text-sm font-bold mb-2 w-32 ">
            Main Color Pallate <span className="text-red-500">*</span>
          </div>
          <Input
            className="ml-4"
            isClearable
            radius="md"
            value={colorHex}
            onValueChange={setColorHex}
          />
        </div>
      </div>
      <FooterSettings
        stateStep={{ currentStep, setCurrentStep }}
        steps={steps}
        loading={uploading}
      />
    </form>
  );
};

export default SettingForm;
