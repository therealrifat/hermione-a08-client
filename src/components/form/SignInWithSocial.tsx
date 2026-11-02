import { signIn } from "@/lib/auth-client";
import React from "react";
import { Button } from "../ui/button";

const SignInWithSocial = () => {
  const signInGoogle = async () => {
    const data = await signIn.social({
      provider: "google",
    });

    console.log(data)
  };
  return (
    <div>
      <div className="flex gap-2 justify-center">
        <Button onClick={signInGoogle} variant="outline" type="button" className={"w-full"}>
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default SignInWithSocial;
