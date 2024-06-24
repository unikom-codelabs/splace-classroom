"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { siteConfig } from "@/config/site";
import Swal from "sweetalert2";
import HeaderHomepage from "@/components/auth/header";
import Link from "next/link";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    signIn("credentials", {
      username,
      password,
      redirect: false,
    }).then(({ ok, error }: any) => {
      if (error) {
        Swal.fire({
          title: "Oops!",
          text: error,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
      setLoading(false);
    });
  };
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <div className="bg-gray-100 bg-center w-screen min-h-screen">
      {/* <HeaderHomepage siteConfig={siteConfig} /> */}

      <div className="bg-gray-100 w-0 p-4 px-10"></div>
      <div className="flex flex-col bg-white p-4 md:p-8 rounded-md w-[30rem] mx-auto my-20">
        <div
          className="absolute top-28 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 bg-white p-4 rounded-md shadow-md"
          id="logo"
        >
          <img
            src="/unikom.png"
            alt="Universitas Komputer Indonesia"
            className="h-28"
          />
        </div>
        <div className="w-full bg-dark-blue/10 p-5 rounded-xl justify-start items-center gap-2.5 inline-flex mt-20">
          <div className=" text-dark-blue text-base font-normal">
            For Students, please log in using the username (NIM) and password as
            used at https://my.university.ac.id
            <br />
            <br />
            For Lecturers, please log in using the university Email account
            (@email.university.ac.id) by clicking the Log in Lecturer Using
            university Email button located below the Log in form.
          </div>
        </div>
        <form onSubmit={handleSubmit} className="w-full my-5">
          <div className="space-y-10 mb-10">
            <Input
              isRequired
              type="text"
              id="username"
              name="username"
              value={username}
              placeholder="Type your username here"
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
              labelPlacement="outside"
              startContent={
                <FontAwesomeIcon
                  icon={faUser}
                  className="mx-2 text-dark-blue"
                />
              }
              classNames={{
                label: "font-bold text-md",
              }}
            />
            <Input
              isRequired
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Type your password here"
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              labelPlacement="outside"
              startContent={
                <FontAwesomeIcon
                  icon={faLock}
                  className="mx-2 text-dark-blue"
                />
              }
              classNames={{
                label: "font-bold text-md",
              }}
            />
          </div>
          <div className="flex items-center justify-between text-dark-blue">
            <Button
              isLoading={loading}
              type="submit"
              className="w-full bg-dark-blue text-white font-bold"
            >
              Login
            </Button>
          </div>
        </form>
        <div className="text-center text-sm font-medium text-gray-400">
          <Link href="/auth/forgot-password">
            Forgotten your username or password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
