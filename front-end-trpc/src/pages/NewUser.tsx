import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "../util/trpc";
export const NewUser = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(15);
  const { mutate } = useMutation(["createUser"], api.user.createUser.mutate, {
    onError: (err) => {
      console.log(err);
      alert("Couldn't register your user.");
    },
    onSuccess: () => {
      alert(`${username}, você foi registrado!`);
    },
  });
  return (
    <div className="bg-[#202020] h-screen w-screen justify-center items-center flex flex-col">
      <div className="bg-[#3b3842] shadow-lg shadow-neutral-800/200 gap-4 flex flex-col  px-32 py-24 rounded-lg">
        <h1 className="text-2xl font-bold text-[#ffdb4b] "> New User </h1>

        <form
          className="flex flex-col gap-4 "
          onSubmit={(e) => {
            e.preventDefault();
            mutate({
              username: username,
              email: email,
              age: age,
              password: password,
            });
          }}
        >
          <input
            type="string"
            className="text-md bg-[#3b3842] text-[#ffdb4b] opacity-70 font-semibold border-b-[1.5px] italic border-[#ffdb4b] p-1 focus:outline-none"
            placeholder="User Name"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="string"
            className="text-md bg-[#3b3842] text-[#ffdb4b] opacity-70 font-semibold border-b-[1.5px] italic border-[#ffdb4b] p-1 focus:outline-none"
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="text-md bg-[#3b3842] text-[#ffdb4b] opacity-70 font-semibold border-b-[1.5px] italic border-[#ffdb4b] p-1 focus:outline-none"
            placeholder="*******"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="number"
            className="text-md bg-[#3b3842] text-[#ffdb4b] opacity-70 font-semibold border-b-[1.5px] italic border-[#ffdb4b] p-1 focus:outline-none"
            placeholder="your age"
            onChange={(e) => setAge(e.target.valueAsNumber)}
          />
          <button className="bg-[#ffdb4b] px-16 py-2 rounded-md text-[#404040] font-bold  lg:self-center  hover:bg-[#323232] hover:text-[#ffdb4b] duration-300">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
