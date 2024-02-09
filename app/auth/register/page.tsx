'use client'
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { fetchData } from "next-auth/client/_utils";
import fetchApi from "@/utils/fetchApi";
import { useRouter } from "next/navigation";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Add your registration logic here
    const registered = await fetchApi('/auth/register', 'POST', {
      username,
      password,
    })
    if (!registered) console.log('error')
    router.push('/auth/login')
  };

  return (
    <section className="flex flex-col py-10 items-center">
      <div>
        <h1 className="text-3xl font-bold">Register</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8 w-full">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <Input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={comfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <Link href="/auth/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            i already have an account
          </Link>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold">
            Register
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Register;
