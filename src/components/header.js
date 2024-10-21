// src/components/Header.js
"use client";
import { useState } from "react";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import DarkModeToggle from "./darkmodetoggle";
import LogoutIcon from "./LogoutIcon";
import Image from 'next/image'

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  
  const userEmail = auth.currentUser?.email; // Get user email from Firebase

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/login"); // Redirect to login page after logout
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.body.classList.toggle("dark", !darkMode); // Toggle dark class on body
  };

  return (
    <header className={`flex justify-between rounded-3xl items-center p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                    <svg width="107" height="66" viewBox="0 0 107 66" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.2234 38.5158L43.4794 64.108L2.42182 30.7593L18.4228 18.4647L42.2234 38.5158Z" fill="url(#paint0_linear_1_32)"/>
            <path d="M43.6472 2.22369L42.0761 23.0003L17.2662 42.8006L0.519889 30.2879L43.6472 2.22369Z" fill="url(#paint1_linear_1_32)"/>
            <path d="M63.2179 27.4979L61.5466 1.92958L103.14 34.6073L87.3408 47.16L63.2179 27.4979Z" fill="url(#paint2_linear_1_32)"/>
            <path d="M62.3834 63.8084L63.6171 43.009L88.1022 22.8085L105.049 35.0478L62.3834 63.8084Z" fill="url(#paint3_linear_1_32)"/>
            <path d="M62 1.72369L62 12.7237L43 64.2237L43 50.2237L62 1.72369Z" fill="url(#paint4_linear_1_32)"/>
            <defs>
            <linearGradient id="paint0_linear_1_32" x1="8.77444" y1="25.3321" x2="42.567" y2="64.8874" gradientUnits="userSpaceOnUse">
            <stop stop-color="#008000"/>
            <stop offset="1" stop-color="#FFFF00"/>
            </linearGradient>
            <linearGradient id="paint1_linear_1_32" x1="8.89758" y1="35.8806" x2="36.0444" y2="5.34262" gradientUnits="userSpaceOnUse">
            <stop offset="0.131257" stop-color="#008000"/>
            <stop offset="1" stop-color="#FFFF00"/>
            </linearGradient>
            <linearGradient id="paint2_linear_1_32" x1="96.8765" y1="40.1369" x2="62.4461" y2="1.13547" gradientUnits="userSpaceOnUse">
            <stop stop-color="#008000"/>
            <stop offset="1" stop-color="#FFFF00"/>
            </linearGradient>
            <linearGradient id="paint3_linear_1_32" x1="96.5821" y1="29.5918" x2="69.9346" y2="60.5665" gradientUnits="userSpaceOnUse">
            <stop offset="0.131257" stop-color="#008000"/>
            <stop offset="1" stop-color="#FFFF00"/>
            </linearGradient>
            <linearGradient id="paint4_linear_1_32" x1="61.9337" y1="4.1436" x2="52.5983" y2="65.984" gradientUnits="userSpaceOnUse">
            <stop stop-color="#008000"/>
            <stop offset="1" stop-color="#FFFF00"/>
            </linearGradient>
            </defs>
            </svg>
      <h1 className="text-lg font-bold">ET-Devs Collab</h1>
      <div className="flex items-center">
        <span className="mr-4">{userEmail}</span>
        <button onClick={toggleDarkMode} className="mr-4">
          {darkMode ? 
        <span role="img" aria-label="Light Mode">
          ☀️
        </span> : 
         (
        <span role="img" aria-label="Dark Mode">
          🌙
        </span>
      )}
          

        </button>
         {/* <DarkModeToggle  /> */}
        <button className="text-red-500" onClick={handleLogout}>
            <LogoutIcon />
        </button>
        <button type="button" class="text-gray-900 bg-gradient-to-r from-green-200 via-yellow-300 to-red-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Go Premium</button>


        
        {/* <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>Logout</button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg">
              <button onClick={handleLogout} className="block w-full text-left p-2 hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="11.323999786376953 12.786999130249024 41.35299987792969 38.426997375488284" enable-background="new 0 0 64 64">
                <g>
                    <g>
                    </g>
                    
                        <path fill="#FFFFFF" stroke="#1E1D1BFF" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="   M35.631,50.364h-17.27c-3.417,0-6.187-2.77-6.187-6.187V19.824c0-3.417,2.77-6.187,6.187-6.187h17.27   c3.417,0,6.187,2.77,6.187,6.187v24.353C41.818,47.593,39.048,50.364,35.631,50.364z"/>
                </g>
                <g>
                    <path fill="none" stroke="#FF0000FF" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="   M36.815,36.988 M41.818,36.988H26.807"/>
                </g>
                <g>
                    <path fill="none" stroke="#FF0000FF" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="   M46.35,31.511l5.477,5.477l-5.477,5.477 M51.826,36.988H41.818"/>
                </g>
                </svg>
              </button>
            </div>
          )}
        </div> */}
      </div>
    </header>
  );
}
