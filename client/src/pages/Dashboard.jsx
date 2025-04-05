import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ChatBot from "./ChatBot";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = ({ isDarkMode }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [viewMode, setViewMode] = useState("assets");
  const [selectedSource, setSelectedSource] = useState("portfolio");
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [portfolioData, setPortfolioData] = useState(null);
  const [wishlistData, setWishlistData] = useState(null);
  const [showWishlistEditor, setShowWishlistEditor] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Default chart data
  const defaultChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    values: [10000, 12000, 11500, 13000, 12500, 14000]
  };

  // Fallback data for when no data is available from the database
  const fallbackPortfolioData = {
    totalAssets: 125000,
    growthPercentage: 8.5,
    growthAmount: 9800,
    performance: "Good",
    totalProfit: 15000,
    profitPercentage: 12,
    monthlyGrowth: 2.3,
    monthlyAmount: 2800,
    bestProfitAsset: {
      symbol: "AAPL",
      name: "Apple Inc."
    },
    portfolioScore: {
      grade: "A",
      score: 85,
      maxScore: 100,
      status: "Excellent"
    },
    aira: {
      score: 92,
      description: "AI Risk Assessment"
    },
    pri: {
      score: 8.5,
      description: "Portfolio Risk Index"
    },
    investments: [
      {
        symbol: "AAPL",
        name: "Apple Inc.",
        amount: 10,
        price: 175.50,
        value: 1755.00,
        allocation: 25,
        dailyChange: 2.34,
        weeklyChange: 1.12,
        monthlyReturn: 5.67,
        ytdReturn: 12.45,
        volatility: "Medium",
        beta: 1.12,
        sharpeRatio: 1.34,
        riskScore: 7,
        marketCap: "2.8T",
        peRatio: 28.4,
        chartData: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          values: [170, 165, 180, 175, 185, 190]
        }
      },
      {
        symbol: "MSFT",
        name: "Microsoft Corporation",
        amount: 8,
        price: 320.75,
        value: 2566.00,
        allocation: 35,
        dailyChange: 1.45,
        weeklyChange: 2.78,
        monthlyReturn: 4.23,
        ytdReturn: 15.67,
        volatility: "Low",
        beta: 0.95,
        sharpeRatio: 1.56,
        riskScore: 5,
        marketCap: "2.4T",
        peRatio: 32.1,
        chartData: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          values: [310, 315, 325, 320, 330, 335]
        }
      },
      {
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        amount: 5,
        price: 142.20,
        value: 711.00,
        allocation: 15,
        dailyChange: 0.89,
        weeklyChange: -0.45,
        monthlyReturn: 3.12,
        ytdReturn: 8.90,
        volatility: "Medium",
        beta: 1.05,
        sharpeRatio: 1.22,
        riskScore: 6,
        marketCap: "1.8T",
        peRatio: 25.7,
        chartData: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          values: [140, 138, 145, 142, 148, 150]
        }
      }
    ]
  };

  const fallbackWishlistData = {
    items: [
      {
        symbol: "TSLA",
        name: "Tesla, Inc.",
        currentPrice: 245.80,
        targetPrice: 280.00,
        chartData: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          values: [220, 230, 240, 235, 245, 250]
        }
      },
      {
        symbol: "AMZN",
        name: "Amazon.com, Inc.",
        currentPrice: 135.40,
        targetPrice: 150.00,
        chartData: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          values: [130, 132, 135, 134, 138, 140]
        }
      },
      {
        symbol: "NVDA",
        name: "NVIDIA Corporation",
        currentPrice: 420.50,
        targetPrice: 450.00,
        chartData: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          values: [400, 410, 420, 415, 425, 430]
        }
      }
    ]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        grid: { color: "#f0f0f0" },
        ticks: {
          callback: (value) => value / 1000 + "k",
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2,
        borderColor: "rgba(0, 0, 0, 0.7)",
        fill: false,
      },
      point: { radius: 0, hitRadius: 10, hoverRadius: 4 },
    },
  };

  // Fetch data effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const [portfolioResponse, wishlistResponse] = await Promise.all([
          fetch("http://localhost:8000/profile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }),
          fetch("http://localhost:8000/watchlist", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
        ]);

        if (!portfolioResponse.ok || !wishlistResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const [portfolioData, wishlistData] = await Promise.all([
          portfolioResponse.json(),
          wishlistResponse.json()
        ]);

        // Use fallback data if no data is available
        setPortfolioData(portfolioData?.investments?.length > 0 ? portfolioData : fallbackPortfolioData);
        setWishlistData(wishlistData?.items?.length > 0 ? wishlistData : fallbackWishlistData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
        // Use fallback data on error
        setPortfolioData(fallbackPortfolioData);
        setWishlistData(fallbackWishlistData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Profile click outside handler
  useEffect(() => {
    const closeProfile = (e) => {
      if (isProfileOpen && !e.target.closest(".profile-menu")) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", closeProfile);
    }

    return () => {
      document.removeEventListener("mousedown", closeProfile);
    };
  }, [isProfileOpen]);

  // Chart data
  const chartData = {
    labels: portfolioData?.chartSources?.[selectedSource]?.labels || defaultChartData.labels,
    datasets: [
      {
        data: portfolioData?.chartSources?.[selectedSource]?.values || defaultChartData.values,
        borderColor: isDarkMode ? "rgb(0, 217, 255)" : "rgba(0, 0, 0, 0.7)",
      },
    ],
  };

  // Helper functions
  const getCurrentData = () => (viewMode === "assets" ? portfolioData?.investments || [] : wishlistData?.items || []);

  const getChartData = () => {
    if (selectedInvestment?.chartData) {
      return {
        labels: selectedInvestment.chartData.labels,
        datasets: [
          {
            data: selectedInvestment.chartData.values,
            borderColor: isDarkMode ? "rgb(0, 217, 255)" : "rgba(0, 0, 0, 0.7)",
          },
        ],
      };
    }
    return chartData;
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handlePortfolioNavigation = () => {
    navigate("/portfolio", { replace: true });
    setIsProfileOpen(false);
  };

  // ProfileModal component
  const ProfileModal = () => {
    return (
      <div
        className="fixed right-4 top-16 w-64 rounded-xl shadow-lg z-50 profile-menu"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-xl p-4`}>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
            <div>
              <h3 className="font-medium">{portfolioData?.profile?.fullName || "John Doe"}</h3>
              <p className="text-sm text-gray-500">{portfolioData?.profile?.email || "john@example.com"}</p>
            </div>
          </div>

          <div className="space-y-2">
            <button
              className={`w-full text-left px-3 py-2 rounded-lg ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              Settings
            </button>

            <button
              className={`w-full text-left px-3 py-2 rounded-lg ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
              onClick={handlePortfolioNavigation}
            >
              Portfolio
            </button>

            <button
              className={`w-full text-left px-3 py-2 rounded-lg ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              Help Center
            </button>
            <hr className={isDarkMode ? "border-gray-700" : "border-gray-200"} />
            <button
              className={`w-full text-left px-3 py-2 rounded-lg text-red-500 ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  };

  // WishlistEditorModal component
  const WishlistEditorModal = ({ onClose, isDarkMode, wishlistData }) => {
    const [editedItems, setEditedItems] = useState(wishlistData?.items || []);
    const [newItem, setNewItem] = useState({ symbol: "", name: "", currentPrice: "", targetPrice: "" });

    const handleAddItem = () => {
      if (newItem.symbol && newItem.name && newItem.currentPrice && newItem.targetPrice) {
        setEditedItems([...editedItems, {
          ...newItem,
          currentPrice: parseFloat(newItem.currentPrice),
          targetPrice: parseFloat(newItem.targetPrice),
          chartData: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            values: Array(6).fill(0).map(() => Math.random() * 100 + parseFloat(newItem.currentPrice))
          }
        }]);
        setNewItem({ symbol: "", name: "", currentPrice: "", targetPrice: "" });
      }
    };

    const handleRemoveItem = (index) => {
      setEditedItems(editedItems.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
      try {
        const response = await fetch("http://localhost:8000/watchlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ items: editedItems }),
        });

        if (!response.ok) {
          throw new Error("Failed to update watchlist");
        }

        setWishlistData({ items: editedItems });
        onClose();
      } catch (err) {
        console.error("Error updating watchlist:", err);
        // Fallback to local state update if API fails
        setWishlistData({ items: editedItems });
        onClose();
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-xl p-6 w-full max-w-2xl`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">Edit Watchlist</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>

          {/* Add new item form */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="Symbol"
              value={newItem.symbol}
              onChange={(e) => setNewItem({ ...newItem, symbol: e.target.value.toUpperCase() })}
              className={`p-2 rounded-lg border ${
                isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
              }`}
            />
            <input
              type="text"
              placeholder="Company Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className={`p-2 rounded-lg border ${
                isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
              }`}
            />
            <input
              type="number"
              placeholder="Current Price"
              value={newItem.currentPrice}
              onChange={(e) => setNewItem({ ...newItem, currentPrice: e.target.value })}
              className={`p-2 rounded-lg border ${
                isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
              }`}
            />
            <input
              type="number"
              placeholder="Target Price"
              value={newItem.targetPrice}
              onChange={(e) => setNewItem({ ...newItem, targetPrice: e.target.value })}
              className={`p-2 rounded-lg border ${
                isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
              }`}
            />
          </div>
          <button
            onClick={handleAddItem}
            className="w-full mb-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Item
          </button>

          {/* Watchlist items */}
          <div className="space-y-4 mb-6">
            {editedItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <div>
                  <div className="font-medium">{item.symbol}</div>
                  <div className="text-sm text-gray-500">{item.name}</div>
                </div>
                <div className="text-right">
                  <div>${item.currentPrice}</div>
                  <div className="text-sm text-gray-500">Target: ${item.targetPrice}</div>
                </div>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${
                isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  const renderMainContent = () => {
    switch (viewMode) {
      case "chat":
        return (
          <div className="h-full grid lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="h-full overflow-y-auto space-y-6 pr-3">
              <div>
                <h1 className={`text-4xl ${isDarkMode ? "text-gray-400" : "text-gray-300"} font-light`}>
                  AI Insights
                </h1>
                <h2 className="text-xl font-medium mt-4">Portfolio Analysis</h2>
              </div>

              {/* Chart */}
              <div className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-gray-50"}`}>
                <div className="flex justify-between items-center mb-4">
                  <select
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-200 text-gray-800"
                    } border focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  >
                    <option value="portfolio">Portfolio Performance</option>
                    <option value="spy">S&P 500 Comparison</option>
                    <option value="nasdaq">NASDAQ Comparison</option>
                  </select>
                </div>
                <div className="h-[240px]">
                  <Line options={chartOptions} data={selectedInvestment ? getChartData() : chartData} />
                </div>
              </div>

              {/* Investment Selection */}
              <div className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-gray-50"}`}>
                <h3 className="text-lg font-medium mb-4">Select Investment to Analyze</h3>
                <div className="grid grid-cols-2 gap-4">
                  {portfolioData?.investments?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedInvestment(item)}
                      className={`${
                        selectedInvestment?.symbol === item.symbol
                          ? "bg-cyan-500 text-white"
                          : isDarkMode
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-100 hover:bg-gray-200"
                      } p-4 rounded-xl cursor-pointer transition-all duration-300`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 ${
                            selectedInvestment?.symbol === item.symbol
                              ? "bg-white text-cyan-500"
                              : "bg-black text-white"
                          } rounded-full flex items-center justify-center mr-3`}
                        >
                          {item.symbol.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className={`${selectedInvestment?.symbol === item.symbol ? "text-cyan-100" : "text-gray-500"} text-sm`}>
                            {item.symbol}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - ChatBot */}
            <div className={`${isDarkMode ? "bg-gray-800/50" : "bg-gray-50"} rounded-xl h-full overflow-hidden`}>
              <ChatBot isDarkMode={isDarkMode} selectedInvestment={selectedInvestment} portfolioData={portfolioData} />
            </div>
          </div>
        );

      default:
        return (
          <div className="h-full grid lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="h-full overflow-y-auto space-y-6 pr-3">
              <div>
                <h1 className={`text-4xl ${isDarkMode ? "text-gray-400" : "text-gray-300"} font-light`}>
                  {viewMode === "assets" ? "Dashboard" : viewMode === "chat" ? "AI Insights" : "Watchlist"}
                </h1>
                <h2 className="text-xl font-medium mt-4">Evaluation</h2>
              </div>

              {/* Total Portfolio Value */}
              <div className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-gray-50"}`}>
                <div className="text-gray-500">Total portfolio value</div>
                <div className="flex items-baseline">
                  <span className="text-2xl md:text-3xl font-bold mr-2">
                    ${portfolioData?.totalAssets?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) || "0.00"}
                  </span>
                  <span className={`${isDarkMode ? "bg-green-900 text-green-300" : "bg-green-100 text-green-800"} px-2 py-0.5 rounded text-sm`}>
                    ▲ {portfolioData?.growthPercentage || 0}% ${portfolioData?.growthAmount || 0}
                  </span>
                </div>
                <div className={`inline-block ${isDarkMode ? "bg-gray-800" : "bg-gray-100"} px-3 py-1 rounded-full mt-1 text-sm`}>
                  <span>{portfolioData?.performance || "Good"} 👍</span>
                </div>
              </div>

              {/* Chart */}
              <div className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-gray-50"}`}>
                <div className="flex justify-between items-center mb-4">
                  <select
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white border-gray-200 text-gray-800"
                    } border focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                  >
                    <option value="portfolio">Portfolio Performance</option>
                    <option value="spy">S&P 500 Comparison</option>
                    <option value="nasdaq">NASDAQ Comparison</option>
                  </select>
                </div>
                <div className="h-[240px]">
                  <Line options={chartOptions} data={selectedInvestment ? getChartData() : chartData} />
                </div>
              </div>

              {/* Portfolio metrics */}
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div>
                  <div className="text-gray-500 text-xs">Total profit</div>
                  <div className="text-sm lg:text-base font-bold text-green-600">
                    +${portfolioData?.totalProfit?.toLocaleString() || "0"}
                  </div>
                  <div className="text-green-600 text-xs">+{portfolioData?.profitPercentage || 0}%</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs">Avg. monthly return</div>
                  <div className="text-sm lg:text-base font-bold text-red-600">
                    ~{portfolioData?.monthlyGrowth || 0}% ▼
                  </div>
                  <div className="text-red-600 text-xs">~${Math.abs(portfolioData?.monthlyAmount || 0)}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs">Best-performing asset</div>
                  <div className="flex items-center">
                    <div className="bg-gray-200 w-4 h-4 lg:w-5 lg:h-5 rounded-full flex items-center justify-center mr-1 text-xs">
                      {portfolioData?.bestProfitAsset?.symbol?.charAt(0) || "T"}
                    </div>
                    <div>
                      <div className="text-sm lg:text-base font-bold">
                        {portfolioData?.bestProfitAsset?.name || "Tesla"}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {portfolioData?.bestProfitAsset?.symbol || "TSLA"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Portfolio score */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <div className="text-gray-500 text-xs">Portfolio health</div>
                  <div className="flex items-center mt-1">
                    <div className={`w-6 h-6 lg:w-8 lg:h-8 ${isDarkMode ? "bg-green-900" : "bg-green-100"} rounded-full flex items-center justify-center text-sm lg:text-base font-bold mr-2`}>
                      {portfolioData?.portfolioScore?.grade || "A"}
                    </div>
                    <div className="text-sm lg:text-base font-bold">
                      {portfolioData?.portfolioScore?.score || 85}
                      <span className={`${isDarkMode ? "text-gray-500" : "text-gray-400"} font-normal text-xs`}>
                        /{portfolioData?.portfolioScore?.maxScore || 100}
                      </span>
                    </div>
                  </div>
                  <div className="text-gray-500 text-xs">{portfolioData?.portfolioScore?.status || "Excellent"}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs">AIRA</div>
                  <div className="text-sm lg:text-base font-bold mt-1">
                    {portfolioData?.aira?.score || 92}% ▲
                    <span className="text-xs ml-1">ℹ️</span>
                  </div>
                  <div className="text-gray-500 text-xs">{portfolioData?.aira?.description || "AI Risk Assessment"}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs">PRI</div>
                  <div className="text-sm lg:text-base font-bold mt-1">
                    {portfolioData?.pri?.score || 8.5}
                    <span className="text-xs ml-1">ℹ️</span>
                  </div>
                  <div className="text-gray-500 text-xs">{portfolioData?.pri?.description || "Portfolio Risk Index"}</div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="h-full overflow-y-auto pr-3">
              {selectedInvestment ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-medium">{selectedInvestment.name} Details</h2>
                    <button onClick={() => setSelectedInvestment(null)} className="text-gray-500 hover:text-gray-700">
                      ✕
                    </button>
                  </div>
                  <div className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-gray-50"}`}>
                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
                      <div>
                        <p className="text-gray-500 text-sm">Current Value</p>
                        <p className="text-xl font-bold">${selectedInvestment.value?.toLocaleString() || "0"}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Units</p>
                        <p className="text-xl font-bold">{selectedInvestment.amount || "0"}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Price Per Unit</p>
                        <p className="text-xl font-bold">${selectedInvestment.price || "0"}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Allocation</p>
                        <p className="text-xl font-bold">{selectedInvestment.allocation || "0"}%</p>
                      </div>
                    </div>

                    {/* Performance Section */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold mb-3">Performance</h4>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <div>
                          <p className="text-gray-500 text-sm">Daily Change</p>
                          <p className="text-green-500 font-medium">+{selectedInvestment.dailyChange || "2.34"}%</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Weekly Change</p>
                          <p className="text-red-500 font-medium">-{selectedInvestment.weeklyChange || "1.12"}%</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Monthly Return</p>
                          <p className="text-green-500 font-medium">+{selectedInvestment.monthlyReturn || "5.67"}%</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">YTD Return</p>
                          <p className="text-green-500 font-medium">+{selectedInvestment.ytdReturn || "12.45"}%</p>
                        </div>
                      </div>
                    </div>

                    {/* Risk Analysis Section */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold mb-3">Risk Analysis</h4>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <div>
                          <p className="text-gray-500 text-sm">Volatility</p>
                          <p className="font-medium">{selectedInvestment.volatility || "Medium"}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Beta</p>
                          <p className="font-medium">{selectedInvestment.beta || "1.12"}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Sharpe Ratio</p>
                          <p className="font-medium">{selectedInvestment.sharpeRatio || "1.34"}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Risk Score</p>
                          <p className="font-medium">{selectedInvestment.riskScore || "7"}/10</p>
                        </div>
                      </div>
                    </div>

                    {/* Market Information */}
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Market Information</h4>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <div>
                          <p className="text-gray-500 text-sm">Market Cap</p>
                          <p className="font-medium">${selectedInvestment.marketCap || "234.5B"}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">P/E Ratio</p>
                          <p className="font-medium">{selectedInvestment.peRatio || "22.4"}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">52W High</p>
                          <p className="font-medium">${(selectedInvestment.price * 1.2).toFixed(2) || "0.00"}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">52W Low</p>
                          <p className="font-medium">${(selectedInvestment.price * 0.8).toFixed(2) || "0.00"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium">{viewMode === "assets" ? "Asset Allocation" : "Watchlist"}</h2>
                    {viewMode === "wishlist" && (
                      <button
                        onClick={() => setShowWishlistEditor(true)}
                        className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
                      >
                        Edit Watchlist
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {getCurrentData().map((item, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedInvestment(item)}
                        className={`${
                          viewMode === "assets" && index < 2
                            ? "bg-cyan-300 hover:bg-cyan-400"
                            : isDarkMode
                            ? "bg-gray-800/50 hover:bg-gray-700"
                            : "bg-gray-50 hover:bg-gray-100"
                        } p-5 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer`}
                      >
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white mr-3">
                            {item.symbol.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-gray-500 text-sm">{item.symbol}</div>
                          </div>
                        </div>
                        <div className="flex justify-between items-end">
                          <div className="text-2xl font-medium">
                            {viewMode === "assets" ? item.amount : `$${item.currentPrice}`}
                          </div>
                          <div className="text-sm font-medium">
                            {viewMode === "assets" ? `${item.allocation}%` : `Target: $${item.targetPrice}`}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`h-screen flex flex-col ${isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"}`}>
      <Header
        isDarkMode={isDarkMode}
        viewMode={viewMode}
        setViewMode={(mode) => {
          setViewMode(mode);
          setSelectedInvestment(null);
        }}
        toggleProfile={toggleProfile}
        isProfileOpen={isProfileOpen}
      />

      {isProfileOpen && <ProfileModal />}

      <div className="flex-1 overflow-hidden px-6 pb-6">
        <div className="h-full max-w-[1920px] mx-auto">{renderMainContent()}</div>
      </div>

      {showWishlistEditor && (
        <WishlistEditorModal onClose={() => setShowWishlistEditor(false)} isDarkMode={isDarkMode} wishlistData={wishlistData} />
      )}
    </div>
  );
};

export default Dashboard;
