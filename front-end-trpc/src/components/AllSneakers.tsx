import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
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
    <div className="grid flex-row grid-cols-3 gap-2">
      {data.allSneakers.map((sneaker, key) => (
        <div
          className="flex flex-col border-blue-500 border-2 p-2 rounded-md"
          key={key}
        >
          <h3 className="text-xl">
            {sneaker.sneakername} - R$ {sneaker.retailprice}
          </h3>
          <p className="text-md">{sneaker.description}</p>
          <p className="text-sm text-right">
            Release year: {sneaker.releasedAt}
          </p>
          <button
            className="text-md italic self-end text-red-600 opacity-80 hover:opacity-100 hover:text-red-700"
            onClick={() => {
              deleteSneakerQuery.mutate({ id: sneaker.id });
              
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};
