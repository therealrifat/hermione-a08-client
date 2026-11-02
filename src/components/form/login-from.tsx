"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

export function LoginForm() {
  const handleLoginForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userInfo = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: userInfo.email as string,
      password: userInfo.password as string,
      callbackURL: "/events",
    });

    

    if(data?.token){
      toast.success(`${data?.user?.name} Login Successfull `)
    }

    if(error){
      toast.error(error.message as string)
    }
  };

  return (
    <div className="w-100 mt-10">
      <Card>
        <div className="flex flex-col items-center">
          <Image
            src="/image/bondhub.png"
            width={50}
            height={60}
            alt="logo"
            className="border border-green-400 rounded-full px-2 py-1 "
          />
        </div>
        <CardHeader className="text-center">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLoginForm}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" name="password" required />
              </Field>
              <Field>
                <Button type="submit" className={"bg-green-800"}>
                  Login
                </Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
