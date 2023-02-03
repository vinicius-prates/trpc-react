import { useQuery } from "@tanstack/react-query";
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
      {user ? <div className="flex flex-row mx-6 my-3">
        <Link to="/" className="bg-[#3b3842] rounded-lg px-8 py-2  text-[#ffdb4b] font-bold  lg:self-center  hover:bg-[#323232]  hover:text-[#ffdb4b] duration-300">Profile</Link>
        </div>
       : <div className="flex flex-row mx-6 my-3 gap-4 items-end justify-end">
          <Link to="/register" className="bg-[#3b3842] px-12 py-4 rounded-lg text-[#ffdb4b] font-bold  lg:self-center  hover:bg-[#323232] hover:text-[#ffdb4b] duration-300">Register</Link>
          <Link to="/login" className="bg-[#ffdb4b] px-12 py-4 rounded-lg text-[#404040] font-bold  lg:self-center  hover:bg-[#323232] hover:text-[#ffdb4b] duration-300">Login</Link>
        </div>}
      <div className="flex flex-col items-center text-center m-10">
        <h1 className="text-2xl font-bold text-white"> All Sneakers </h1>
        <AllSneakers />
      </div>
    </div>
  );
}

export default App;
