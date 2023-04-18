"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Dashboard/Header";
import Sidenav from "@/components/Dashboard/Sidenav";
import Head from "next/head";
import { Menu } from "@headlessui/react";
import ArrowBelow from "../../../../public/images/arrow-below.png";
// import ArrowAbove from "../../../../public/images/arrow-below.png";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";

const AddUsers = () => {
  // const [active, setActive] = useState(false);
  const router = useRouter();
  const [auth] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("auth"))
      : ""
  );
  const [grandpa, setGranpa] = useState("");
  const [grandpas, setGrandpas] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [veteran, setVeteran] = useState("");
  const [children, setChildren] = useState([]);

  useEffect(() => {
    if (!auth) {
      router.replace("/login");
    } else {
      getGrandpas();
    }
  }, [auth]);

  const getGrandpas = () => {
    axios
      .get("/api/grandpa/all")
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setGrandpas(res.data?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createChildrenUI = (e) => {
    e.preventDefault();

    setChildren([
      ...children,
      {
        id,
        name,
        age,
        veteran,
      },
    ]);
  };

  const onSubmitGrandpaHandler = (e) => {
    e.preventDefault();

    if (!id) {
      alert("The id field is required");
    } else if (!name) {
      alert("The name field is required");
    } else if (!age) {
      alert("The age field is required");
    } else if (!veteran) {
      alert("The veteran field is required");
    } else {
      const data = {
        id: Number(id),
        name,
        age: Number(age),
        veteran,
      };

      axios
        .post("/api/grandpa", data)
        .then((res) => {
          console.log(res?.data);
          alert("Granpda added successfully!");
          router.reload();
        })
        .catch((error) => {
          // console.log(error);
          if (error.response) {
            alert(error.response.data?.message);
          }
        });
    }
  };

  // console.log("grandpas: ", grandpas);
  // console.log("children: ", children);
  return (
    <>
      <Head>
        <title>Datacense | Add Users</title>
        <meta name="description" content="Datacense" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/4">
          <Sidenav path="All Users" />
        </div>
        <div className="w-full lg:w-3/4">
          <Header name="Add Users" />
          <div className="my-10 mx-5 lg:mx-0 lg:ml-16 lg:mr-40">
            <div className="mb-5">
              <Menu>
                <Menu.Button className="flex items-center border-[1px] border-black px-7 py-2 rounded-md text-gray-400 w-auto">
                  {!grandpa ? "Select Grandpa" : grandpa}
                  <Image
                    // src={!active ? ArrowBelow : ArrowAbove}
                    src={ArrowBelow}
                    width={13}
                    height={7}
                    alt="arrow"
                    className="ml-3"
                  />
                </Menu.Button>
                <Menu.Items className="focus:outline-none absolute origin-top-left w-48 divide-y divide-gray-100 rounded-md border-[1px] border-black bg-white shadow-lg text-left">
                  <div className="p-1">
                    {grandpas &&
                      grandpas.map((grandpa) => (
                        <Menu.Item
                          disabled={grandpa.disabled}
                          className="text-left"
                        >
                          {({ active }) => (
                            <button
                              className={`${
                                active && "bg-datasense-blue text-white"
                              } w-full rounded-md p-2`}
                              onClick={() => setGranpa(grandpa.name)}
                            >
                              {grandpa.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                  </div>
                </Menu.Items>
              </Menu>
            </div>
            <div className="flex flex-wrap w-full justify-between">
              <div className="mb-5 w-full sm:w-auto pr-0 sm:pr-5">
                <p className="font-bold">ID</p>
                <input
                  className="p-1 border-[1px] border-black rounded-md w-full"
                  type="number"
                  placeholder="Enter ID"
                  name={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div className="mb-5 w-full sm:w-auto pr-0 sm:pr-5">
                <p className="font-bold">Name</p>
                <input
                  className="p-1 border-[1px] border-black rounded-md w-full"
                  type="text"
                  placeholder="Enter Name"
                  name={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-5 w-full sm:w-auto pr-0 sm:pr-5">
                <p className="font-bold">Age</p>
                <input
                  className="p-1 border-[1px] border-black rounded-md w-full"
                  type="number"
                  placeholder="Enter Age"
                  name={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="mb-5 w-full sm:w-auto pr-0 sm:pr-5">
                <p className="font-bold">Veteran</p>
                <input
                  className="p-1 border-[1px] border-black rounded-md w-full"
                  type="text"
                  placeholder="Enter Veteran"
                  name={veteran}
                  onChange={(e) => setVeteran(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row items-end">
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={(e) => onSubmitGrandpaHandler(e)}
                >
                  Save
                </button>
              </div>
            </div>
            <div className="flex w-full justify-end mt-3">
              <button
                className="bg-datasense-blue text-white py-3 px-5 rounded-md"
                onClick={(e) => createChildrenUI(e)}
              >
                Add Children
              </button>
            </div>
            {children.map((child) => {
              return (
                <>
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div className="md:w-1/4 mb-3 md:mb-0">
                      <p className="font-bold">ID</p>
                      <input
                        className="p-1 border-[1px] border-black rounded-md"
                        type="text"
                        placeholder="Enter ID"
                        name={id}
                        onChange={(e) => setId(e.target.value)}
                      />
                    </div>
                    <div className="md:w-1/4 mb-3 md:mb-0">
                      <p className="font-bold">Name</p>
                      <input
                        className="p-1 border-[1px] border-black rounded-md"
                        type="text"
                        placeholder="Enter Name"
                        name={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="md:w-1/4 mb-3 md:mb-0">
                      <p className="font-bold">Age</p>
                      <input
                        className="p-1 border-[1px] border-black rounded-md"
                        type="text"
                        placeholder="Enter Age"
                        name={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>
                    <div className="md:w-1/4 mb-3 md:mb-0">
                      <p className="font-bold">Veteran</p>
                      <input
                        className="p-1 border-[1px] border-black rounded-md"
                        type="text"
                        placeholder="Enter Veteran"
                        name={veteran}
                        onChange={(e) => setVeteran(e.target.value)}
                      />
                    </div>
                    <div className="flex items-end">
                      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Save
                      </button>
                    </div>
                  </div>
                  <div className="flex w-full justify-end mt-3">
                    <button
                      className="bg-datasense-blue text-white py-3 px-5 rounded-md"
                      onClick={(e) => createChildrenUI(e)}
                    >
                      Add Children
                    </button>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUsers;
