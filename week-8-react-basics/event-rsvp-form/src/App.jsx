import { useState } from 'react'
import './App.css'

const MIN_NAME_LENGHT = 2;
const MIN_TEXT_LENGHT = 10;

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [numAttendees, setNumAttendees] = useState(1);
  const [dietPref, setDietPref] = useState('');
  const [isWithGuest, setIsWithGuest] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [isError, setIsError] = useState(false)

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function handleBlur(e, minLen) {
    const input = e.target.value;
    if (input.length < minLen) {
      setIsError(true);
    } else {
      setIsError(false)
    }
  }
  // const clearFields = () => {
  //   setName('');
  //   setEmail('');
  //   setNumAttendees(0);
  //   setDietPref('');
  //   setIsWithGuest(false);
  //   setIsError(false)
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.length >= MIN_NAME_LENGHT && 
      !validateEmail(email) &&
      !dietPref.length >= MIN_TEXT_LENGHT) {
        setIsError(true);
        console.log(isError)
      } else {
        setIsFormSubmitted(true)
        // clearFields();
      }
  }

  return (
    <main>
      <form method='post' onSubmit={handleSubmit}>
        <h1>Event RSVP Form</h1>
        <label htmlFor="name">
          <span>Name:</span>
          {isError === true && <small className='error-msg'>required, min 2 characters</small>}
        </label>
        <input type="text" id="name" value={name} 
        onBlur={(e) => handleBlur(e, MIN_NAME_LENGHT)}
        onChange={e => setName(e.target.value)}
        required/>
          
        <label htmlFor="email">
          <span>Email:</span>
          {isError === true && <small className='error-msg'>required, must be valid format</small>}
        </label>
        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required/>
      
        <label htmlFor="number">
          <span>Number of Attendees:</span>
        </label>
        <input type="number" id="number" value={numAttendees} min={1}
          onChange={e => setNumAttendees(e.target.value)} required/>
        
        <label htmlFor="dietPref">
          <span>Dietary Preferences:</span>
          {isError === true && <small className='error-msg'>required, min 15 characters</small>}
          </label>
          <textarea rows={4} id="dietPref" value={dietPref} onChange={e => setDietPref(e.target.value)} required/>
        
        <div className="checkbox-container">
          <label htmlFor="xtraGuest">Bringing additional guests? </label>
          <input type="checkbox" id="xtraGuest" value={isWithGuest} onChange={e => setIsWithGuest(e.target.value)} />
        </div>
        <button className='btn' type='submit'>Submit RSVP</button>
      </form>
      {isFormSubmitted && 
        <div className="feedback-container">
        <h2>RSVP Submitted!</h2>
        <p><span className='fb-header'>{name}:</span></p>
        <p><span className='fb-header'>{email}:</span></p>
        <p><span className='fb-header'>{numAttendees}:</span></p>
        <p><span className='fb-header'>{dietPref}:</span></p>
        <p><span className='fb-header'>{isWithGuest ? 'Yes' : 'No'}:</span></p>
      </div>  
      }
    </main>
  )
}

export default App
