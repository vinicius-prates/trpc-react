import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import cookieParser, { signedCookie } from "cookie-parser";
import "../App.css";
import { api } from "../util/trpc";

export const AllSneakers = () => {
    const queryClient = useQueryClient()
  const { data, isLoading, isError, refetch } = useQuery(["getSneakers"], () =>
    api.allSneaker.query()
  );
  const deleteSneakerQuery = useMutation(
    ["deleteSneaker"],
    api.deleteSneaker.mutate,
    { onSuccess: () => queryClient.invalidateQueries(['getSneakers']) }
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Something went wrong...</div>;
  }
  


  return (
    <div className="grid flex-row grid-cols-3 gap-4">
      {data.allSneakers.map((sneaker, key) => (
        <div
          className="flex flex-col bg-[#3b3842]  text-[#ffdb4b] rounded-md"
          key={key}
        >
          <h3 className="text-xl font-bold p-2 py-10">
            {sneaker.sneakername} - R$ {sneaker.retailprice}
          </h3>
          <div className="bg-[#ffdb4b] rounded-b-md p-4 flex flex-col">
          <p className="text-md text-[#3b3842] font-bold">{sneaker.description}</p>
          <p className="text-sm text-right text-[#3b3842] italic opacity-50">
            Release year: {sneaker.releasedAt}
          </p>
          <button
            className="text-md self-end text-red-700 font-bold opacity-60 hover:opacity-100  transition-opacity"
            onClick={() => {
              deleteSneakerQuery.mutate({ id: sneaker.id });
              
            }}
          >
            Delete
          </button>
          </div>
        </div>
      ))}
    </div>
  );
};
