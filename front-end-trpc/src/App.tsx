import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import "./App.css";
import { api } from "./util/trpc";

function App() {
  const [sneakername, setSneakerName] = useState("");
  const [retailprice, setRetailPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  const [sneakerId, setSneakerId] = useState("");
  const { data, isLoading, isError } = useQuery(["getSneakers"], () =>
    api.allSneaker.query()
  );

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

   api.deleteSneaker.mutate({id:sneakerId})
  }

  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="flex flex-col">
        <div className="flex flex-col items-center text-center m-10">
        <h1 className="text-2xl font-bold"> All Sneakers </h1>
            <div className="grid flex-row grid-cols-3 gap-2">
                {data.allSneakers.map(sneaker => (
                  <div className="border-blue-500 border-2 p-2 rounded-md">
                    <h3 className="text-xl">{sneaker.sneakername} - R$ {sneaker.retailprice}</h3>
                    <p className="text-md">{sneaker.description}</p>
                    <p className="text-sm text-right">Release year:  {sneaker.releasedAt}</p>
                    
                    </div>
                ))}
            </div>

        </div>
      <div className=" items-center">
        <div className="flex  flex-row justify-center items-center gap-20">
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
          className="flex flex-col items-center w- gap-3"
        >
          <input
            type="string"
            name="sneakername"
            placeholder="Ex: Nmd R1"
            onChange={(evt) => setSneakerName(evt.target.value)}
            className="border-b-2 border-slate-600 bg-gray-100 focus:outline-none px-2 py-1 text-slate-600  rounded-t-md"
          ></input>
          <input
            type="number"
            name="retailprice"
            placeholder="R$ 499,90"
            onChange={(evt) => setRetailPrice(evt.target.valueAsNumber)}
            className="border-b-2 border-slate-600 bg-gray-100 focus:outline-none px-2 py-1 text-slate-600  rounded-t-md"
          ></input>
          <input
            type="string"
            name="description"
            placeholder="Descripiton"
            onChange={(evt) => setDescription(evt.target.value)}
            className="border-b-2 border-slate-600 bg-gray-100 focus:outline-none px-2 py-1 text-slate-600  rounded-t-md"
          ></input>
          <input
            type="string"
            name="releasedAt"
            placeholder="Release date"
            onChange={(evt) => setReleaseDate(evt.target.value)}
            className="border-b-2 border-slate-600 bg-gray-100 focus:outline-none px-2 py-1 text-slate-600 rounded-t-md"
          ></input>
          <button className="bg-blue-600 py-4 rounded-xl text-white font-bold  lg:self-center  hover:bg-[#323232] duration-300 w-40">Add</button>
        </form>

        <div className=" flex flex-col gap-4">
        <h1> Delete Sneaker</h1>
          <form onSubmit={(evt) => {
            evt.preventDefault()
            
            deleteSneakerFunc()
            
          }} className="flex flex-col gap-28">
            <input type="string" name="id" placeholder="sneakerId"
            className="border-b-2 border-slate-600 bg-gray-100 focus:outline-none px-2 py-1 text-slate-600 w-96  rounded-t-md"
            onChange={(evt) => {setSneakerId(evt.target.value)
            console.log(sneakerId)}}></input>
            <button className="bg-blue-600 py-4 rounded-xl text-white font-bold  lg:self-center  hover:bg-[#323232] duration-300 w-40">Delete</button>
          </form>
      </div>

        </div>
        
      </div>
      
    </div>
  );
}

export default App;
