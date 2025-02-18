import Link from 'next/link';
import NavLinks from '@/app/ui/nav-links';
import LogoutButton from '@/app/ui/logout-btn';

export default function Navbar(){
    return(
        <div className='flex justify-center w-full p-[2vh]'>
            <div className='flex p-[1vh] gap-1 w-fit bg-gray-50 h-fit rounded-md'>
                <NavLinks/>
                <LogoutButton/>
            </div>
        </div>
    );
}