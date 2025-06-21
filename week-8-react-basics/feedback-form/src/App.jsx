import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [message, setMessage] = useState('')

  const [showThanks, setShowThanks] = useState(false);

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


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert(`Thanks for your feddback ${name.toUpperCase()}!`)
  // }

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
      id="message" 
      rows={4}
      value={message} 
      onChange={({target: {value}}) => setMessage(value)}
      required></textarea>
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
