import dessertsData from "../data/data.json";
import DessertItem from "./DessertItem";
import { type Dessert } from "../types";

const DessertList = () => {
  const desserts: Dessert[] = dessertsData;

  return (
    <div className="px-2 sm:px-4">
      <div className="grid gap-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 sm:gap-1 rounded-xl p-2">
        {desserts.map((dessert, index) => (
          <DessertItem key={index} dessert={dessert} />
        ))}
      </div>
    </div>
  );
};

export default DessertList;
