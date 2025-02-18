"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
    { name: 'Home', href: '/home' },
    { name: 'Page 1', href: '/home/Page1' },
    { name: 'Page 2', href: '/home/Page2'},
    { name: 'Page 3', href: '/home/Page3'},
  ];
  
  export default function NavLinks() {
    const pathname = usePathname();
    return (
      <>
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[6vh] grow items-center justify-center gap-2 rounded-[.5vh] bg-gray-50 p-3 px-[5vh] text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start',
                {
                  'bg-sky-100 text-blue-600': pathname === link.href,
                },
              )}
            >
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
      </>
    );
  }
  