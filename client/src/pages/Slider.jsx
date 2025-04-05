import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Slider = ({ riskLevel, setRiskLevel, retirementAge, wealthGoal }) => {
  const riskProfiles = [
    {
      level: "Very Low Risk",
      description: "Preserve capital with minimal growth and risk.",
      recommendations: [
        "Money Market Funds",
        "Treasury Bonds",
        "CDs",
        "High-Yield Savings",
      ],
      returns: "1-3%",
      volatility: "Very Low",
      horizon: "1-2 Yrs",
    },
    {
      level: "Low Risk",
      description: "Cautious growth with limited exposure to risk.",
      recommendations: [
        "Government Bonds",
        "Municipal Bonds",
        "Dividend Stocks",
      ],
      returns: "3-6%",
      volatility: "Low",
      horizon: "2-4 Yrs",
    },
    {
      level: "Medium Risk",
      description: "Balanced growth with moderate volatility.",
      recommendations: [
        "Index Funds",
        "Balanced Funds",
        "Corporate Bonds",
        "REITs",
      ],
      returns: "6-10%",
      volatility: "Medium",
      horizon: "3-7 Yrs",
    },
    {
      level: "High Risk",
      description: "Higher return potential with increased risk.",
      recommendations: ["Growth Stocks", "Small Caps", "Emerging Markets"],
      returns: "8-15%",
      volatility: "High",
      horizon: "5-10 Yrs",
    },
    {
      level: "Very High Risk",
      description: "Aggressive strategy with high reward and risk.",
      recommendations: ["Crypto", "Tech Stocks", "Private Equity"],
      returns: "10-25%+",
      volatility: "Very High",
      horizon: "7-15+ Yrs",
    },
  ];

  const colors = ["#10B981", "#34D399", "#F59E0B", "#F97316", "#EF4444"];
  const currentProfile = riskProfiles[riskLevel];

  // Calculate recommended allocation based on risk level
  const getRecommendedAllocation = () => {
    if (!retirementAge || !wealthGoal) return "Please enter your retirement age and wealth goal";

    const ageNum = parseInt(retirementAge);
    const goalNum = parseInt(wealthGoal);
    const yearsToRetirement = Math.max(0, ageNum - new Date().getFullYear());

    if (yearsToRetirement <= 0) {
      return "Consider a conservative portfolio focused on capital preservation";
    }

    const monthlyContribution = goalNum / (yearsToRetirement * 12);
    return `Recommended monthly contribution: $${monthlyContribution.toFixed(2)}`;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
      <h1 className="text-center text-2xl font-bold text-blue-600 mb-2">
        Investment Risk Profile
      </h1>

      <h2
        className="text-center text-xl font-semibold mb-6"
        style={{ color: colors[riskLevel] }}
      >
        {currentProfile.level}
      </h2>

      {/* Slider */}
      <div className="mb-4 relative">
        <input
          type="range"
          min="0"
          max="4"
          value={riskLevel}
          onChange={(e) => setRiskLevel(parseInt(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
          <span>Very Low</span>
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
          <span>Very High</span>
        </div>
      </div>

      {/* Description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={riskLevel}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-50 p-4 rounded-md text-gray-800 mb-4"
        >
          {currentProfile.description}
        </motion.div>
      </AnimatePresence>

      {/* Recommendations */}
      <motion.div layout className="flex flex-wrap gap-2 mb-6 justify-center">
        {currentProfile.recommendations.map((rec, index) => (
          <motion.span
            key={index}
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full"
          >
            {rec}
          </motion.span>
        ))}
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div
          className="border-l-4 rounded p-3"
          style={{ borderColor: "#10B981" }}
        >
          <div className="text-gray-500 text-sm">Return</div>
          <div className="font-bold">{currentProfile.returns}</div>
        </div>
        <div
          className="border-l-4 rounded p-3"
          style={{ borderColor: "#F59E0B" }}
        >
          <div className="text-gray-500 text-sm">Volatility</div>
          <div className="font-bold">{currentProfile.volatility}</div>
        </div>
        <div
          className="border-l-4 rounded p-3"
          style={{ borderColor: "#3B82F6" }}
        >
          <div className="text-gray-500 text-sm">Horizon</div>
          <div className="font-bold">{currentProfile.horizon}</div>
        </div>
      </div>

      {/* Recommended Allocation */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Recommended Allocation</h3>
        <p className="text-blue-600">{getRecommendedAllocation()}</p>
      </div>
    </div>
  );
};

export default Slider;
