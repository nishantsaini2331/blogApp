import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { toast,Toaster } from "react-hot-toast";
import UserContext from "../../context/UserContext";

const LoginPage = () => {
    const {setUserInfo, userInfo} = useContext(UserContext);
    const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login =  async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/login", {
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

        if (res.status === 200) {
            toast.success("Login Success");
            const data = await res.json();
            setUserInfo(data);
            navigate("/");
        } else {
            toast.error("Invalid Credentials");
        } 
  };

  return (
    <>
      <h1 className="text-5xl font-semibold mb-6 text-center">Login</h1>
      <form
        onSubmit={login}
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
        <Toaster/>
      </form>
    </>
  );
};

export default LoginPage;
