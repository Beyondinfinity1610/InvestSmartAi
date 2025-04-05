import React, { useState } from "react";
import { PlusCircle, Trash2, Eye, EyeOff, Check, X } from "lucide-react";

const PlatformIntegration = () => {
  // Sample connected platforms data
  const [connectedPlatforms, setConnectedPlatforms] = useState([
    {
      id: 1,
      name: "Kotak Securities",
      status: "connected",
      lastSync: "2 hours ago",
    },
    { id: 2, name: "DhanHQ", status: "connected", lastSync: "1 day ago" },
  ]);

  // Available platforms for integration
  const availablePlatforms = [
    { id: 1, name: "Kotak Securities", logo: "🔷" },
    { id: 2, name: "DhanHQ", logo: "🟢" },
    { id: 3, name: "Zerodha", logo: "🟠" },
    { id: 4, name: "Upstox", logo: "🟣" },
    { id: 5, name: "Angel One", logo: "🔶" },
  ];

  // API key management
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: "Kotak Securities API",
      key: "ks_api_12345678",
      isVisible: false,
    },
    { id: 2, name: "DhanHQ API", key: "dhq_api_87654321", isVisible: false },
  ]);

  // Modal states
  const [showAddPlatformModal, setShowAddPlatformModal] = useState(false);
  const [showAddApiKeyModal, setShowAddApiKeyModal] = useState(false);

  // Form states
  const [newApiKeyName, setNewApiKeyName] = useState("");
  const [newApiKeyValue, setNewApiKeyValue] = useState("");

  // Toggle API key visibility
  const toggleApiKeyVisibility = (id) => {
    setApiKeys(
      apiKeys.map((key) =>
        key.id === id ? { ...key, isVisible: !key.isVisible } : key
      )
    );
  };

  // Add a new API key
  const handleAddApiKey = () => {
    if (newApiKeyName && newApiKeyValue) {
      setApiKeys([
        ...apiKeys,
        {
          id: apiKeys.length + 1,
          name: newApiKeyName,
          key: newApiKeyValue,
          isVisible: false,
        },
      ]);
      setNewApiKeyName("");
      setNewApiKeyValue("");
      setShowAddApiKeyModal(false);
    }
  };

  // Remove API key
  const removeApiKey = (id) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id));
  };

  // Add a platform
  const addPlatform = (platform) => {
    const isAlreadyConnected = connectedPlatforms.some(
      (p) => p.name === platform.name
    );

    if (!isAlreadyConnected) {
      setConnectedPlatforms([
        ...connectedPlatforms,
        {
          id: platform.id,
          name: platform.name,
          status: "connected",
          lastSync: "Just now",
        },
      ]);
    }

    setShowAddPlatformModal(false);
  };

  // Remove a platform
  const removePlatform = (id) => {
    setConnectedPlatforms(
      connectedPlatforms.filter((platform) => platform.id !== id)
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Platform Integration
        </h2>

        {/* Connected Platforms Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Connected Platforms
            </h3>
            <button
              onClick={() => setShowAddPlatformModal(true)}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Add Platform
            </button>
          </div>

          {connectedPlatforms.length === 0 ? (
            <p className="text-gray-500 italic">No platforms connected yet.</p>
          ) : (
            <div className="bg-gray-50 rounded-md">
              {connectedPlatforms.map((platform) => (
                <div
                  key={platform.id}
                  className="flex items-center justify-between border-b border-gray-200 last:border-b-0 p-4"
                >
                  <div>
                    <div className="font-medium">{platform.name}</div>
                    <div className="text-sm text-gray-500">
                      Last synced: {platform.lastSync}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-4 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {platform.status}
                    </span>
                    <button
                      onClick={() => removePlatform(platform.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* API Keys Management Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">API Keys</h3>
            <button
              onClick={() => setShowAddApiKeyModal(true)}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Add API Key
            </button>
          </div>

          {apiKeys.length === 0 ? (
            <p className="text-gray-500 italic">No API keys added yet.</p>
          ) : (
            <div className="bg-gray-50 rounded-md">
              {apiKeys.map((apiKey) => (
                <div
                  key={apiKey.id}
                  className="flex items-center justify-between border-b border-gray-200 last:border-b-0 p-4"
                >
                  <div className="w-1/4">
                    <div className="font-medium">{apiKey.name}</div>
                  </div>
                  <div className="w-1/2 flex items-center">
                    <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                      {apiKey.isVisible ? apiKey.key : "•".repeat(16)}
                    </div>
                    <button
                      onClick={() => toggleApiKeyVisibility(apiKey.id)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      {apiKey.isVisible ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <button
                    onClick={() => removeApiKey(apiKey.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Platform Modal */}
      {showAddPlatformModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Add Investment Platform</h3>
              <button
                onClick={() => setShowAddPlatformModal(false)}
                className="text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-gray-600 mb-2">
                Select a platform to connect:
              </p>
              <div className="grid grid-cols-1 gap-2">
                {availablePlatforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => addPlatform(platform)}
                    className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50"
                  >
                    <span className="mr-2 text-xl">{platform.logo}</span>
                    <span>{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add API Key Modal */}
      {showAddApiKeyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Add API Key</h3>
              <button
                onClick={() => setShowAddApiKeyModal(false)}
                className="text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="apiName"
              >
                API Name
              </label>
              <input
                id="apiName"
                type="text"
                value={newApiKeyName}
                onChange={(e) => setNewApiKeyName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter API name"
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="apiKey"
              >
                API Key
              </label>
              <input
                id="apiKey"
                type="text"
                value={newApiKeyValue}
                onChange={(e) => setNewApiKeyValue(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter API key"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowAddApiKeyModal(false)}
                className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddApiKey}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <Check className="w-4 h-4 mr-1" /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformIntegration;
