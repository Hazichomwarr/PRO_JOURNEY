import { useState } from 'react'
import './App.css'

function App () {

  const [color, setColor] = useState('#ffffff');

  const newBgColor = (e) => {
    setColor(e.target.value);
    // console.log(color)
  }
  return (
    <div id="color-picker-container" 
    style={{backgroundColor: color}}>
      <input type="color" id='color-input' 
      onChange={newBgColor} 
      value={color}
      />
    </div>
  )
}

export default App
