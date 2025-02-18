"use client"

import Navbar from '@/app/ui/navbar';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/context/AuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoggedIn) {
        router.push("/"); // Redirect to login if not authenticated
      }
    }, [isLoggedIn, router]);

    return (
      <div>
        <Navbar/>
        <div>
          {children}
        </div>
      </div>
    );
  }