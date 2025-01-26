import { useState, useEffect } from "react";
import StockDisplay from "./StockDisplay";
import api from './services/api';

export default function Holdings() {
  const [stockList, setStockList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalStockValue, setTotalStockValue] = useState(0);

  // Format currency values
  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setIsLoading(true);
        const data = await api.getPortfolioDetails();
        
        // Calculate total stock value
        const stocksValue = (data.all_time_returns?.current_value || 0) - (data.buying_power || 0);
        setTotalStockValue(stocksValue);
        
        // Transform portfolio data into required format
        const transformedStocks = data.portfolio.map(stock => ({
          symbol: stock.symbol,
          description: stock.symbol,
          quantity: stock.quantity.toString(),
          price: formatCurrency(stock.current_price),
          avgPrice: formatCurrency(stock.average_price),
          currentValue: formatCurrency(stock.current_value),
          portPercent: ((stock.current_value / stocksValue) * 100).toFixed(0)
        }));

        setStockList(transformedStocks);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        setError('Failed to load holdings data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  if (error) {
    return <div className="text-red-500 ml-42 mt-0">{error}</div>;
  }

  return (
    <div className="ml-42 mt-8">
      <h2 className="text-2xl font-bold mb-4" style={{ color: "#013946" }}>Holdings</h2>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Symbol</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Description</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Quantity</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Current Price</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Avg Price</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Current Value</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Portfolio %</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    <div className="animate-pulse text-gray-500">Loading...</div>
                  </td>
                </tr>
              ) : stockList.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No holdings found
                  </td>
                </tr>
              ) : (
                stockList.map((stock, index) => (
                  <tr 
                    key={index}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {stock.symbol}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {stock.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700">
                      {stock.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700">
                      {stock.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700">
                      {stock.avgPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700">
                      {stock.currentValue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700">
                      {stock.portPercent}%
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
