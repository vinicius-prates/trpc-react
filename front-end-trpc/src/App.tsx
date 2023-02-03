import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import { AllSneakers } from "./components/AllSneakers";
import { api } from "./util/trpc";
function App() {
  const navi = useNavigate();

  const meQuery = useQuery(["me"], () => api.me.query());
   
  useEffect(() => {
    if (!meQuery.data?.user) {
      navi("/login")
    }
  }, [])

  return (
    <div className="flex flex-col h-screen bg-[#fafafa]">
      {JSON.stringify(meQuery.data)}
      <div className="flex flex-col items-center text-center m-10">
        <h1 className="text-2xl font-bold text-white"> All Sneakers </h1>
        <AllSneakers />
      </div>
    </div>
  );
}

export default App;
