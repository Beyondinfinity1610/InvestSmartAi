import React, { useState } from "react";
import {
  ShieldExclamationIcon,
  LockClosedIcon,
  TrashIcon,
} from "@heroicons/react/outline";

const PrivacyAndSecurity = ({ isDarkMode, toggleDarkMode }) => {
  const [dataPermissions, setDataPermissions] = useState({
    investmentPortfolio: true,
    spendingPatterns: false,
    dataSharing: false,
    marketingEmails: true,
    financialAlerts: true,
  });

  const [activeSessions, setActiveSessions] = useState([
    {
      id: 1,
      device: "Current Device - Chrome on macOS",
      location: "New York, USA",
      ip: "192.168.1.1",
      date: "Apr 5, 2025",
      isCurrent: true,
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "New York, USA",
      ip: "172.16.254.1",
      date: "Apr 4, 2025",
      isCurrent: false,
    },
    {
      id: 3,
      device: "Firefox on Windows",
      location: "Boston, USA",
      ip: "10.0.0.1",
      date: "Apr 2, 2025",
      isCurrent: false,
    },
  ]);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const handleTogglePermission = (permission) => {
    setDataPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }));
  };

  const handleRevokeSession = (sessionId) => {
    setActiveSessions((prev) =>
      prev.filter((session) => session.id !== sessionId)
    );
  };

  const handleRevokeAllOtherSessions = () => {
    setActiveSessions((prev) => prev.filter((session) => session.isCurrent));
  };

  return (
    <div className="space-y-8">
      {/* Data Permissions */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center mb-4">
          <ShieldExclamationIcon className="h-5 w-5 text-cyan-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">
            Data Permissions
          </h3>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Control what data you share with InvestSmart.ai and our partners.
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Investment Portfolio Data
              </p>
              <p className="text-xs text-gray-500">
                Allow us to analyze your portfolio for tailored insights
              </p>
            </div>
            <div>
              <button
                onClick={() => handleTogglePermission("investmentPortfolio")}
                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
                  dataPermissions.investmentPortfolio
                    ? "bg-cyan-500"
                    : "bg-gray-200"
                }`}
              >
                <span className="sr-only">
                  Toggle investment portfolio data
                </span>
                <span
                  className={`${
                    dataPermissions.investmentPortfolio
                      ? "translate-x-5"
                      : "translate-x-0"
                  } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                ></span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Spending Pattern Analysis
              </p>
              <p className="text-xs text-gray-500">
                Allow us to analyze your spending for financial recommendations
              </p>
            </div>
            <div>
              <button
                onClick={() => handleTogglePermission("spendingPatterns")}
                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
                  dataPermissions.spendingPatterns
                    ? "bg-cyan-500"
                    : "bg-gray-200"
                }`}
              >
                <span className="sr-only">
                  Toggle spending pattern analysis
                </span>
                <span
                  className={`${
                    dataPermissions.spendingPatterns
                      ? "translate-x-5"
                      : "translate-x-0"
                  } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                ></span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Data Sharing with Partners
              </p>
              <p className="text-xs text-gray-500">
                Allow us to share anonymized data with trusted partners
              </p>
            </div>
            <div>
              <button
                onClick={() => handleTogglePermission("dataSharing")}
                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
                  dataPermissions.dataSharing ? "bg-cyan-500" : "bg-gray-200"
                }`}
              >
                <span className="sr-only">Toggle data sharing</span>
                <span
                  className={`${
                    dataPermissions.dataSharing
                      ? "translate-x-5"
                      : "translate-x-0"
                  } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                ></span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Marketing Communications
              </p>
              <p className="text-xs text-gray-500">
                Receive personalized investment tips and product updates
              </p>
            </div>
            <div>
              <button
                onClick={() => handleTogglePermission("marketingEmails")}
                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
                  dataPermissions.marketingEmails
                    ? "bg-cyan-500"
                    : "bg-gray-200"
                }`}
              >
                <span className="sr-only">Toggle marketing emails</span>
                <span
                  className={`${
                    dataPermissions.marketingEmails
                      ? "translate-x-5"
                      : "translate-x-0"
                  } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                ></span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Financial Alerts
              </p>
              <p className="text-xs text-gray-500">
                Receive important alerts about your portfolio and markets
              </p>
            </div>
            <div>
              <button
                onClick={() => handleTogglePermission("financialAlerts")}
                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
                  dataPermissions.financialAlerts
                    ? "bg-cyan-500"
                    : "bg-gray-200"
                }`}
              >
                <span className="sr-only">Toggle financial alerts</span>
                <span
                  className={`${
                    dataPermissions.financialAlerts
                      ? "translate-x-5"
                      : "translate-x-0"
                  } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Session Management */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center mb-4">
          <LockClosedIcon className="h-5 w-5 text-cyan-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Active Sessions</h3>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          These are devices that have logged into your account. Revoke any
          sessions that you don't recognize.
        </p>

        <div className="mt-4 divide-y divide-gray-200">
          {activeSessions.map((session) => (
            <div
              key={session.id}
              className="py-4 flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {session.device}
                </p>
                <p className="text-xs text-gray-500">
                  {session.ip} · {session.location} · {session.date}
                </p>
              </div>
              <div>
                {session.isCurrent ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Current
                  </span>
                ) : (
                  <button
                    onClick={() => handleRevokeSession(session.id)}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Revoke
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {activeSessions.length > 1 && (
          <div className="mt-6">
            <button
              onClick={handleRevokeAllOtherSessions}
              className="text-sm font-medium text-red-600 hover:text-red-500"
            >
              Sign out of all other sessions
            </button>
          </div>
        )}
      </div>

      {/* Delete Account */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center mb-4">
          <TrashIcon className="h-5 w-5 text-red-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Delete Account</h3>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Permanently delete your account and all associated data. This action
          cannot be undone.
        </p>

        {!showDeleteConfirmation ? (
          <div>
            <button
              onClick={() => setShowDeleteConfirmation(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete Account
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ShieldExclamationIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Warning</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>
                      This will permanently delete your account, all your saved
                      data, investment preferences, and historical data. This
                      action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="delete-confirm"
                className="block text-sm font-medium text-gray-700"
              >
                Type "DELETE" to confirm
              </label>
              <input
                type="text"
                id="delete-confirm"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Cancel
              </button>
              <button
                disabled={deleteConfirmText !== "DELETE"}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                  deleteConfirmText === "DELETE"
                    ? "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    : "bg-red-300 cursor-not-allowed"
                }`}
              >
                Permanently Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivacyAndSecurity;
