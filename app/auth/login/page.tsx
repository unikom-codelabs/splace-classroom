'use client'

import React, { useEffect, useState } from "react";
import {  Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { siteConfig } from "@/config/site";
import Swal from "sweetalert2";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setLoading(true)
    signIn("credentials", {
      username,
      password,
      redirect:false
    }).then(({ok,error}:any) => {
      if (error) {
        Swal.fire({
          title: 'Oops!',
          text: error,
          icon: 'error',
          confirmButtonText: 'Try Again'
        })
      }
      setLoading(false)
    })
    
  };
  useEffect(() => {
    if (session) {
      router.push('/');
    }
  },[session])



  return (
    <div className="bg-[url('/university.jpg')] bg-cover bg-center w-screen min-h-screen">
      <section className=" bg-black/50 w-screen min-h-screen">
        <header className="bg-white p-4 px-10">
          <h1 className="font-bold text-dark-blue text-xl">{siteConfig.name}</h1>
        </header>
        <section className="md:m-10 p-5 grid grid-rows-[200px_1fr] md:grid-rows-none md:grid-cols-2 items-center md:mx-20 gap-10 md:gap-20">
          <div className="text-white text-center md:text-start">
            <h1 className="font-bold text-2xl md:text-4xl">Welcome To {siteConfig.name}</h1>
            <p className="md:text-2xl">Bring Your Learning more explosive</p>
          </div>
          <div className="flex flex-col bg-white p-4 md:p-8 rounded-md w-full justify-self-end">
            <h1 className="text-xl md:text-3xl font-bold">Login</h1>
            <p>Login for access the platform</p>
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
                  startContent={<FontAwesomeIcon icon={faUser} className="mx-2 text-dark-blue"/>}
                  classNames={{
                    label: "font-bold text-md"
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
                  startContent={<FontAwesomeIcon icon={faLock} className="mx-2 text-dark-blue"/>}
                  classNames={{
                    label: "font-bold text-md"
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
          </div>
        </section>
      </section>
    </div>
    
  );
};

export default Login;
