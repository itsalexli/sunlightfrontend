var accountValue = 100000;
var changePercent = 12;
var annualChange = 24;
var buyingPower = 300000;
export default function Overview() {
  return (
    <div className="ml-4 mt-0">
      <p className="font-bold">Overview</p>
      <div className="w-120 h-80 bg-gray-300">
        <div>
          <p className="pt-4 ml-10">Account Value</p>
          <p className=" ml-10 font-bold text-6xl">${accountValue}</p>
        </div>

        <div className="inline-flex mt-4 mx-auto">
          <div className="ml-4">
            <p className="ml-4">Today's change</p>
            <p className="ml-4 ml-10 font-bold text-4xl">${changePercent}</p>
          </div>

          <div>
            <p className="ml-4">Total change</p>
            <p className="ml-4 ml-10 font-bold text-4xl">{annualChange}%</p>
          </div>
        </div>

        <div className="inline-flex mt-4 mx-auto">
          <div className="ml-4">
            <p className="ml-4">Buying Power</p>
            <p className="ml-4 ml-10 font-bold text-4xl">${buyingPower}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
