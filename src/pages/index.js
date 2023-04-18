import { useEffect, useState } from "react";
import Header from "@/components/Dashboard/Header/index";
import Sidenav from "@/components/Dashboard/Sidenav";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [auth] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("auth"))
      : ""
  );

  useEffect(() => {
    if (!auth) {
      router.replace("/login");
    } else {
      router.replace("/users");
    }
  }, [auth]);

  return (
    <>
      <Head>
        <title>Datacense</title>
        <meta name="description" content="Datacense" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex">
        <div className="w-1/4">
          <Sidenav path="Dashboard" />
        </div>
        <div className="w-full">
          <Header name="Dashboard" />
          <div className="my-10 ml-16 mr-40">
            <h2 className="text-2xl">Dashboard</h2>
          </div>
        </div>
      </div>
    </>
  );
}
