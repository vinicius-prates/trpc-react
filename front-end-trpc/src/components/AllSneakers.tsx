import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import "../App.css";
import { api } from "../util/trpc";


export const AllSneakers = () => {

    const [sneakerId, setSneakerId] = useState("");
    const { data, isLoading, isError } = useQuery(["getSneakers"], () =>
      api.allSneaker.query()
    );
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (isError) {
      return <div>Something went wrong...</div>;
    }
  
    return(
        <div className="grid flex-row grid-cols-3 gap-2">
                {data.allSneakers.map(sneaker => (
                  <div className="border-blue-500 border-2 p-2 rounded-md">
                    <h3 className="text-xl">{sneaker.sneakername} - R$ {sneaker.retailprice}</h3>
                    <p className="text-md">{sneaker.description}</p>
                    <p className="text-sm text-right">Release year:  {sneaker.releasedAt}</p>
                    
                    </div>
                ))}
            </div>
    )
}