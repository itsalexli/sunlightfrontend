import { useState } from "react";

export default function BuyModal({ isOpen, onClose }) {
    if (!isOpen) return null;
  
    const [page, setPage] = useState(1)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
        <div className="bg-white shadow-lg w-[400px] relative">
          <button
            className="absolute top-1 right-3 text-white hover:text-gray-400 text-xl"
            onClick={onClose}
          >
            &times;
          </button>
  
          <h2 className="text-lg font-bold text-[#F0B627] bg-[#013946] p-6 text-center">
            Buy to Qtrade Securities Inc.
          </h2>
  
            {
                page === 1 ? (
                    <div className="px-10 py-6">
            <p className="text-[#013946] font-semibold mb-1 ">Enter Amount</p>
            <input
              type="number"
              className="w-full border border-gray-300 p-2"
              placeholder="0"
            />
  
            <hr className="my-4 border-gray-300" />
  
            <p className="font-semibold text-[#013946]">Holdings</p>
  
            <div className="bg-gray-100 px-4 py-2 mt-2">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="p- font-semibold">Company</th>
                    <th className="p-1 font-semibold">Value</th>
                    <th className="p-1 font-semibold">Shares</th>
                    <th className="p-1 font-semibold">%</th>
                    <th className="p-1 font-semibold">$</th>
                  </tr>
                </thead>
                <tbody className="p-1 font-thin">
                  {[
                    { company: "GOOG", value: 100, shares: 1, percent: 30, dollar: 0 },
                    { company: "NVD", value: 200, shares: 2, percent: 40, dollar: 0 },
                    { company: "VPV", value: 150, shares: 2.5, percent: 30, dollar: 0 },
                  ].map((stock, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="p-1">{stock.company}</td>
                      <td className="p-1">${stock.value}</td>
                      <td className="p-1">{stock.shares}</td>
                      <td className="p-1">{stock.percent}%</td>
                      <td className="p-1 text-red-500">{stock.dollar}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-4">
                <button
                className="flex bg-gray-300 text-black font-semibold px-4 py-1 justify-center hover:bg-gray-400"
                onClick={() => {
                    setPage(2)
                    }}
                >
                Buy
                </button>
            </div>
          </div>
                ) : (
                    <div className="px-10 py-6">
                    <button onClick={() => setPage(1)} className="text-black text-left">
                      &lt; back
                    </button>
                
                  
                    <div className="bg-gray-100 p-6 mt-4">

                    <h2 className="text-lg font-bold text-[#013946] mb-4 text-center">Review Order</h2>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <p className="font-semibold">Order type:</p>
                          <p className="font-thin">Limit buy</p>
                        </div>
                        
                        <div className="flex justify-between">
                          <p className="font-semibold">Account:</p>
                          <p className="font-thin">TFSA</p>
                        </div>
                  
                        <div className="flex justify-between">
                          <p className="font-semibold">Cost:</p>
                          <p className="font-thin">$100</p>
                        </div>
                  
                        <div className="flex justify-between border-b border-gray-300 pb-2">
                          <p className="font-semibold">Commission fee:</p>
                          <p className="font-thin">$4</p>
                        </div>
                  
                        <div className="flex justify-between mt-6">
                          <p className="font-semibold">Total:</p>
                          <p className="font-normal">$104</p>
                        </div>
                      </div>
                    </div>
                  
                    <div className="flex justify-center mt-4">
                      <button className="bg-gray-100 text-red-500 font-semibold px-6 py-2 hover:bg-gray-300"
                      onClick={onClose}>
                        Confirm Purchase
                      </button>
                    </div>
                  </div>
                           
            )
            }
          
        </div>
      </div>
    );
  }
