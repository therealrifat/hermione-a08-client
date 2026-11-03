"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { IEvent } from "./eventCard";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


const EventJoind = ({ data }: {data: IEvent}) => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  
  const handleJoinEvent = async() => {
      if (!session) {
        

      router.push("/login");
      toast.error("Please login to join this event");

      return;
    }

    const jointEvent = {
      eventId: data._id,
      eventDate: data.eventDate,
      eventName: data.eventTitle,
      email: session?.user.email
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/manage`,{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(jointEvent)
    })

    const afterSubmit = await res.json()
    if(afterSubmit){
        toast.success(afterSubmit.message)
    }


    

  };
  return (
    <div>
      <Button onClick={handleJoinEvent}>Join Event</Button>
    </div>
  );
};

export default EventJoind;
