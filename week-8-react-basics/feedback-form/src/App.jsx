import { useState } from 'react'
import './App.css'

const MAX_LENGTH = 25;

function App() {
  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [message, setMessage] = useState('')
  const [outline, setOutline] = useState('') //new code

  const [showThanks, setShowThanks] = useState(false);

  // New code: to handle message and the outline color
  const handleText = (e) => {
    const input = e.target.value.slice(0, MAX_LENGTH)
    setMessage(input)
    if (message.length <= MAX_LENGTH*45/100) setOutline('green')
    else if (message.length <= MAX_LENGTH*80/100) setOutline('orange')
    else setOutline('red')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowThanks(true);

    setTimeout(() => {
      setShowThanks(false);
      setName('');
      setRating(5);
      setMessage('');
    }, 3000);
  };

  return (
    <main>
       {showThanks && (
  <div className="thanks-banner">Thanks for your feedback, {name.toUpperCase()}!</div>
)}
    <form id='form' onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <input type="text" id="name" 
        value={name} 
        onChange={({target: {value}}) => setName(value)} required/>
      
      <label htmlFor="rating">Rating: </label>
        <input type="number" 
        min={1} max={5}
        id="rating" 
        value={rating} 
        onChange={({target: {value}}) => setRating(Number((value)))} />
      
      <label htmlFor="message">Enter your message: </label>

      <textarea name="message" 
      style={{outline: `2px solid ${outline}`}}
      id="message" 
      rows={4}
      value={message} 
      onChange={handleText} //the handleText works fine
      required></textarea>
      <div className='char-container'>
        <p className="counter-class">Char: {message.length} / {MAX_LENGTH}</p>
        {message.length <= MAX_LENGTH*80/100 && <p className='counter-class'>reaching limit</p>}
      </div>

      <button disabled={!(name.trim()) || !(message.trim())} 
      type='submit' 
      className="btn">Submit Feedback</button>
    </form>

    <div className='feedback'>
      <h2> {"["} ------ Feedback ------ {"]"} </h2>
      <p className='name'><span className='fb-header'>Name:</span>{name.toUpperCase()}</p>
      <p className='rating'><span className='fb-header'>Rating:</span> {rating}</p>
      <p className='feedback'><span className='fb-header'>Message:</span> {message}</p>
    </div>
    </main>
  )
}

export default App
