import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const PortfolioSetup = ({ isDarkMode, toggleDarkMode }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [viewMode, setViewMode] = useState("assets");
    const [selectedSource, setSelectedSource] = useState("portfolio");
    const [selectedInvestment, setSelectedInvestment] = useState(null);
    const [showWishlistEditor, setShowWishlistEditor] = useState(false);
  const navigate = useNavigate();
  const title="Portfolio_Setup";
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    location: "New York, USA",
    occupation: "Software Engineer",
    riskTolerance: "Moderate",
    investmentHorizon: "5-10 years",
    monthlyInvestment: "2000",
    preferredSectors: ["Technology", "Healthcare"],
    investmentGoals: ["Retirement", "Wealth Growth"],
  });

  const sectors = [
    "Technology",
    "Healthcare",
    "Finance",
    "Green Energy",
    "Real Estate",
    "Consumer Goods",
    "Industrial",
    "Materials",
  ];

  const goals = [
    "Retirement",
    "Wealth Growth",
    "Passive Income",
    "Short-term Gains",
    "Education",
    "Emergency Fund",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    navigate("/portfolio");
  };

  const toggleProfile = () => {
      setIsProfileOpen(!isProfileOpen);
    };
  
  
  
    const ProfileModal = () => {
      return (
        <div
          className="fixed right-4 top-16 w-64 rounded-xl shadow-lg z-50 profile-menu"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={`${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } rounded-xl p-4`}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xl">👤</span>
              </div>
              <div>
                <h3 className="font-medium">John Doe</h3>
                <p className="text-sm text-gray-500">john@example.com</p>
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
                Dashboard
              </button>
  
              <button
                className={`w-full text-left px-3 py-2 rounded-lg ${
                  isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                Help Center
              </button>
              <hr
                className={isDarkMode ? "border-gray-700" : "border-gray-200"}
              />
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
  
    useEffect(() => {
        const closeProfile = (e) => {
          if (isProfileOpen && !e.target.closest(".profile-menu")) {
            setIsProfileOpen(false);
          }
        };
    
        document.addEventListener("click", closeProfile);
        return () => document.removeEventListener("click", closeProfile);
      }, [isProfileOpen]);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      <Header
        pageTitle={title}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        viewMode=""
        setViewMode={() => {}}
        toggleProfile={() => {}}
        isProfileOpen={false}
      />
      {isProfileOpen && <ProfileModal />}
      <div className="max-w-[1920px] mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-light">Portfolio Setup</h1>
          <button
            onClick={() => navigate("/portfolio")}
            className={`px-4 py-2 rounded-lg ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-100 hover:bg-gray-200"
            } transition-colors`}
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div
            className={`p-6 rounded-xl ${
              isDarkMode ? "bg-gray-800/50" : "bg-gray-50"
            }`}
          >
            <h2 className="text-xl font-medium mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className={`block text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  } mb-2`}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-200 text-gray-800"
                  } border focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                />
              </div>
              <div>
                <label
                  className={`block text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  } mb-2`}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-200 text-gray-800"
                  } border focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                />
              </div>
              <div>
                <label
                  className={`block text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  } mb-2`}
                >
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-200 text-gray-800"
                  } border focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                />
              </div>
              <div>
                <label
                  className={`block text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  } mb-2`}
                >
                  Occupation
                </label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) =>
                    setFormData({ ...formData, occupation: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-200 text-gray-800"
                  } border focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                />
              </div>
            </div>
          </div>

          {/* Investment Profile */}
          <div
            className={`p-6 rounded-xl ${
              isDarkMode ? "bg-gray-800/50" : "bg-gray-50"
            }`}
          >
            <h2 className="text-xl font-medium mb-6">Investment Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className={`block text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  } mb-2`}
                >
                  Risk Tolerance
                </label>
                <select
                  value={formData.riskTolerance}
                  onChange={(e) =>
                    setFormData({ ...formData, riskTolerance: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-200 text-gray-800"
                  } border focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                >
                  <option>Conservative</option>
                  <option>Moderate</option>
                  <option>Aggressive</option>
                </select>
              </div>
              <div>
                <label
                  className={`block text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  } mb-2`}
                >
                  Investment Horizon
                </label>
                <select
                  value={formData.investmentHorizon}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      investmentHorizon: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-200 text-gray-800"
                  } border focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                >
                  <option>1-3 years</option>
                  <option>3-5 years</option>
                  <option>5-10 years</option>
                  <option>10+ years</option>
                </select>
              </div>
              <div>
                <label
                  className={`block text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  } mb-2`}
                >
                  Monthly Investment ($)
                </label>
                <input
                  type="number"
                  value={formData.monthlyInvestment}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      monthlyInvestment: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-200 text-gray-800"
                  } border focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                />
              </div>
            </div>

            {/* Preferred Sectors */}
            <div className="mt-6">
              <label
                className={`block text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                } mb-2`}
              >
                Preferred Sectors
              </label>
              <div className="flex flex-wrap gap-2">
                {sectors.map((sector) => (
                  <button
                    key={sector}
                    type="button"
                    onClick={() => {
                      const newSectors = formData.preferredSectors.includes(
                        sector
                      )
                        ? formData.preferredSectors.filter((s) => s !== sector)
                        : [...formData.preferredSectors, sector];
                      setFormData({
                        ...formData,
                        preferredSectors: newSectors,
                      });
                    }}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      formData.preferredSectors.includes(sector)
                        ? "bg-cyan-500 text-white"
                        : isDarkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {sector}
                  </button>
                ))}
              </div>
            </div>

            {/* Investment Goals */}
            <div className="mt-6">
              <label
                className={`block text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                } mb-2`}
              >
                Investment Goals
              </label>
              <div className="flex flex-wrap gap-2">
                {goals.map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => {
                      const newGoals = formData.investmentGoals.includes(goal)
                        ? formData.investmentGoals.filter((g) => g !== goal)
                        : [...formData.investmentGoals, goal];
                      setFormData({ ...formData, investmentGoals: newGoals });
                    }}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      formData.investmentGoals.includes(goal)
                        ? "bg-cyan-500 text-white"
                        : isDarkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioSetup;
