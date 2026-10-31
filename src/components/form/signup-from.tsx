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
import { signUpSchema } from "@/lib/validations/signup";
import Image from "next/image";
import React, { useState } from "react";

export function SignUPForm() {
  const [password, setPassword] = useState("");
  const requirements = [
    {
      label: "At least 6 characters",
      valid: password.length >= 6,
    },
    {
      label: "One uppercase letter (A-Z)",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "One lowercase letter (a-z)",
      valid: /[a-z]/.test(password),
    },
    {
      label: "One number (0-9)",
      valid: /[0-9]/.test(password),
    },
  ];

  const isPasswordValid = requirements.every((item) => item.valid);

  const handleSignForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const result = signUpSchema.safeParse(data);
    if (!result.success) {
      console.log(result.error.flatten().fieldErrors);
      return;
    }
    console.log(result.data);
  };

  return (
    <div className="w-100 mt-10">
      <Card>
        <div className="flex flex-col items-center">
          <Image
            src="/image/logo.png"
            width={60}
            height={60}
            alt="logo"
            className="border border-green-400 rounded-full py-2  "
          />
        </div>
        <CardHeader className="text-center">
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignForm}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="image">Image URL</FieldLabel>
                <Input
                  id="image"
                  type="url"
                  name="image"
                  placeholder="https://example.com/Image"
                  required
                />
              </Field>
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
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
                <div className="space-y-1 mt-2">
                  {requirements.map((item, index) => (
                    <p
                      key={index}
                      className={
                        item.valid
                          ? "text-green-600 text-sm"
                          : "text-red-500 text-sm"
                      }
                    >
                      {item.valid ? "✓" : "X"} {item.label}
                    </p>
                  ))}
                </div>
              </Field>
              <Field>
                <Button type="submit" disabled={!isPasswordValid} className={"bg-green-800 cursor-pointer"}>
                  Login
                </Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  have an account? <a href="#">Login</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
