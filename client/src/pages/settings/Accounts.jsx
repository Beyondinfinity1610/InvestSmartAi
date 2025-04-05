import React, { useState } from "react";
import {
  LockClosedIcon,
  ShieldCheckIcon,
  LinkIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";

const AccountManagement = ({ isDarkMode, toggleDarkMode }) => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [linkedAccounts, setLinkedAccounts] = useState([
    {
      id: 1,
      name: "Chase Banking",
      type: "Bank",
      connected: true,
      lastSync: "2025-04-03",
    },
    {
      id: 2,
      name: "Vanguard",
      type: "Investment",
      connected: true,
      lastSync: "2025-04-01",
    },
  ]);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitPersonalInfo = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Updated personal info:", personalInfo);
    // Show success message or handle API call
  };

  const handleDisconnectAccount = (accountId) => {
    // Handle account disconnection
    setLinkedAccounts((prev) =>
      prev.map((account) =>
        account.id === accountId ? { ...account, connected: false } : account
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Profile Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center mb-4">
          <UserCircleIcon className="h-5 w-5 text-cyan-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">
            Profile Information
          </h3>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Update your personal information and how we can contact you.
        </p>

        <form onSubmit={handleSubmitPersonalInfo}>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={personalInfo.firstName}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={personalInfo.lastName}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={personalInfo.email}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={personalInfo.phone}
                onChange={handlePersonalInfoChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Password Management */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center mb-4">
          <LockClosedIcon className="h-5 w-5 text-cyan-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">
            Password Management
          </h3>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Update your password or reset it if you've forgotten.
        </p>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="current-password"
              className="block text-sm font-medium text-gray-700"
            >
              Current password
            </label>
            <input
              type="password"
              name="current-password"
              id="current-password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700"
            >
              New password
            </label>
            <input
              type="password"
              name="new-password"
              id="new-password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm new password
            </label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center mb-4">
          <ShieldCheckIcon className="h-5 w-5 text-cyan-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">
            Two-Factor Authentication
          </h3>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Add an extra layer of security to your account by enabling two-factor
          authentication.
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">
              Two-Factor Authentication
            </p>
            <p className="text-xs text-gray-500">
              {twoFactorEnabled
                ? "Your account is currently protected with 2FA"
                : "Enable 2FA to increase your account security"}
            </p>
          </div>
          <div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${
                twoFactorEnabled ? "bg-cyan-500" : "bg-gray-200"
              }`}
            >
              <span className="sr-only">Toggle 2FA</span>
              <span
                className={`${
                  twoFactorEnabled ? "translate-x-5" : "translate-x-0"
                } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
              ></span>
            </button>
          </div>
        </div>

        {twoFactorEnabled && (
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-4">
              Recovery codes
            </h4>
            <p className="text-sm text-gray-500 mb-4">
              Save these recovery codes in a secure place. They can be used to
              recover access to your account if you lose your 2FA device.
            </p>
            <div className="bg-gray-50 p-4 rounded-md font-mono text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div>ABCD-1234-EFGH</div>
                <div>IJKL-5678-MNOP</div>
                <div>QRST-9012-UVWX</div>
                <div>YZ12-3456-7890</div>
              </div>
            </div>
            <div className="mt-4">
              <button className="text-sm text-cyan-600 hover:text-cyan-500">
                Download codes
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Linked Accounts */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center mb-4">
          <LinkIcon className="h-5 w-5 text-cyan-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Linked Accounts</h3>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Manage your connected financial platforms and accounts.
        </p>

        <div className="mt-4 divide-y divide-gray-200">
          {linkedAccounts.map((account) => (
            <div
              key={account.id}
              className="py-4 flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {account.name}
                </p>
                <p className="text-xs text-gray-500">
                  {account.type} ·{" "}
                  {account.connected
                    ? `Last synced: ${account.lastSync}`
                    : "Disconnected"}
                </p>
              </div>
              <div>
                {account.connected ? (
                  <button
                    onClick={() => handleDisconnectAccount(account.id)}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Disconnect
                  </button>
                ) : (
                  <button className="text-xs text-cyan-600 hover:text-cyan-700">
                    Reconnect
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
            Connect New Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
