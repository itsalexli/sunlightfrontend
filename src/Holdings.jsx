import { useState, useEffect } from "react";
import StockDisplay from "./StockDisplay";
import api from './services/api';
import { usePortfolio } from './context/PortfolioContext';
import axios from 'axios';

export default function Holdings() {
  const { portfolioVersion } = usePortfolio();
  const [stockList, setStockList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalStockValue, setTotalStockValue] = useState(0);
  const [lastRefresh, setLastRefresh] = useState(null);

  // Format currency values
  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const fetchPortfolioData = async () => {
    try {
      setIsLoading(true);
      // Try to get cached data first
      const data = api.getCachedPortfolio() || await api.getPortfolioDetails();
      
      // Calculate total stock value
      const stocksValue = (data.all_time_returns?.current_value || 0) - (data.buying_power || 0);
      setTotalStockValue(stocksValue);
      
      // Transform portfolio data
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
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      setError('Failed to load holdings data');
    } finally {
      setIsLoading(false);
    }
  };

  // Listen for portfolio updates
  useEffect(() => {
    const handlePortfolioUpdate = (event) => {
      const newData = event.detail;
      console.log('Portfolio update received:', newData);
      fetchPortfolioData();
    };

    window.addEventListener('portfolioUpdate', handlePortfolioUpdate);
    return () => window.removeEventListener('portfolioUpdate', handlePortfolioUpdate);
  }, []);

  if (error) {
    return <div className="text-red-500 ml-42 mt-0">{error}</div>;
  }

  return (
    <div className="ml-42 mt-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: "#013946" }}>Holdings</h2>
          {lastRefresh && (
            <p className="text-sm text-gray-500">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </p>
          )}
        </div>
        <button
          onClick={fetchPortfolioData}
          className="px-4 py-2 bg-[#013946] text-white rounded hover:bg-[#436E95]"
        >
          Refresh
        </button>
      </div>
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
