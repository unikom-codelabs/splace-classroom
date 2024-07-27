"use client";

import { useSettingsStore } from "@/utils/useSettingsStore";
import { Button, Divider } from "@nextui-org/react";
import React from "react";

const FooterHomepage = ({ siteConfig }: any) => {
  const { settings, loading } = useSettingsStore();

  return (
    <footer className="bg-white border-t py-6 shadow-md">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img
            src={settings.logo}
            alt="Universitas Prasetiya Mulya Logo"
            className="h-10 mr-3"
          />

          <h1 className="text-xl font-bold">{settings.university_name}</h1>
        </div>
        <div className="flex items-center mb-4 md:mb-0">
          <Button
            className="bg-dark-blue text-white font-bold"
            href={`mailto:${settings.contact_us[0].email}`}
          >
            Contact Us
          </Button>
        </div>
      </div>
      <div className="container flex flex-row justify-between items-center mx-auto px-6 text-center border-t pt-4 mt-6">
        <p className="text-sm">
          &copy; 2024 LMS | {settings.university_name}. All rights reserved.
        </p>
        {/* <div className="mt-2">
          <a href="#" className="text-sm mx-2">
            Terms
          </a>
          <a href="#" className="text-sm mx-2">
            Privacy
          </a>
          <a href="#" className="text-sm mx-2">
            Cookies
          </a>
        </div> */}
      </div>
    </footer>
  );
};

export default FooterHomepage;
