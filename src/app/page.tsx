"use client";
import Head from 'next/head';
import { useRouter } from 'next/navigation'; // Changed import from "next/navigation"
import { useState, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "./firebase.js";
import Home from "./home/page.jsx";

export default function Login() {
  const router = useRouter(); // Moved router initialization outside useEffect
const [user, setUser] = useState(null);
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        router.push("/home"); // Redirect to home page if user is authenticated
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/home"); // Redirect to home page after successful login
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }

    
  };
  const handleLoginClick = () => {
    if (user) {
      alert("Please SignUp With Google you don't have any account"); // Prompt user to sign up with Google if not logged in
    } else {
      signInWithGoogle();  // Redirect to login page if user is already logged in
    }
  };
  return (
    <div className="container bg-blue-950 my-0">
      <Head>
        <title>Journey to a Trillion Miles</title>
        <meta name="description" content="Sign up to start your journey" />
      </Head>
      <div className="flex flex-col md:flex-row justify-between items-center my-0">
        <div className='xl:w-full w-100 xl:h-full'>
          <img src='https://s3-alpha-sig.figma.com/img/8196/a270/19da099d64771f163ae2b0b43b7b18b1?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XbfEHSb5qzzI55VdKJsZ432wSDmPz2J17dDOtlAAPfFPjlEI0blSlD8FVXyEcWSC1kkabzUdKpm7yog3yGwhqQ8vfhjPl-tMVTpO36tYNNhjQi0HplVnDlaktM1NZdxlFyh~rcUQCu-TlMxKV2pbsWoC03ekWt4v9wm57ksNtscuKJuuFI-tmVOR~V4R07R6FUFBboNLjA4TOJiY-OYCSU7j~J3fXqAOoEVadIR1~EEM4soAy~lGB~3vROhAMMfaaSXC15Ft9ZVFde0xBGs0qRa9Nxs~ak0oikSl2nvfV8amB6u5LnQN4ftbtVzXyrdi3rIT3k6a-ZZYwUBDTiBFJA__' width="100%" className='objectcover' height="100%" alt='login'></img>
          <div className="absolute bottom-13 left-2 xl:left-10 xl:bottom-2">
            <h1 className="xl:text-4xl text-center font-bold inline xl:mb-4">Lo<span className='inline bg-blue-500 rounded'>Go</span></h1>
            <p className="xl:text-xl xl:mb-6">
              Journey to a trillion miles starts from here!
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
          <h1 className="w-375 font-bold mt-20 xl:mt-0 text-2xl h-812 gap-9">Sign Up</h1>

          <p className="text-center mb-5 text-sm text-gray-500">
            Choose a sign up method
          </p>
          <div className="flex flex-col space-y-2 mt-4">
            {user ? (
              <Home />
            ) : (
              <button onClick={signInWithGoogle} className="flex my-2 items-center space-x-2 px-4 py-2 rounded-md border bg-gray-600 border-gray-300 hover:text-black hover:bg-gray-100">
                <img
                  src="/images/google.png"
                  alt="Google sign up"
                  className="w-6 h-6"
                />
                <span>Sign up with Google</span>
              </button>
            )}
            {user ? (
              <Home />
            ) : (
            <button onClick={signInWithGoogle} className="flex items-center space-x-2 px-4 py-2 my-5 rounded-md border border-gray-300 bg-gray-600 hover:text-black hover:bg-gray-100">
              <img src="/images/email.png" alt="Email sign up" className="w-6 h-6 bg-white" />
              <span>Sign up with Email</span>
            </button>
            )}
          </div>
          {user ? (
              <Home />
            ) : (
          <p className="text-center text-sm mt-4 mb-2 text-gray-500">
            Already a user? <button  onClick={handleLoginClick } className='text-blue-600'>Log in</button>
          </p>
            )}
        </div>
      </div>
    </div>
  );
}
