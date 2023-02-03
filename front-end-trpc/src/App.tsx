import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import { AllSneakers } from "./components/AllSneakers";
import { api } from "./util/trpc";
function App() {
  const navi = useNavigate();

  const meQuery = useQuery(["me"], () => api.me.query());
  const user = meQuery.data?.user;

 
  return (
    <div className="flex flex-col h-screen bg-[#202020]">
      {user ?  <div>cala a boca</div> : <div>sexo</div>}
      <div className="flex flex-col items-center text-center m-10">
        <h1 className="text-2xl font-bold text-white"> All Sneakers </h1>
        <AllSneakers />
      </div>
    </div>
  );
}

export default App;
