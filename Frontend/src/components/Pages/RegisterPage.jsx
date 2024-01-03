import React from 'react'
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast,Toaster } from "react-hot-toast";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";


const RegisterPage = () => {
    const {setUserInfo, userInfo} = useContext(UserContext);
    const navigate = useNavigate();
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const register =  async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:3000/register", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                userName,
                password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            })
            const data = await res.json();
            
            if (res.status === 200) {
                setUserInfo(data);
                toast.success("Register Success");
                navigate("/");
            } else {
                toast.error(data.error);            
            } 
    };


  return (
    <>
     <h1 className="text-5xl font-semibold mb-6 text-center">Register</h1>
        <form
            onSubmit={register}
            className="flex justify-center flex-col items-center  gap-4   "
        >
            <input
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            type="text "
            className="border-2  px-5 py-3 w-[50%] bg-[#eee] text-2xl rounded-xl"
            placeholder="username"
            />
            <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="border-2  px-5 py-3 w-[50%] bg-[#eee] text-2xl rounded-xl"
            placeholder="password"
            />
            <button
            type="submit"
            className="border-2  px-5 py-3 w-[50%] bg-blue-500  text-2xl  rounded-xl"
            >
            Login
            </button>
            <p className="text-xl">Already have an account? <Link to={'/login'} className="text-blue-700   ">Login</Link> </p>
            <Toaster/>
        </form>
    </>
  )
}

export default RegisterPage