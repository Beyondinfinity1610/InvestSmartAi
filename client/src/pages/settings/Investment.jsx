import React, { useState } from "react";
import {
  CashIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ClockIcon,
} from "@heroicons/react/outline";

const InvestmentPreferences = () => {
  const [investmentPrefs, setInvestmentPrefs] = useState({
    riskTolerance: "moderate",
    investmentHorizon: "medium",
    investmentCategories: ["stocks", "etfs"],
    currencyPreference: "usd",
  });

  const handleInvestmentPrefChange = (e) => {
    const { name, value } = e.target;
    setInvestmentPrefs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setInvestmentPrefs((prev) => {
      if (checked) {
        return {
          ...prev,
          investmentCategories: [...prev.investmentCategories, value],
        };
      } else {
        return {
          ...prev,
          investmentCategories: prev.investmentCategories.filter(
            (cat) => cat !== value
          ),
        };
      }
    });
  };

  const resetToDefaults = () => {
    setInvestmentPrefs({
      riskTolerance: "moderate",
      investmentHorizon: "medium",
      investmentCategories: ["stocks", "etfs"],
      currencyPreference: "usd",
    });
  };

  return (
    <div className="space-y-8">
      {/* Risk Tolerance */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center mb-4">
          <ChartBarIcon className="h-5 w-5 text-cyan-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Risk Tolerance</h3>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Define your comfort level with investment risk. This helps us tailor
          recommendations to match your risk profile.
        </p>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              id="risk-low"
              name="riskTolerance"
              type="radio"
              value="low"
              checked={investmentPrefs.riskTolerance === "low"}
              onChange={handleInvestmentPrefChange}
              className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300"
            />
            <label
              htmlFor="risk-low"
              className="ml-3 block text-sm text-gray-700"
            >
              <span className="font-medium">Low Risk</span>
              <p className="text-xs text-gray-500 mt-1">
                Focus on capital preservation with modest returns. Minimal
                fluctuations in portfolio value.
              </p>
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="risk-moderate"
              name="riskTolerance"
              type="radio"
              value="moderate"
              checked={investmentPrefs.riskTolerance === "moderate"}
              onChange={handleInvestmentPrefChange}
              className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300"
            />
            <label
              htmlFor="risk-moderate"
              className="ml-3 block text-sm text-gray-700"
            >
              <span className="font-medium">Moderate Risk</span>
              <p className="text-xs text-gray-500 mt-1">
                Balance between growth and safety. Accepts some volatility for
                better long-term returns.
              </p>
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="risk-high"
              name="riskTolerance"
              type="radio"
              value="high"
              checked={investmentPrefs.riskTolerance === "high"}
              onChange={handleInvestmentPrefChange}
              className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300"
            />
            <label
              htmlFor="risk-high"
              className="ml-3 block text-sm text-gray-700"
            >
              <span className="font-medium">High Risk</span>
              <p className="text-xs text-gray-500 mt-1">
                Prioritize growth and higher returns. Comfortable with
                significant market fluctuations.
              </p>
            </label>
          </div>
        </div>
      </div>

      {/* Investment Horizon */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center mb-4">
          <ClockIcon className="h-5 w-5 text-cyan-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">
            Investment Horizon
          </h3>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Specify your intended investment timeframe to help us optimize your
          investment strategy.
        </p>

        <div>
          <label
            htmlFor="investmentHorizon"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select your investment horizon
          </label>
          <select
            id="investmentHorizon"
            name="investmentHorizon"
            value={investmentPrefs.investmentHorizon}
            onChange={handleInvestmentPrefChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md"
          >
            <option value="short">Short-term (1-3 years)</option>
            <option value="medium">Medium-term (3-7 years)</option>
            <option value="long">Long-term (7+ years)</option>
            <option value="retirement">Retirement Planning (15+ years)</option>
          </select>
        </div>
      </div>

      {/* Asset Classes */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center mb-4">
          <CashIcon className="h-5 w-5 text-cyan-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">
            Preferred Asset Classes
          </h3>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Select the types of investments you're interested in. You can choose
          multiple options.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              id="cat-stocks"
              name="investmentCategories"
              type="checkbox"
              value="stocks"
              checked={investmentPrefs.investmentCategories.includes("stocks")}
              onChange={handleCategoryChange}
              className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
            />
            <label
              htmlFor="cat-stocks"
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              Stocks
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="cat-bonds"
              name="investmentCategories"
              type="checkbox"
              value="bonds"
              checked={investmentPrefs.investmentCategories.includes("bonds")}
              onChange={handleCategoryChange}
              className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
            />
            <label
              htmlFor="cat-bonds"
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              Bonds
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="cat-etfs"
              name="investmentCategories"
              type="checkbox"
              value="etfs"
              checked={investmentPrefs.investmentCategories.includes("etfs")}
              onChange={handleCategoryChange}
              className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
            />
            <label
              htmlFor="cat-etfs"
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              ETFs
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="cat-mutual-funds"
              name="investmentCategories"
              type="checkbox"
              value="mutual-funds"
              checked={investmentPrefs.investmentCategories.includes(
                "mutual-funds"
              )}
              onChange={handleCategoryChange}
              className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
            />
            <label
              htmlFor="cat-mutual-funds"
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              Mutual Funds
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="cat-crypto"
              name="investmentCategories"
              type="checkbox"
              value="crypto"
              checked={investmentPrefs.investmentCategories.includes("crypto")}
              onChange={handleCategoryChange}
              className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
            />
            <label
              htmlFor="cat-crypto"
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              Cryptocurrency
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="cat-real-estate"
              name="investmentCategories"
              type="checkbox"
              value="real-estate"
              checked={investmentPrefs.investmentCategories.includes(
                "real-estate"
              )}
              onChange={handleCategoryChange}
              className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
            />
            <label
              htmlFor="cat-real-estate"
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              Real Estate
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="cat-commodities"
              name="investmentCategories"
              type="checkbox"
              value="commodities"
              checked={investmentPrefs.investmentCategories.includes(
                "commodities"
              )}
              onChange={handleCategoryChange}
              className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
            />
            <label
              htmlFor="cat-commodities"
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              Commodities
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="cat-alternative"
              name="investmentCategories"
              type="checkbox"
              value="alternative"
              checked={investmentPrefs.investmentCategories.includes(
                "alternative"
              )}
              onChange={handleCategoryChange}
              className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
            />
            <label
              htmlFor="cat-alternative"
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              Alternative Investments
            </label>
          </div>
        </div>
      </div>

      {/* Currency Preferences */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center mb-4">
          <CurrencyDollarIcon className="h-5 w-5 text-cyan-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">
            Currency Preferences
          </h3>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Choose your preferred currency for displaying investment values and
          returns.
        </p>

        <div>
          <label
            htmlFor="currencyPreference"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select your preferred currency
          </label>
          <select
            id="currencyPreference"
            name="currencyPreference"
            value={investmentPrefs.currencyPreference}
            onChange={handleInvestmentPrefChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md"
          >
            <option value="usd">USD (US Dollar)</option>
            <option value="inr">INR (Indian Rupee)</option>
            <option value="eur">EUR (Euro)</option>
            <option value="gbp">GBP (British Pound)</option>
            <option value="jpy">JPY (Japanese Yen)</option>
            <option value="cad">CAD (Canadian Dollar)</option>
            <option value="aud">AUD (Australian Dollar)</option>
            <option value="sgd">SGD (Singapore Dollar)</option>
          </select>
        </div>
      </div>

      {/* Save Preferences */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={resetToDefaults}
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          Reset to Default
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default InvestmentPreferences;
