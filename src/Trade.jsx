import { useState, useEffect } from "react";
import axios from "axios";

export default function Trade() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stockData, setStockData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!isSearching) {
      loadData(currentPage);
    }
  }, [currentPage, isSearching]);

  const loadData = async (page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/sp500-data?page=${page}`,
      );
      const { data } = response;
      setTotalPages(data.total_pages);
      setStockData(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setIsSearching(false);
      return;
    }

    if (stockData[searchTerm]) {
      setStockData({ [searchTerm]: stockData[searchTerm] });
      setCurrentPage(1);
      return;
    }

    setIsSearching(true);
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/stock-data/${searchTerm}`,
      );
      const { data } = response;
      setStockData(data); // Replace table data with search result
      setCurrentPage(1); // Reset pagination
    } catch (error) {
      console.log(error);
      setStockData({}); // Clear table if search fails
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
    loadData(currentPage); // Reload original data
  };

  const changePage = (delta) => {
    const newPage = currentPage + delta;
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const formatNumber = (value) => {
    if (typeof value !== "number") return "N/A";
    return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  const formatMarketCap = (value) => {
    if (!value) return "N/A";
    if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    return value.toLocaleString();
  };

  // Loading Skeleton
  const renderSkeleton = () => {
    return Array.from({ length: 10 }).map((_, index) => (
      <tr key={index} className="animate-pulse">
        <td className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded"></div>
        </td>
        <td className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded"></div>
        </td>
        <td className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded"></div>
        </td>
        <td className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded"></div>
        </td>
        <td className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded"></div>
        </td>
        <td className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded"></div>
        </td>
        <td className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded"></div>
        </td>
        <td className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded"></div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          S&P 500 Stock Data
        </h1>
        {/* Pagination */}
        {!isSearching && (
          <div className="flex justify-center items-center gap-4 mb-6">
            <button
              onClick={() => changePage(-1)}
              disabled={currentPage === 1 || isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => changePage(1)}
              disabled={currentPage === totalPages || isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
        {/* Search Bar */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ticker symbol (e.g., AAPL)"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Search
          </button>
          {isSearching && (
            <button
              onClick={clearSearch}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Clear Search
            </button>
          )}
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="text-center text-gray-600 mb-4">Loading data...</div>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ticker
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bid
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ask
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Open
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                High
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Low
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Market Cap
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                P/E Ratio
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading
              ? renderSkeleton()
              : Object.entries(stockData).map(([ticker, data]) => (
                  <tr key={ticker} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {ticker}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {formatNumber(data?.Bid)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {formatNumber(data?.Ask)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {formatNumber(data?.Open)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {formatNumber(data?.High)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {formatNumber(data?.Low)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {formatMarketCap(data?.["Market Cap"])}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {formatNumber(data?.["P/E Ratio"])}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
