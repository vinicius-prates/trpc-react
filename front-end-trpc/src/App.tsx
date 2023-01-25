import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react'
import './App.css'
import { api } from './util/trpc';


function App() {
  
  const [ sneakername, setSneakerName] = useState("");
  const [ retailprice, setRetailPrice] = useState(0);
  const [ description, setDescription] = useState("");
  const [ releaseDate, setReleaseDate] = useState("");
  const { data, isLoading, isError } = useQuery(['getSneakers'], () => api.allSneaker.query())
  const { mutate } = useMutation(['newSneaker'], api.addSneaker.mutate)

  if(isLoading){
    return <div>Loading...</div>
  }
  if(isError){
    return <div>Something went wrong...</div>
  }

  

  return (
    <div>
      <h1>Sneakers</h1>
      <form onSubmit={(evt) => {
        evt.preventDefault();
        mutate({ sneakername: sneakername,
                retailprice: retailprice ,
                description: description,
                releasedAt: releaseDate
                })
              
      }}>
        <input type="string" name="sneakername" placeholder="Ex: Nmd R1" onChange={(evt) => setSneakerName(evt.target.value)}></input>
        <input type="number" name="retailprice" placeholder="R$ 499,90" onChange={(evt) => setRetailPrice(evt.target.valueAsNumber)}></input>
        <input type="string" name="description" placeholder="Descripiton" onChange={(evt) => setDescription(evt.target.value)}></input>
        <input type="string" name="releasedAt" placeholder="Release date" onChange={(evt) => setReleaseDate(evt.target.value)}></input>
        <button>Add</button>
      </form>
      

    </div>
  )
}

export default App
