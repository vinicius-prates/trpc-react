import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "../util/trpc";

export const AddSneaker = () => {
  const [sneakername, setSneakerName] = useState("");
  const [retailprice, setRetailPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  const [sneakerId, setSneakerId] = useState("");
  const { mutate } = useMutation(["newSneaker"], api.addSneaker.mutate, {
    onError: (err) => {
      console.error(err);
      alert("Sneaker nao adicionado");
    },

    onSuccess: () => {
      alert(`Sneaker ${sneakername}, adicionado!`);
    },
  });
  const deleteSneakerFunc = () => {
    api.deleteSneaker.mutate({ id: sneakerId });
  };
  return (
    <div className="flex flex-col justify-center items-center gap-10 bg-[#202020] h-screen">
      <div className=" items-center bg-[#3b3842] shadow-lg shadow-neutral-800/200   px-32 py-24 rounded-lg">
        <h1 className="text-2xl font-bold text-[#ffdb4b] ">Add new Sneaker</h1>
        <div className="flex  flex-row justify-center items-center my-4 gap-20">
          <form
            onSubmit={(evt) => {
              evt.preventDefault();
              mutate({
                sneakername: sneakername,
                retailprice: retailprice,
                description: description,
                releasedAt: releaseDate,
              });
            }}
            className="flex flex-col  items-center gap-20"
          >
            <div className="flex flex-row gap-6 ">
              <div className="flex flex-col gap-10">
                <input
                  type="string"
                  name="sneakername"
                  placeholder="Ex: Nmd R1"
                  onChange={(evt) => setSneakerName(evt.target.value)}
                  className="text-md bg-[#3b3842] text-[#ffdb4b] opacity-70 font-semibold border-b-[1.5px] italic border-[#ffdb4b] p-1 focus:outline-none"
                ></input>
                <input
                  type="number"
                  name="retailprice"
                  placeholder="R$ 499,90"
                  onChange={(evt) => setRetailPrice(evt.target.valueAsNumber)}
                  className="text-md bg-[#3b3842] text-[#ffdb4b] opacity-70 font-semibold border-b-[1.5px] italic border-[#ffdb4b]  p-1 focus:outline-none"
                ></input>
                 <input
                  type="string"
                  name="releasedAt"
                  placeholder="Release date"
                  onChange={(evt) => setReleaseDate(evt.target.value)}
                  className="text-md bg-[#3b3842] text-[#ffdb4b] opacity-70 font-semibold border-b-[1.5px] italic border-[#ffdb4b] p-1 focus:outline-none"
                ></input>
              </div>
              <div className="flex flex-col gap-10">
               
                <textarea
                  name="description"
                  placeholder="Descripiton"
                  onChange={(evt) => setDescription(evt.target.value)}
                  className="text-md bg-[#3b3842] text-[#ffdb4b] opacity-70 resize-none h-[11.2rem] italic font-semibold border-b-[1.5px] border-[#ffdb4b] p-1 focus:outline-none"
                ></textarea>
              </div>

            </div>
              <button className="bg-[#ffdb4b] px-16 py-2 rounded-md text-[#404040] font-bold  lg:self-center  hover:bg-[#323232] hover:text-[#ffdb4b] duration-300 ">
                Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};
