
"use client";
import Head from 'next/head';
import React, { useEffect, useState } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from"next/navigation";
import * as app from "../firebase.js";


export default function Home() {
  
const auth = getAuth();
const router = useRouter();
const [user, setUser] = useState(null);
useEffect(() => {
  const unsubscribe = onAuthStateChanged (auth, (user) => {
  if (user) {
  setUser (user);
  }
  else {
  router.push("/"); // Redirect to the login page if the user is not authenticate
  }
  });
  return()=> unsubscribe();
},[auth,router]);
const handleLogout = async () =>{
  try {
  await signOut(auth);
  router.push("/"); // Redirect to the login page after logout
  }catch (error) {
  console.error ("Error signing out:", error.message);
  }
};
    const topics = [
      " Rocket Science",
      "Astro Physics",
      "Artificial Intelligence",
      "Telescope"
      // Add more topics as needed
    ];
    const images = [
       "https://s3-alpha-sig.figma.com/img/8851/94da/7c4f678a8b996e2e4bc1655d917f4d04?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OgovjQXscbjMQqLd41bmSbR9SnQS7bIdGkrwOQJ~BNFvrmPwN-MfBGFF4ZN7Q6NrzOiWyDSmE29bZWzFNdxrE9QdfJL~jBcXoWvEgR~t3pWbRqizIJAG10i798X3qKVMLIrLsWBMrv0-wNq~LiJoB5N2EFp7uPYPN5bF9KHC-6pzUbPlJaZOt9GF35ugI97boI5lzJDcIxuG7D7dSzWY2z4cX5vJTvSdkbkIfMUC6vlVnww-3BkrPWmdS3HvJn8fJaOAulvrC7EoNaAY7MTZYVABafY52wS0ftHfbcGu1MqpR4ilsiyfLtWUp86QJB1jPVnUo4QpDcDbjP~1~RiKuA__",
       "/images/2.png",
       "/images/1.png",
       "/images/3.png"
    ];
  
    return (
      <div className="container">
        <nav className="flex items-center justify-between bg-blue-950 border-b-4 border-gray-500 p-4">
          <h1 className="text-4xl mt-2 font-bold inline xl:mb-4">Lo<span className="inline bg-blue-500 rounded">Go</span></h1>
          <div>
          <button onClick={handleLogout} className="w-375 font-bold  text-blue-500  text-2xl h-812 ">Sign out </button>
          </div>
        </nav>
       <h1 className='m-5 font-bold text-3xl' > Popular Topics 🔥 </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 m-5  flex flex-row xl:flex-col lg:grid-cols-4 gap-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-blue-950 w-full my-10 rounded-lg shadow-md p-6 mb-4 ">
              <div className="flex flex-col xl:flex-row">
                <div className="xl:w-1/4  ">
                  <img
                    src={images[index]} // Accessing corresponding image URL using index
                    className="w-full h-auto object-cover"
                    alt="Topic Image"
                  />
                </div>
                <div className="ml-6 flex-1">
                  <h2 className="text-xl font-bold mb-4">{topic}</h2>
                  <p className="text-gray-200">
                    Covers fundamentals, design, construction, operation and programming of robots. Covers fundamentals, design, construction, operation and
                  </p>
                </div>
              </div>
              <button className="mt-4 block w-full mb-0 px-4 py-2 border border-gray-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Read
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
