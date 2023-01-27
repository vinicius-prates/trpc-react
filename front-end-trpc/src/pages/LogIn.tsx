import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../util/trpc";

export const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate } = useMutation(["login"], api.login.mutate);
  return (
    <div>
      <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold "> Login  </h1>

        <form
          className="flex flex-col gap-4 "
          onSubmit={(e) => {
            e.preventDefault();
            mutate({
              email: email,
              password: password,
            });
          }}
        >
          <input
            type="string"
            className="text-md bg-gray-100 text-gray-700 p-2 focus:outline-none rounded-lg"
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="text-md bg-gray-100 text-gray-700 p-2 focus:outline-none rounded-lg"
            placeholder="*******"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-blue-500 py-3 rounded-xl text-white font-bold  lg:self-center  hover:bg-[#323232] duration-300 w-40">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
