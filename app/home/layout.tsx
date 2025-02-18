"use client"

import Navbar from '@/app/ui/navbar';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/context/AuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { isLoggedIn, isInitialized } = useAuth();
    const router = useRouter();

    useEffect(() => {
      // Only perform the redirect check after initialization is complete
      if (isInitialized && !isLoggedIn) {
        router.push("/");
      }
    }, [isInitialized, isLoggedIn, router]);

    return (
      <div>
        <Navbar/>
        <div>
          {children}
        </div>
      </div>
    );
  }