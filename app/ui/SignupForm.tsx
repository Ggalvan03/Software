/* 
Fri 14 Feb 2025 - Gabriel Galván
This function is the sign-up form for the website. Users can fill it out, and the data is stored in state.
*/

"use client";

import { useState } from 'react';

// Define form data type
type FormData = {
    name: string,
    email: string, 
    password: string,
    confirmPassword: string,
};

export default function SignUpForm() {
    // State variables to store user input
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handles form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /*
    This function handles the submission, validating the password confirmation
    and logging the data.
    */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior.
        setError('');
        setSuccess('');
        
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        console.log("User Data:", JSON.stringify(formData, null, 2));
        setSuccess("User data stored successfully!");
    };
    
    return (
        <div className='flex justify-center items-center h-fit bg-slate-200 rounded-[1vh]'>
            <form onSubmit={handleSubmit} className="flex items-center flex-col gap-3 p-6 w-80">
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>

                <label htmlFor="name" className="font-medium w-full">
                    Name:
                </label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="p-2 border border-gray-300 rounded w-full" required />

                <label htmlFor="email" className="font-medium w-full">
                    Email:
                </label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="p-2 border border-gray-300 rounded w-full" required />

                <label htmlFor="password" className="font-medium w-full">
                    Password:
                </label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="p-2 border border-gray-300 rounded w-full" required />

                <label htmlFor="confirmPassword" className="font-medium w-full">
                    Confirm Password:
                </label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="p-2 border border-gray-300 rounded w-full" required />

                {/* This line handles showing available error messages */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}
                
                <button type="submit" className="py-2 px-10 mt-2 text-white font-bold bg-blue-500 rounded-[4vh] hover:bg-blue-600 ">
                    Sign Up
                </button>
            </form>
        </div>
    );
}
