import React, { useEffect, useState } from "react";
import Header from "@/components/Dashboard/Header";
import Sidenav from "@/components/Dashboard/Sidenav";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import Pagination from "@/components/Pagination";
import { paginate } from "../../../helper/paginate";

const users = () => {
  const router = useRouter();
  const [auth] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("auth"))
      : ""
  );
  const [search, setSearch] = useState("");
  const [grandpas, setGrandpas] = useState([]);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const paginateGrandpas = paginate(grandpas, currentPage, pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!auth) {
      router.replace("/login");
    } else {
      getGrandpas();
    }
  }, [auth]);

  const getGrandpas = () => {
    axios
      .get("/api/grandpa/all", {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data) {
          setGrandpas(res.data?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Head>
        <title>Datacense | All Users</title>
        <meta name="description" content="Datacense" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/4">
          <Sidenav path="All Users" />
        </div>
        <div className="w-full lg:w-3/4">
          <Header name="All Users" />
          <div className="my-10 mx-4 lg:mx-16 lg:ml-16 lg:mr-40">
            <div className="my-5 text-center lg:text-end">
              <label className="relative block">
                <input
                  className="bg-light-search-bg placeholder:font-italitc rounded-md py-2 pl-3 pr-10 focus:outline-none"
                  placeholder="Search"
                  type="text"
                  name={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="h-5 w-5 fill-black"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                  >
                    <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                  </svg>
                </span>
              </label>
            </div>
            {paginateGrandpas.filter((grandpa) =>
              grandpa.name.toLowerCase().includes(search.toLowerCase())
            ).length ? (
              <table className="table w-full">
                <thead>
                  <tr className="bg-datasense-blue flex w-full justify-between p-3 rounded-t-md">
                    <th className="text-white ml-5">id</th>
                    <th className="text-white">Name</th>
                    <th className="text-white">Age</th>
                    <th className="text-white mr-16">Veteran</th>
                  </tr>
                </thead>
                <tbody>
                  {paginateGrandpas &&
                    paginateGrandpas
                      .filter((grandpa) =>
                        grandpa.name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      )
                      .map((grandpa) => {
                        return (
                          <tr
                            key={grandpa._id}
                            className="flex w-full justify-between p-3 border-b-[1px] border-black"
                          >
                            <td className="ml-5">{grandpa.id}</td>
                            <td>{grandpa.name}</td>
                            <td>{grandpa.age}</td>
                            <td className="mr-16">{grandpa.veteran}</td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            ) : (
              <p className="my-16 text-red-500 text-center">No users found!</p>
            )}

            <Pagination
              items={
                grandpas.filter((grandpa) =>
                  grandpa.name.toLowerCase().includes(search.toLowerCase())
                ).length
              }
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default users;
