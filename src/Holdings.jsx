import StockDisplay from "./StockDisplay";
const stockList = [
  {
    symbol: "BBB",
    description: "Big Baller Brand",
    quantity: "3",
    price: "$38",
    portPercent: "29",
  },
  {
    symbol: "BBB",
    description: "Big Baller Brand",
    quantity: "3",
    price: "$38",
    portPercent: "29",
  },
  {
    symbol: "BBB",
    description: "Big Baller Brand",
    quantity: "3",
    price: "$38",
    portPercent: "29",
  },
  {
    symbol: "BBB",
    description: "Big Baller Brand",
    quantity: "3",
    price: "$38",
    portPercent: "29",
  },
];

export default function Holdings() {
  return (
    <div className="ml-42 mt-0">
      <p className="font-bold">Holdings</p>
      <div className=" w-7/8 h-80 bg-gray-300">
        <div className="mt-3 ml-5 inline-flex gap-40">
          <p className="text-lg font-bold">Symbol</p>
          <p className="text-lg font-bold">Description</p>
          <p className="text-lg font-bold">Quantity</p>
          <p className="text-lg font-bold">Current Price</p>
          <p className="text-lg font-bold">%Portfolio</p>
        </div>

        {stockList.map((stock, index) => (
          <StockDisplay
            key={index}
            symbol={stock.symbol}
            description={stock.description}
            quantity={stock.quantity}
            price={stock.price}
            portPercent={stock.portPercent}
          />
        ))}
      </div>
    </div>
  );
}
