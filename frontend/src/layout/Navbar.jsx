import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext";

function Navbar() {
  const { user, logout } = useUser();
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar flex justify-between bg-base-300">
          <div className="flex-1 px-2 mx-2 font-bold">
            <Link to={"/"} className="text-xl text-white">
              Auctionia
            </Link>
          </div>
          <ul className="flex  gap-7">
            <li>
              <Link to={"/bids"}>Market</Link>
            </li>
            {!!user && (
              <li>
                <Link to={"/create"}>Create</Link>
              </li>
            )}
          </ul>
          <div className=" hidden lg:block flex-row">
            {(!user && (
              <ul className="menu menu-horizontal">
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
                <li>
                  <Link to={"/register"}>Sign Up</Link>
                </li>
              </ul>
            )) || (
              <ul className="menu menu-horizontal items-center ">
                <div className="flex gap-1 items-center justify-around hover:bg-[#ffffff4a] bg-[#ffffff2a] rounded-full p-1">
                  <img
                    src={`http://localhost:5500/upload/${user.file}`}
                    className="h-8 w-8 rounded-full object-cover"
                    alt=""
                  />
                  <li>
                    <Link to={"/profile"}>{user.name}</Link>
                  </li>
                </div>
              </ul>
            )}
          </div>
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
        </div>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="flex  gap-7">
          <li>
            <Link to={"/bids"}>Market</Link>
          </li>
          {!!user && (
            <li>
              <Link to={"/create"}>Create</Link>
            </li>
          )}
        </ul>
        {(!user && (
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
            <li>
              <Link to={"/register"}>Sign Up</Link>
            </li>
          </ul>
        )) || (
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            <div className="flex gap-1 items-center justify-around hover:bg-[#ffffff4a] bg-[#ffffff2a] rounded-full p-1">
              <img
                src={`http://localhost:5500/upload/${user.file}`}
                className="h-8 w-8 rounded-full object-cover"
                alt=""
              />
              <li>
                <Link to={"/profile"}>{user.name}</Link>
              </li>
            </div>
            <li>
              <Link to={"/"} onClick={logout}>
                Logout
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Navbar;
