/* 
Fri 14 Feb 2025 - Gabriel Galván
This function is the forgot password form for the website. Users can enter their email
address to receive a password recovery email.
*/

"use client";

import { useState } from 'react';

export default function ForgotPasswordForm() {
    // State variable to store user input
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handles form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    /*
    This function handles the submission, validating the email format
    and simulating sending a recovery email.
    */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior.
        setError('');
        setSuccess('');
        
        if (!email.includes('@')) {
            setError("Please enter a valid email address");
            return;
        }

        console.log("Recovery email sent to:", email);
        setSuccess("A password recovery email has been sent to your address!");
    };
    
    return (
        <div className='flex justify-center items-center h-fit bg-slate-200 rounded-[1vh]'>
            <form onSubmit={handleSubmit} className="flex items-center flex-col gap-3 p-6 w-80">
                <h2 className="text-2xl font-bold text-center">Forgot Password</h2>

                <label htmlFor="email" className="font-medium w-full">
                    Email Address:
                </label>
                <input type="email" id="email" name="email" value={email} onChange={handleChange} className="p-2 border border-gray-300 rounded w-full" required />

                {/* This line handles showing available error messages */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
                
                <button type="submit" className="py-2 px-10 mt-2 text-white font-bold bg-blue-500 rounded-[4vh] hover:bg-blue-600 ">
                    Send Recovery Email
                </button>
            </form>
        </div>
    );
}
