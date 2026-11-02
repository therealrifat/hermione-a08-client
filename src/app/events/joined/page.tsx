
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';


const JoinedEvent = async() => {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/EventJoin/${session?.user.email}`)
    const data = await res.json()
    return (
        <div>
            <h1>Joined Event: {data.length}</h1>
        </div>
    );
};

export default JoinedEvent;