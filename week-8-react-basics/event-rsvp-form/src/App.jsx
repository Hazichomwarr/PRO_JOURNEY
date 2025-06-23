import { useState } from "react";
import "./App.css";

const MIN_NAME_LENGHT = 2;
const MIN_TEXT_LENGHT = 10;

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [numAttendees, setNumAttendees] = useState(1);
  const [dietPref, setDietPref] = useState("");
  const [isWithGuest, setIsWithGuest] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [errorMsgName, setErrorMsgName] = useState("");
  const [errorMsgEmail, setErrorMsgEmail] = useState("");
  const [errorMsgText, setErrorMsgText] = useState("");

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const inputErrorMsg = (type, val) => {
    if (type === "text") {
      if (val.length < MIN_NAME_LENGHT) {
        setErrorMsgName(`Required, min ${MIN_NAME_LENGHT} characters.`);
      } else {
        setErrorMsgName("");
      }
    }
    if (type === "email") {
      if (!validateEmail(val)) {
        setErrorMsgEmail(`Invalid, enter valid format.`);
      } else {
        setErrorMsgEmail("");
      }
    }
    if (type === "textarea") {
      if (val.length < MIN_TEXT_LENGHT) {
        setErrorMsgText(`Required, min ${MIN_TEXT_LENGHT} characters.`);
      } else {
        setErrorMsgText("");
      }
    }
  };

  function handleBlur(e) {
    const inputType = e.target.type;
    const inputValue = e.target.value;
    inputErrorMsg(inputType, inputValue);
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
    if (
      !name.length >= MIN_NAME_LENGHT &&
      !validateEmail(email) &&
      !dietPref.length >= MIN_TEXT_LENGHT
    ) {
      setIsFormSubmitted(false);
    } else {
      setIsFormSubmitted(true);
      // clearFields();
    }
  };

  return (
    <main>
      <form method="post" onSubmit={handleSubmit}>
        <h1>Event RSVP Form</h1>
        <label htmlFor="name">
          <span>Name:</span>
          <small className="error-msg">{errorMsgName}</small>
        </label>
        <input
          type="text"
          id="name"
          style={errorMsgName ? { outline: "1px solid red" } : {}}
          value={name}
          onBlur={handleBlur}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">
          <span>Email:</span>
          <small className="error-msg">{errorMsgEmail}</small>
        </label>
        <input
          type="email"
          id="email"
          style={errorMsgEmail ? { outline: "1px solid red" } : {}}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlur}
          required
        />

        <label htmlFor="number">
          <span>Number of Attendees:</span>
        </label>
        <input
          type="number"
          id="number"
          value={numAttendees}
          min={1}
          onChange={(e) => setNumAttendees(e.target.value)}
          required
        />

        <label htmlFor="dietPref">
          <span>Dietary Preferences:</span>
          <small className="error-msg">{errorMsgText}</small>
        </label>
        <textarea
          rows={4}
          id="dietPref"
          value={dietPref}
          style={errorMsgText ? { outline: "1px solid red" } : {}}
          onChange={(e) => setDietPref(e.target.value)}
          onBlur={handleBlur}
          required
        />

        <div className="checkbox-container">
          <label htmlFor="xtraGuest">Bringing additional guests? </label>
          <input
            type="checkbox"
            id="xtraGuest"
            value={isWithGuest}
            onChange={(e) => setIsWithGuest(e.target.value)}
          />
        </div>
        <button className="btn" type="submit">
          Submit RSVP
        </button>
      </form>
      {isFormSubmitted && (
        <div className="feedback-container">
          <h2>RSVP Submitted!</h2>
          <p>
            <span className="fb-header">{name}:</span>
          </p>
          <p>
            <span className="fb-header">{email}:</span>
          </p>
          <p>
            <span className="fb-header">{numAttendees}:</span>
          </p>
          <p>
            <span className="fb-header">{dietPref}:</span>
          </p>
          <p>
            <span className="fb-header">{isWithGuest ? "Yes" : "No"}:</span>
          </p>
        </div>
      )}
    </main>
  );
}

export default App;
