import { useState } from 'react'

function App() {

  const [isVisible, setIsVisible] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  }

  const handleModeTheme = () => {
    setIsLightMode(!isLightMode)
  }
  return (
    <div id="toggle-container" className={`${isLightMode ? 'light-mode' : 'dark-mode'}`}>
      <button onClick={handleToggleVisibility} className="toggle-button">
        {isVisible ? "Hide Message" : "Show Message"}
      </button>
      
      {isVisible && <p id="message">I love freeCodeCamp!</p>}

      <button onClick={handleModeTheme} className="toggle-button">
       {isLightMode ? "Switch to Light Mode" : "Switch to Dark Mode" }
      </button>
    </div>
  );
};


export default App
