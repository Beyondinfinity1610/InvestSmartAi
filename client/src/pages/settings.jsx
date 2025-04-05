import Account from "./settings/Accounts"
import Privacy from "./settings/Privacy"
import InvestmentPreferences from "./settings/Investment";
import Platform from "./settings/Platform"

function settings({ isDarkMode, toggleDarkMode }) {
  return (
    <div>
      <Account isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Privacy isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <InvestmentPreferences isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <Platform />
    </div>
  );
}

export default settings;