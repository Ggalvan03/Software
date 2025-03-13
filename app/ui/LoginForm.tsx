/* 
Fri 14 Feb 2025 - Gabriel Galván
This function is the login form for the website, since it's the first iteration 
the process is hardcoded to the username Rhodey and password WARMACHINEROXX.
*/

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/context/AuthContext';
import Link from 'next/link';

export default function LoginForm() {
    // State variables are used to handel information on the page
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    // The useRouter function allows for the navegation between pages
    const router = useRouter();

    /*
    This function handles the submition details, validating the username and password
    and handleing rerouting of the website.
    */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior (which refreshes the page).
    
        // User Rhodey Password WARMACHINEROXX
        if (username === 'Rhodey' && password === 'WARMACHINEROXX') {
          setError(''); // Clear any previous error.
          login(); // update auth state in context
          router.push('/home'); // Redirect to the dashboard page.
        } else {
          setError('Invalid username or password'); // Show an error message if credentials do not match.
        }
      };
    
    return (
        <div className='flex justify-center items-center h-fit bg-slate-200 rounded-[1vh]'>
            <form onSubmit={handleSubmit} className="flex items-center flex-col gap-3 p-6 w-80">
            <h2 className="text-2xl font-bold text-center">Login</h2>

            <label htmlFor="username" className="font-medium w-full">
                Username:
            </label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 border border-gray-300 rounded"
            />

            <label htmlFor="password" className="font-medium w-full">
                Password:
            </label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border border-gray-300 rounded"
            />

            {/* This line Handles showing avalable error messages*/}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <button type="submit" className="py-2 px-10 mt-2 text-white font-bold bg-blue-500 rounded-[4vh] hover:bg-blue-600 ">
                Login
            </button>

            </form>
        </div>
    );
}