import { Link } from "react-router-dom";
import "./App.css";
import { AllSneakers } from "./components/AllSneakers";
function App() {
  return (
    <div className="flex flex-col h-screen bg-[#202020]">
      <div className="flex flex-row py-5 px-4  gap-3  justify-end w-screen">
        <Link to="/login" className="bg-[#F9D030] py-4 px-8 rounded-xl text-white font-bold justify-end items-end text-center hover:bg-[#323232] duration-300 ">Register</Link>
        <Link to="/register" className="bg-[#323232] py-4 px-8 rounded-xl text-white font-bold justify-end items-end text-center hover:bg-[#F9D030] duration-300 ">Login</Link>
      </div>
      <div className="flex flex-col items-center text-center m-10">
        <h1 className="text-2xl font-bold text-white"> All Sneakers </h1>
        <AllSneakers />
      </div>
    </div>
  );
}

export default App;
