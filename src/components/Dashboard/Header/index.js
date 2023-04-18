"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import userImg from "../../../../public/images/user.png";
import Link from "next/link";

const Header = ({ name }) => {
  const [auth] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("auth"))
      : ""
  );
  const [email] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("email"))
      : ""
  );
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (email) {
      setUsername(email.split("@")[0]);
    }
  }, [email]);

  // console.log(username);
  return (
    <div className="bg-datasense-blue flex justify-between m-10 py-5 px-10 rounded-md">
      <div className="w-1/2">
        <p className=" text-white font-bold text-xl">{name}</p>
      </div>
      <div className="w-1/2 flex justify-end items-center">
        {!auth ? (
          <div>
            <Link href={"/login"} className="text-white font-bold pl-2 pr-20">
              Login
            </Link>
            <Link
              href={"/register"}
              className="text-white font-bold pl-2 pr-20"
            >
              Register
            </Link>
          </div>
        ) : (
          <>
            <div>
              <Image
                src={userImg}
                alt="user"
                width={40}
                height={40}
                className="rounded"
              />
            </div>
            <div>
              <span className="text-white font-bold pl-2 pr-20">
                {username
                  ? username.charAt(0).toUpperCase() + username.slice(1)
                  : ""}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
