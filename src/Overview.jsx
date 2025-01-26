import { useState, useEffect } from "react";
import BuyModal from "./BuyModal"; // Import BuyModal component
import api from './services/api';
import { usePortfolio } from './context/PortfolioContext';

export default function Overview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 0,
    cashBalance: 0,
    stocksValue: 0,
    streak: 0,
    lastLogin: '',
    dailyReturn: 0,
    dailyReturnPercentage: 0,
    totalReturn: 0,
    totalReturnPercentage: 0,
    initialInvestment: 0,
    currentValue: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { portfolioVersion, refreshPortfolio } = usePortfolio();

  // Format currency values
  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Format percentage values
  const formatPercentage = (value) => {
    return value.toFixed(2) + '%';
  };

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Try to get cached data first
        const data = api.getCachedPortfolio() || await api.getPortfolioDetails();
        
        setPortfolioData({
          totalValue: data.all_time_returns?.current_value,
          cashBalance: data.buying_power || 0,
          stocksValue: (data.all_time_returns?.current_value || 0),
          streak: data.streak_info?.current_streak || 0,
          lastLogin: data.streak_info?.last_login || '',
          dailyReturn: data.daily_returns?.daily_return || 0,
          dailyReturnPercentage: data.daily_returns?.daily_return_percentage || 0,
          totalReturn: data.all_time_returns?.total_return || 0,
          totalReturnPercentage: data.all_time_returns?.total_return_percentage || 0,
          initialInvestment: data.all_time_returns?.initial_investment || 0,
          currentValue: data.all_time_returns?.current_value || 0
        });
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        setError('Failed to load portfolio data');
      } finally {
        setIsLoading(false);
      }
    };

    // Listen for portfolio updates
    const handlePortfolioUpdate = (event) => {
      const newData = event.detail;
      console.log('Portfolio update received in Overview:', newData);
      fetchPortfolioData();
    };

    window.addEventListener('portfolioUpdate', handlePortfolioUpdate);
    fetchPortfolioData();

    return () => window.removeEventListener('portfolioUpdate', handlePortfolioUpdate);
  }, [portfolioVersion]);

  // Format date for streak display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="ml-4 mt-0">
      <div className="flex justify-between items-center">
        <p style={{ color: "#013946" }} className="font-bold">Overview</p>
        <button
          onClick={refreshPortfolio}
          className="px-4 py-2 bg-[#013946] text-white rounded hover:bg-[#436E95]"
        >
          Refresh Overview
        </button>
      </div>
      <div className="w-125 h-100 bg-[#F3F3F3] mt-2">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-pulse text-gray-500">Loading...</div>
          </div>
        ) : (
          <>
            <div>
              <p className="pt-6 ml-10">Account Value</p>
              <p className="ml-10 font-bold text-4xl">
                {formatCurrency(portfolioData.totalValue)}
              </p>
            </div>

            <hr className="mt-6 border-t border-gray-300 w-5/6 mx-auto" />

            <div className="inline-flex mt-4 mx-auto">
              <div className="ml-4">
                <p className="ml-6">Today's change</p>
                <p className="ml-6 font-bold text-3xl">
                  {formatPercentage(portfolioData.dailyReturnPercentage)}
                </p>
                <p className="ml-6 text-sm">
                  {formatCurrency(portfolioData.dailyReturn)}
                </p>
              </div>

              <div>
                <p className="ml-6">Total change</p>
                <p className="ml-6 font-bold text-3xl">
                  {formatPercentage(portfolioData.totalReturnPercentage)}
                </p>
                <p className="ml-6 text-sm">
                  {formatCurrency(portfolioData.totalReturn)}
                </p>
              </div>

              <div className="ml-4">
                <p className="ml-4">Buying Power</p>
                <p className="ml-4 font-bold text-3xl">
                  {formatCurrency(portfolioData.cashBalance)}
                </p>
              </div>
            </div>

            <div className="inline-flex w-full mt-6 mx-auto">
              <div>
                <p className="ml-10">Streak</p>
                <p className="ml-10 font-bold text-3xl">{portfolioData.streak} days</p>
                <p className="ml-16">Since {formatDate(portfolioData.lastLogin)}</p>
              </div>

              <div>
                <button className="bg-gray-300 ml-10 mt-8 text-black px-5 py-2 hover:bg-gray-400">
                  Daily Claim
                </button>
              </div>
            </div>

            <hr className="mt-6 border-t border-gray-300 w-5/6 mx-auto" />

            <div className="flex justify-center mt-4">
              <button 
                className="bg-[#013946] text-white font-bold px-6 py-3 hover:bg-[#436E95] hover:text-red-600"
                onClick={() => setIsModalOpen(true)}
              >
                Buy Holdings
              </button>
            </div>
          </>
        )}
      </div>

      <BuyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
