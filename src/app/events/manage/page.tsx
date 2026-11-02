import { auth } from "@/lib/auth";

import { headers } from "next/headers";
import React from "react";

const ManageEvent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });


  console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}/manage/${session?.user.email}`)

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_SERVER_URL}/manage/${session?.user.email}`,
//   );
//   const data = await res.json();

  // const res = await fetch()
  return (
    <div>
      <h1>manage event</h1>
    </div>
  );
};

export default ManageEvent;
