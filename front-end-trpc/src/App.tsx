import "./App.css";
import { AllSneakers } from "./components/AllSneakers";
function App() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center text-center m-10">
        <h1 className="text-2xl font-bold"> All Sneakers </h1>
        <AllSneakers/>
      </div>
    </div>
  );
}

export default App;
