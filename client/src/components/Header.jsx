import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ isDarkMode, toggleDarkMode, viewMode, setViewMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isOnPortfolioPage = location.pathname === "/portfolio";

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleViewModeChange = (mode) => {
    if (isOnPortfolioPage) {
      // If on portfolio page, first navigate to dashboard then set view mode
      navigate("/dashboard");
    }
    setViewMode(mode);
  };

  // Handle click outside to close profile modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest(".profile-menu")) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  const ProfileModal = () => {
    return (
      <div className="fixed right-4 top-16 w-64 rounded-lg shadow-lg z-50 profile-menu bg-white">
        {/* User Info Section */}
        <div className="p-4 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-600">👤</span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">John Doe</h3>
            <p className="text-sm text-gray-500">john@example.com</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="border-t border-gray-100">
          <button
            onClick={() => {
              navigate(isOnPortfolioPage ? "/dashboard" : "/portfolio");
              setIsProfileOpen(false);
            }}
            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center text-gray-700"
          >
            <span className="mr-3">{isOnPortfolioPage ? "📊" : "👤"}</span>
            {isOnPortfolioPage ? "Dashboard" : "Portfolio"}
          </button>

          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center text-gray-700">
            <span className="mr-3">⚙️</span>
            Settings
          </button>

          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center text-gray-700">
            <span className="mr-3">❓</span>
            Help Center
          </button>

          <div className="border-t border-gray-100">
            <button className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center text-red-600">
              <span className="mr-3">🚪</span>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold">InvestSmart.ai</h1>
      </div>

      <div className="flex items-center space-x-6">
        <button
          onClick={() => handleViewModeChange("assets")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            viewMode === "assets"
              ? "bg-cyan-500 text-white"
              : " hover:bg-gray-300 "
          }`}
        >
          Assets
        </button>

        <button
          onClick={() => handleViewModeChange("wishlist")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            viewMode === "wishlist"
              ? "bg-cyan-500 text-white"
              : "hover:bg-gray-300"
          }`}
        >
          Watchlist
        </button>

        <button
          onClick={() => handleViewModeChange("chat")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            viewMode === "chat" ? "bg-cyan-500 text-white" : "hover:bg-gray-300"
          }`}
        >
          AI Insights
        </button>

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {isDarkMode ? "🌙" : "☀️"}
        </button>

        {/* Profile Button */}
        <div className="relative profile-menu">
          <button
            onClick={toggleProfile}
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <span className="text-sm">👤</span>
          </button>
          {isProfileOpen && <ProfileModal />}
        </div>
      </div>
    </header>
  );
};

export default Header;
