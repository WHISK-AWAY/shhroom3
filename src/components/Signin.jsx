import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL;

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();

  // console.log('apiurl', API_URL);
  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(API_URL + "/api/auth", {
      username,
      password,
    });
    window.localStorage.setItem("token", data.token);
    setPassword("");
    if (!data.token) {
      setIsInvalid(true);
    } else {
      setUsername("");
      setIsInvalid(false);
      navigate("/lobby");
    }
  };

  return (
    <div className="sign-in-page">
      <div className="signin-form flex flex-col justify-center items-center min-w-min max-w-sm mx-auto mt-40 bg-gradient-to-r from-pink-500/50 via-purple-500/60 to-indigo-500/60 shadow-lg shadow-gray-800/60 rounded text-slate-200 h-96">
        <div className="form-card">
          <form
            onSubmit={onSubmit}
            className="flex flex-col items-center gap-7 h-full"
          >
            <div className="flex flex-col">
              <label htmlFor="username">username</label>
              <input
                className="text-dark-purple0 bg-slate-200/75 font-medium p-2 shadow-inner shadow-dark-purple0 rounded-sm"
                type="text"
                name="username"
                id="username"
                value={username}
                placeholder={isInvalid ? "must enter username" : null}
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password">password</label>
              <input
                className="text-dark-purple0 bg-slate-200/75 font-medium p-2 shadow-inner shadow-dark-purple0 rounded-sm"
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder={isInvalid ? "must enter password" : null}
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="">
              <motion.button className="inline-block bg-gradient-to-t from-violet-700 to-slate-300  hover:shadow-dark-pink4/40 py-3 px-5 rounded-xl shadow-sm shadow-gray-800/60 transition duration-500 hover:scale-105 font-medium tracking-wide">
                Sign In
              </motion.button>
              <p className="sign-up-redirect">don't have an account? make one <Link to={'/signup'} className='underline-offset-2 underline'>here</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
