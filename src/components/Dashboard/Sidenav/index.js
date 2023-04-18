import React, { useState } from "react";
import Image from "next/image";
import Home from "../../../../public/images/home.png";
import HomeBlack from "../../../../public/images/home-black.png";
import Flag from "../../../../public/images/flag.png";
import FlagBlack from "../../../../public/images/flag-black.png";
import Blogger from "../../../../public/images/blogger.png";
import BloggerBlack from "../../../../public/images/blogger-black.png";
import Menuboard from "../../../../public/images/menuboard.png";
import MenuboardBlack from "../../../../public/images/menuboard-black.png";
import Notepad2 from "../../../../public/images/notepad2.png";
import Notepad2Black from "../../../../public/images/notepad2-black.png";
import Profile2user from "../../../../public/images/profile2user.png";
import Profile2userBlack from "../../../../public/images/profile2user-black.png";
import Walletmoney from "../../../../public/images/walletmoney.png";
import WalletmoneyBlack from "../../../../public/images/walletmoney-black.png";
import { useRouter } from "next/router";

const Sidenav = ({ path }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();

    if (typeof window !== "undefined") {
      localStorage.clear();
      router.replace("/login");
    }
  };
  return (
    <div className={showMenu ? "bg-datasense-blue h-auto pb-10 absolute" : ""}>
      {/* Hamburger menu */}
      <div className="md:hidden lg:hidden p-2">
        <button
          onClick={() => setShowMenu(!showMenu)}
          type="button"
          className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          {showMenu ? (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar menu */}
      <div
        className={`${
          showMenu ? "" : "hidden"
        } md:block md:h-screen md:bg-datasense-blue md:border-none md:p-0`}
      >
        <div className="mb-10 pt-10">
          <a
            href="/"
            className="disabled text-2xl font-extrabold text-white p-10"
          >
            Datacense
          </a>
        </div>
        <div
          className={
            path === "Dashboard"
              ? "active mb-5 text-black pl-5 pr-10"
              : "mb-5 text-white px-10"
          }
        >
          <a href="/dashboard" className="disabled text-xl font-bold flex">
            <Image
              src={path === "Dashboard" ? HomeBlack : Home}
              alt="home"
              width={24}
              height={24}
              className="mr-2"
            />
            Dashboard
          </a>
        </div>
        <div
          className={
            path === "Catalog"
              ? "active mb-5 text-black pl-5 pr-10"
              : "mb-5 text-white px-10"
          }
        >
          <a href="/catalog" className="disabled text-xl font-bold flex">
            <Image
              src={path === "Catalog" ? MenuboardBlack : Menuboard}
              alt="menu"
              width={24}
              height={24}
              className="mr-2"
            />
            Catalog
          </a>
        </div>
        <div
          className={
            path === "Blogs"
              ? "active mb-5 text-black pl-5 pr-10"
              : "mb-5 text-white px-10"
          }
        >
          <a href="/blogs" className="disabled text-xl font-bold flex">
            <Image
              src={path === "Blogs" ? BloggerBlack : Blogger}
              alt="blog"
              width={24}
              height={24}
              className="mr-2"
            />
            Blogs
          </a>
        </div>
        <div
          className={
            path === "Pages"
              ? "active mb-5 text-black pl-5 pr-10"
              : "mb-5 text-white px-10"
          }
        >
          <a href="/pages" className="disabled text-xl font-bold flex">
            <Image
              src={path === "Pages" ? Notepad2Black : Notepad2}
              alt="page"
              width={24}
              height={24}
              className="mr-2"
            />
            Pages
          </a>
        </div>
        <div
          className={
            path === "Payments"
              ? "active mb-5 text-black pl-5 pr-10"
              : "mb-5 text-white px-10"
          }
        >
          <a href="/payments" className="disabled text-xl font-bold flex">
            <Image
              src={path === "Payments" ? WalletmoneyBlack : Walletmoney}
              alt="home"
              width={24}
              height={24}
              className="mr-2"
            />
            Payments
          </a>
        </div>
        <div
          className={
            path === "All Users"
              ? "active mb-5 text-black pl-5 pr-10"
              : "mb-5 text-white px-10"
          }
        >
          <a href="/users" className="text-xl font-bold flex">
            <Image
              src={path === "All Users" ? Profile2userBlack : Profile2user}
              alt="home"
              width={24}
              height={24}
              className="mr-2"
            />
            Users
          </a>
        </div>
        <div
          className={
            path === "Add Users"
              ? "active text-black mb-5 ml-5 flex items-center"
              : "mb-5 ml-5 text-white"
          }
        >
          <a href="/users/add" className="text-xl font-bold px-5 flex ml-5">
            <Image
              src={path === "Add Users" ? FlagBlack : Flag}
              alt="home"
              width={24}
              height={24}
              className="mr-2"
            />
            Add Users
          </a>
        </div>
        <div>
          <button
            className="text-xl font-bold px-5 flex mb-5 ml-5 text-white"
            onClick={(e) => handleLogout(e)}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
