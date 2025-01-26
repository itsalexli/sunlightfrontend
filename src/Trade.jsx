import { useState, useEffect } from "react";
import axios from "axios";
import BuyStockModal from "./BuyStockModal";
import api from './services/api';
import { usePortfolio } from './context/PortfolioContext';

export default function Trade() {
  // State Management
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Data and loading states
  const [stockData, setStockData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Search functionality states
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  
  // Buy modal states
  const [selectedStock, setSelectedStock] = useState(null);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  
  // Portfolio initialization feedback
  const [initializeMessage, setInitializeMessage] = useState('');

  // Get portfolio refresh function from context
  const { refreshPortfolio } = usePortfolio();

  // Load stock data when page changes or search state changes
  useEffect(() => {
    if (!isSearching) {
      loadData(currentPage);
    }
  }, [currentPage, isSearching]);

  // Initialize test portfolio with starting balance
  const handleInitialize = async () => {
    try {
      const response = await api.initializePortfolio();
      if (response.success) {
        setInitializeMessage('Portfolio initialized successfully!');
        // Clear success message after 3 seconds
        setTimeout(() => setInitializeMessage(''), 3000);
        
        // Refresh the current page data
        await loadData(currentPage);
      }
    } catch (error) {
      console.error('Error initializing portfolio:', error);
      setInitializeMessage('Failed to initialize portfolio');
    }
  };

  // Fetch stock data for the current page
  const loadData = async (page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/sp500-data?page=${page}`,
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

  // Handle stock search functionality
  const handleSearch = async () => {
    // If search term is empty, reset search state
    if (!searchTerm.trim()) {
      setIsSearching(false);
      return;
    }

    // If stock is already in current data, filter to show only that stock
    if (stockData[searchTerm]) {
      setStockData({ [searchTerm]: stockData[searchTerm] });
      setCurrentPage(1);
      return;
    }

    // Otherwise, fetch the specific stock data
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

  // Clear search and restore full stock list
  const clearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
    loadData(currentPage);
  };

  // Handle pagination
  const changePage = (delta) => {
    const newPage = currentPage + delta;
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Format number values for display
  const formatNumber = (value) => {
    if (typeof value !== "number") return "N/A";
    return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  // Format market cap values with appropriate suffix (B, M, etc.)
  const formatMarketCap = (value) => {
    if (!value) return "N/A";
    if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    return value.toLocaleString();
  };

  // Handle opening the buy modal for a stock
  const handleBuyClick = (ticker, stockData) => {
    setSelectedStock({
      symbol: ticker,
      price: stockData.Ask || stockData.Bid || stockData.Open, // Use first available price
      ...stockData
    });
    setIsBuyModalOpen(true);
  };

  // Handle successful stock purchase
  const handlePurchaseComplete = async (updatedPortfolio) => {
    try {
      console.log('Purchase completed, new portfolio state:', updatedPortfolio);
      
      // Refresh portfolio data across all components
      refreshPortfolio();
      
      // Close the modal
      setIsBuyModalOpen(false);
      
      // Show success message
      const message = document.createElement('div');
      message.className = 'fixed top-4 right-4 bg-green-100 text-green-700 px-4 py-2 rounded shadow-lg z-50';
      message.textContent = 'Purchase successful! Portfolio updated.';
      document.body.appendChild(message);
      setTimeout(() => message.remove(), 3000);

      // Refresh the trade table data
      await loadData(currentPage);
      
    } catch (error) {
      console.error('Error handling purchase completion:', error);
      
      // Show error message
      const errorMessage = document.createElement('div');
      errorMessage.className = 'fixed top-4 right-4 bg-red-100 text-red-700 px-4 py-2 rounded shadow-lg z-50';
      errorMessage.textContent = 'Error updating portfolio. Please refresh the page.';
      document.body.appendChild(errorMessage);
      setTimeout(() => errorMessage.remove(), 3000);
    }
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
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            S&P 500 Stock Data
          </h1>
          
          {/* Initialize Portfolio Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleInitialize}
              className="px-4 py-2 bg-[#013946] text-white rounded hover:bg-[#436E95]"
            >
              Initialize Test Portfolio
            </button>
            {initializeMessage && (
              <span className={`ml-2 ${initializeMessage.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
                {initializeMessage}
              </span>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search stocks..."
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-[#013946] text-white rounded hover:bg-[#436E95]"
          >
            Search
          </button>
          {isSearching && (
            <button
              onClick={clearSearch}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Clear
            </button>
          )}
        </div>

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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
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
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <button
                          onClick={() => handleBuyClick(ticker, data)}
                          className="bg-[#013946] text-white px-3 py-1 rounded hover:bg-[#436E95]"
                        >
                          Buy
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Buy Modal */}
      <BuyStockModal
        isOpen={isBuyModalOpen}
        onClose={() => {
          setIsBuyModalOpen(false);
          // Refresh data when modal is closed
          loadData(currentPage);
        }}
        stock={selectedStock}
        onPurchaseComplete={handlePurchaseComplete}
      />
    </div>
  );
}
