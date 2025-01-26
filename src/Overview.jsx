import { useState } from "react";
import BuyModal from "./BuyModal"; // Import BuyModal component

var accountValue = 100000;
var changePercent = 12;
var annualChange = 24;
var buyingPower = 300000;

export default function Overview() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="ml-4 mt-0">
      <p style={{ color: "#013946" }} className="font-bold">Overview</p>
      <div className="w-125 h-100 bg-[#F3F3F3] mt-2">
        <div>
          <p className="pt-6 ml-10">Account Value</p>
          <p className=" ml-10 font-bold text-4xl">${accountValue}</p>
        </div>

        <div className="inline-flex mt-4 mx-auto">
          <div className="ml-4">
            <p className="ml-6">Today's change</p>
            <p className="ml-6 font-bold text-3xl">${changePercent}</p>
          </div>

          <div>
            <p className="ml-6">Total change</p>
            <p className="ml-6 font-bold text-3xl">{annualChange}%</p>
          </div>

          <div className="ml-4">
            <p className="ml-4">Buying Power</p>
            <p className="ml-4 font-bold text-3xl">${buyingPower}</p>
          </div>
        </div>

        <div  className="inline-flex w-full mt-4 mx-auto">
          <div>
            <p className="ml-10">Streak</p>
            <p className="ml-16 font-bold text-3xl">26 days</p>
            <p className="ml-16 ">Since Janurary 1, 2025</p>
          </div>
        </div>

        <div></div>

        <div className="ml-10 mt-4">
          <button 
            className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400"
            onClick={() => setIsModalOpen(true)}
          >
            Buy Holdings
          </button>
        </div>
      </div>

      <BuyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
