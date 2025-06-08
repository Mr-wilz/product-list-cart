import "./App.css";
import "tailwindcss/tailwind.css";
import dessertsData from "./data/data.json";
import type { Dessert } from "./types";
import DessertList from "./components/DessertList";
import Cart from "./components/Cart";

function App() {
  const desserts: Dessert[] = dessertsData;

  console.log("Desserts loaded:", desserts);

  return (
    <div className="min-h-screen bg-white font-red-hat-text p-4 mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
        <div className="w-full md:w-[75%] lg:w-[80%]">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 mt-4">Desserts</h1>
          <DessertList />
        </div>
        <Cart />
      </div>
    </div>
  );
}

export default App;
