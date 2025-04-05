import React, { useState } from "react";

const WishlistEditorModal = ({ onClose, isDarkMode, wishlistData }) => {

  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div
        className={`${
          isDarkMode ? "bg-gray-800/95" : "bg-white/95"
        } rounded-xl p-6 w-full max-w-2xl mx-4 shadow-xl backdrop-blur-sm`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Edit Watchlist</h2>
          <button
            onClick={onClose}
            className={`text-gray-500 hover:text-gray-700 p-2 rounded-lg ${
              isDarkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-100/50"
            }`}
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Add Stock Form */}
          <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-gray-100/50"}`}>
            <h3 className="font-medium mb-3">Add New Stock</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Stock Symbol"
                className={`px-3 py-2 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-600 border-gray-500 text-gray-100"
                    : "bg-white border-gray-200 text-gray-800"
                } border focus:outline-none focus:ring-2 focus:ring-cyan-500`}
              />
              <input
                type="number"
                placeholder="Target Price"
                className={`px-3 py-2 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-600 border-gray-500 text-gray-100"
                    : "bg-white border-gray-200 text-gray-800"
                } border focus:outline-none focus:ring-2 focus:ring-cyan-500`}
              />
            </div>
            <button className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
              Add to Watchlist
            </button>
          </div>

          {/* Current Watchlist */}
          <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-gray-100/50"}`}>
            <h3 className="font-medium mb-3">Current Watchlist</h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {wishlistData?.items.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    isDarkMode ? "bg-gray-600/30" : "bg-gray-200/30"
                  }`}
                >
                  <div>
                    <span className="font-medium">{item.symbol}</span>
                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"} ml-2`}>
                      Target: ${item.targetPrice}
                    </span>
                  </div>
                  <button className="text-red-500 hover:text-red-600 px-3 py-1 rounded-lg hover:bg-red-500/10 transition-colors">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isDarkMode
                ? "bg-gray-700/50 hover:bg-gray-600/50"
                : "bg-gray-100/50 hover:bg-gray-200/50"
            }`}
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistEditorModal;
