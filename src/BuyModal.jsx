export default function BuyModal({ isOpen, onClose }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            onClick={onClose}
          >
            &times;
          </button>
  
          <h2 className="text-lg font-bold text-[#FFD700] bg-[#013946] p-3 text-center rounded-t-lg">
            Buy to Qtrade Securities Inc.
          </h2>
  
          <div className="p-4">
            <p className="text-gray-700 mb-1">Enter Amount</p>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="0"
            />
  
            <hr className="my-3 border-gray-300" />
  
            <p className="font-semibold">Holdings</p>
  
            <div className="bg-gray-100 p-2 rounded-md mt-2">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="p-1">Company</th>
                    <th className="p-1">Value</th>
                    <th className="p-1">Shares</th>
                    <th className="p-1">%</th>
                    <th className="p-1">$</th>
                  </tr>
                </thead>
                <tbody>
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
  
            <button
              className="bg-gray-300 text-black w-full mt-4 py-2 rounded-md hover:bg-gray-400"
              onClick={onClose}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    );
  }
  