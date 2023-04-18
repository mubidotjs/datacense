import { useState } from "react";
import Header from "@/components/Header";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordErr, setRepeatPasswordErr] = useState("");
  const [credentialErr, setCredentialErr] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    resetErrors();

    if (!email) {
      setEmailErr("The email field is required");
    } else if (!password) {
      setPasswordErr("The password field is required");
    } else if (!password) {
      setPasswordErr("The password field is required");
    } else if (password !== repeatPassword) {
      setRepeatPasswordErr("The password doesn't match");
    } else {
      const data = {
        email: email,
        password: password,
        repeatPassword: repeatPassword,
      };

      axios
        .post("/api/register", data)
        .then((res) => {
          // console.log(res.data);
          if (res?.data) {
            if (typeof window !== "undefined") {
              localStorage.setItem(
                "userId",
                JSON.stringify(res.data.data.userId)
              );
              localStorage.setItem(
                "email",
                JSON.stringify(res.data.data.email)
              );
              localStorage.setItem("auth", JSON.stringify(res.data.data.token));

              setTimeout(() => {
                setEmail("");
                setPassword("");

                router.replace("/");
              }, 500);
            }
          }
        })
        .catch((error) => {
          // console.log(error);
          if (error.response) {
            setCredentialErr(error.response.data?.message);
          }
        });
    }
  };

  const resetErrors = () => {
    setEmailErr("");
    setPasswordErr("");
    setRepeatPasswordErr("");
  };

  return (
    <div className="bg-datasense-blue-container h-screen">
      <Head>
        <title>Datacense - Register</title>
        <meta name="description" content="Register page of the Datacense" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex flex-col justify-center items-center h-screen sm:h-4/5">
        <div className="w-11/12 md:w-3/5 lg:w-2/5 xl:w-1/3 bg-white rounded-lg shadow-md p-8">
          <div className="flex flex-col sm:flex-row justify-evenly mb-10">
            <Link
              href="/login"
              className="bg-minor-blue text-black text-base font-medium py-3 px-16 rounded-lg m-auto mb-4 sm:mb-0 sm:mr-5"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-light-gray text-black text-base font-medium py-3 px-16 rounded-lg m-auto"
            >
              Register
            </Link>
          </div>
          <h2 className="text-xl font-bold mb-6 text-center">Register</h2>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                name={email}
                onChange={(e) => setEmail(e.target.value)}
                onClick={(e) => {
                  e.preventDefault();

                  setEmailErr("");
                }}
              />
              <input
                type="password"
                placeholder="Password"
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                name={password}
                onChange={(e) => setPassword(e.target.value)}
                onClick={(e) => {
                  e.preventDefault();

                  setPasswordErr("");
                  setRepeatPasswordErr("");
                }}
              />
              {passwordErr ? (
                <p className="my-1 text-red-500">{passwordErr}</p>
              ) : null}
              <input
                type="password"
                placeholder="Repeat Passowrd"
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                name={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                onClick={(e) => {
                  e.preventDefault();

                  setRepeatPasswordErr("");
                }}
              />
              {repeatPasswordErr ? (
                <p className="my-1 text-red-500">{repeatPasswordErr}</p>
              ) : null}
              {credentialErr ? (
                <p className="my-1 text-red-500">{credentialErr}</p>
              ) : null}
              <button
                type="submit"
                className="bg-black text-white py-3 px-16 rounded-lg m-auto"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
