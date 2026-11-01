
import { Button } from '../ui/button';
import { CalendarDays, CalendarPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Banner = () => {
    return (
      <div className='flex items-center mt-10  justify-center'>
        <div className='flex flex-col items-center space-y-8'>
            <h1 className='text-5xl max-w-xl text-center font-bold text-green-500'>Connect, Care, and Transform Lives Today</h1>
            <p className='max-w-2xl text-center'>Join hands to support underprivileged communities, organize winter clothing drives, or create social welfare events to bring warmth and hope where {"it's"} needed most.</p>


            <div className='flex gap-10'>
                <Link href={'events/create'}><Button className="bg-green-800 scale-120"><CalendarPlus/> Create Event</Button></Link>
                <Button variant={'outline'} className="text-green-800 scale-120"><CalendarDays/> Explore Events</Button>
            </div>

        </div>

        <div >
            <Image src='/image/community.png' width={400} height={400} alt='communuty' className=' rounded-2xl'/>
        </div>
      </div>
    );
};

export default Banner;