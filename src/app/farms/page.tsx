import FarmCard from "./farm-card";
import SearchBar from "./SearchBar";
interface Farm {
  farmName: string;
  rates: string;
  credits: string;
  version: string;
}

const farms: Farm[] = [
  {
    farmName: "500k iron farm",
    rates: "500,000/hr",
    credits: "Samuel",
    version: "1.19+",
  },
  {
    farmName: "400k magma farm",
    rates: "400,000/hr",
    credits: "Samantha",
    version: "1.16+",
  },
  {
    farmName: "300k iron farm",
    rates: "300,000/hr",
    credits: "Catsus",
    version: "1.11+",
  },
  {
    farmName: "10m gold farm",
    rates: "10,000,000/h",
    credits: "Bread",
    version: "1.21+",
  },
  {
    farmName: "1k iron farm",
    rates: "1,000/hr",
    credits: "Hungrsy",
    version: "1.10+",
  },
];

function FarmsList() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Farm Archives</h1>
      <p className="text-gray-300 tracking-wide mt-2 max-w-2xl">
        Explore a vast collection of Minecraft farm designs, from simple starter
        farms to complex automated systems. Find inspiration and schematics for
        your next build.
      </p>
      <SearchBar />
      <ul className="grid lg:grid-cols-4 gap-4 mt-4 md:grid-cols-3 sm:grid-cols-2">
        {farms.map((farm: Farm, index: number) => (
          <FarmCard farm={farm} key={farm.farmName} index={index} />
        ))}
      </ul>
    </div>
  );
}

export default FarmsList;
