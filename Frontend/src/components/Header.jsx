import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const Header =  () => {
    
    const {setUserInfo, userInfo} = useContext(UserContext);

    useEffect(() => {
    const res =  fetch("http://localhost:3000/profile", {
            method: "GET",
            credentials: "include",
        }
        )
        .then((res) => res.json())
        .then((data) => {
                setUserInfo(data)
            }); 
    }
    , []);

    const logout =  () => {
        fetch("http://localhost:3000/logout", {
            method: "GET",
            credentials: "include",
        }
        )
        .then((res) => res.json())
        .then((data) => {
                setUserInfo(null)
            });
    }

    const userName = userInfo?.userName;

  return (
    <header className="flex justify-between mb-10 items-center">
      <Link to="/" className="font-bold text-5xl ">
        Blog Thread
      </Link>
      <nav className="flex gap-4 text-xl">
      {userName && (
        <>
            <Link to="/create" className="font-semibold  text-xl ">
            Create Post
            </Link>
            <Link to="/" className="font-semibold  text-xl" 
            onClick={logout}>
            Logout
            </Link>
        </>
      )}
      
      {!userName && (
        <>
            <Link to="/login" className="font-semibold  text-xl ">
              Login
            </Link>
            <Link to="/register" className="font-semibold  text-xl ">
             Register
            </Link>
        </>
      )}
        
      </nav>
    </header>
  );
};

export default Header;
