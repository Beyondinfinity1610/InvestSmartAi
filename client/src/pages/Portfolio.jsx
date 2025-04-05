import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Slider from "./Slider";

const Portfolio = ({ isDarkMode, toggleDarkMode }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [viewMode, setViewMode] = useState("assets");
  const [selectedSource, setSelectedSource] = useState("portfolio");
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [showWishlistEditor, setShowWishlistEditor] = useState(false);
  const [retirementAge, setRetirementAge] = useState("");
  const [wealthGoal, setWealthGoal] = useState("");
  const [riskLevel, setRiskLevel] = useState(2); // Default to medium risk
  const title = "Portfolio";
  const navigate = useNavigate();

  // Calculate risk level based on retirement age and wealth goal
  const calculateRiskLevel = (age, goal) => {
    if (!age || !goal) return 2; // Default to medium risk if either value is missing

    const ageNum = parseInt(age);
    const goalNum = parseInt(goal);
    
    // Risk level calculation based on age and goal
    if (ageNum < 40 && goalNum > 1000000) {
      return 4; // Very High Risk - Young age with high wealth goal
    } else if (ageNum < 50 && goalNum > 500000) {
      return 3; // High Risk - Middle age with significant wealth goal
    } else if (ageNum < 60 && goalNum > 250000) {
      return 2; // Medium Risk - Approaching retirement with moderate goal
    } else if (ageNum >= 60) {
      return 1; // Low Risk - Near or at retirement age
    } else {
      return 2; // Default to Medium Risk
    }
  };

  // Handle retirement age change
  const handleRetirementAgeChange = (e) => {
    const value = e.target.value;
    setRetirementAge(value);
    if (value && wealthGoal) {
      setRiskLevel(calculateRiskLevel(value, wealthGoal));
    }
  };

  // Handle wealth goal change
  const handleWealthGoalChange = (e) => {
    const value = e.target.value;
    setWealthGoal(value);
    if (value && retirementAge) {
      setRiskLevel(calculateRiskLevel(retirementAge, value));
    }
  };

  const userData = {
    personal: {
      name: "John Doe",
      email: "john@example.com",
      joinDate: "January 2024",
      location: "New York, USA",
      occupation: "Software Engineer",
    },
    financial: {
      riskTolerance: "Moderate",
      investmentGoals: ["Retirement", "Wealth Growth"],
      preferredSectors: ["Technology", "Healthcare", "Green Energy"],
      investmentHorizon: "5-10 years",
      monthlyInvestment: "$2,000",
      totalPortfolioValue: "$49,825.82",
    },
    statistics: {
      totalTrades: 145,
      successRate: "68%",
      avgHoldingPeriod: "8 months",
      bestPerformance: "+45.2% (TECH)",
      worstPerformance: "-12.8% (BOND)",
    },
  };

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  

  useEffect(() => {
    const closeProfile = (e) => {
      if (isProfileOpen && !e.target.closest(".profile-menu")) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("click", closeProfile);
    return () => document.removeEventListener("click", closeProfile);
  }, [isProfileOpen]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

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
        toggleProfile={toggleProfile}
        isProfileOpen={isProfileOpen}
      />

      <AnimatePresence>{isProfileOpen && <ProfileModal />}</AnimatePresence>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="max-w-[1920px] mx-auto px-6 py-8"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-light">Profile & Portfolio</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/portfolio-setup")}
            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Edit Profile
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            {
              title: "Personal Information",
              content: (
                <>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-3xl">
                      👤
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">
                        {userData.personal.name}
                      </h3>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {userData.personal.email}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">
                        {userData.personal.location}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="font-medium">
                        {userData.personal.joinDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Occupation</p>
                      <p className="font-medium">
                        {userData.personal.occupation}
                      </p>
                    </div>
                  </div>
                </>
              ),
            },
            {
              title: "Financial Profile",
              content: (
                <>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Risk Tolerance</p>
                      <p className="font-medium">
                        {userData.financial.riskTolerance}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Investment Horizon
                      </p>
                      <p className="font-medium">
                        {userData.financial.investmentHorizon}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Monthly Investment
                      </p>
                      <p className="font-medium">
                        {userData.financial.monthlyInvestment}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Total Portfolio Value
                      </p>
                      <p className="font-medium">
                        {userData.financial.totalPortfolioValue}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className="text-sm text-gray-500 mb-2">
                      Preferred Sectors
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {userData.financial.preferredSectors.map(
                        (sector, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1 rounded-full text-sm ${
                              isDarkMode ? "bg-gray-700" : "bg-gray-200"
                            }`}
                          >
                            {sector}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </>
              ),
            },
            {
              title: "Trading Statistics",
              content: (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Total Trades</p>
                    <p className="font-medium">
                      {userData.statistics.totalTrades}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Success Rate</p>
                    <p className="font-medium">
                      {userData.statistics.successRate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Avg. Holding Period</p>
                    <p className="font-medium">
                      {userData.statistics.avgHoldingPeriod}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Best Performance</p>
                    <p className="font-medium text-green-500">
                      {userData.statistics.bestPerformance}
                    </p>
                  </div>
                </div>
              ),
            },
            {
              title: "Investment Goals",
              content: (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2" >
                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-700/50" : "bg-gray-100"
                    }`}
                  >
                    <h3 className="font-medium mb-2">Retirement</h3>
                    <label className="block text-sm mb-1 text-gray-500">
                      Desired Retirement Age:
                    </label>
                    <input
                      type="number"
                      value={retirementAge}
                      onChange={handleRetirementAgeChange}
                      className={`w-full px-3 py-2 rounded-md border outline-none ${
                        isDarkMode
                          ? "bg-gray-800 text-white border-gray-600"
                          : "bg-white text-black border-gray-300"
                      }`}
                      placeholder="Enter age"
                    />
                  </div>

                  <div
                    className={`p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-700/50" : "bg-gray-100"
                    }`}
                  >
                    <h3 className="font-medium mb-2">Wealth Growth</h3>
                    <label className="block text-sm mb-1 text-gray-500">
                      Target Amount ($):
                    </label>
                    <input
                      type="number"
                      value={wealthGoal}
                      onChange={handleWealthGoalChange}
                      className={`w-full px-3 py-2 rounded-md border outline-none ${
                        isDarkMode
                          ? "bg-gray-800 text-white border-gray-600"
                          : "bg-white text-black border-gray-300"
                      }`}
                      placeholder="e.g. 1000000"
                    />
                  </div>
                    </div>
                  <div>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="px-6 pb-12"
                  >
                    <Slider 
                      riskLevel={riskLevel} 
                      setRiskLevel={setRiskLevel}
                      retirementAge={retirementAge}
                      wealthGoal={wealthGoal}
                    />
                    </motion.div>
                    </div>
                </div>
              ),
            },
          ].map((section, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
              className={`p-6 rounded-xl ${
                isDarkMode ? "bg-gray-800/50" : "bg-gray-50"
              }`}
            >
              <h2 className="text-xl font-medium mb-6">{section.title}</h2>
              {section.content}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Portfolio;
