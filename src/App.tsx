// TODO: use mathJAX for rendering equations
// TODO: number changer for num of terms
// TODO: checkboxes for exp, trig, and logs

import React from "react";
import { useState } from "react";
import "./App.css";
import { generateF } from "./helpers/generate";
import { validate } from "./helpers/validate";

// TODO: implement local history using localstorage

function App() {
  let [derivative, setDerivative] = useState("");
  let [answer, setAnswer] = useState("");
  let [reveal, setReveal] = useState(false);
  let [revealAnswer, setRevealAnswer] = useState(false);
  let [rightAnswer, setRightAnswer] = useState("");
  let [showResult, setShowResult] = useState(false);
  let [useTrig, setUseTrig] = useState(false);
  let [useLog, setUseLog] = useState(false);
  let [useExp, setUseExp] = useState(false);
  let [questionDerivative, correct]: [string, boolean] = validate(
    derivative,
    answer
  );

  function handleChange(evt: any) {
    const value = evt.target.value;

    setAnswer(value);
  }

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setReveal(true);
    setShowResult(true);
  };

  const handleReveal = () => { 
    setRevealAnswer(true);
    setRightAnswer(questionDerivative);
  }
  const handleTrig = () => {
    setUseTrig(!useTrig);
  }
  
  const handleLog = () => {
    setUseLog(!useLog);
  }
  
  const handleExp = () => {
    setUseExp(!useExp);
  }

  return (
    // TODO: need to create a checkbox for trig functions
    <div className="App">
      <input
        type="checkbox"
        id="trig"
        name="trig"
        value="Use Trig Functions?"
        checked={useTrig}
        onChange={handleTrig}
        />
        Inlcude trig functions?
      <br/>
      <input
        type="checkbox"
        id="logs"
        name="logs"
        value="Use Log Functions?"
        checked={useLog}
        onChange={handleLog}
        />
        Inlcude logarithmic functions (natural log as wel)?
      <br/>
      <input
        type="checkbox"
        id="exp"
        name="exp"
        value="Use Trig Functions?"
        checked={useExp}
        onChange={handleExp}
        />
        Inlcude exponential functions?
      <br/>
      <button type="button" onClick={() => setDerivative(generateF(useTrig))}>
        Generate derivative problem
      </button>
      <p>{derivative}</p>
      <form onSubmit={submitForm}>
        <label>
          <b>Answer: </b>
          <input
            value={answer}
            onChange={handleChange}
            type="text"
            name="answer"
            placeholder="Enter an answer"
          />
          <br />
        </label>
        <button type="submit">Submit</button>
        {
          // esline-disable-next-line
          reveal &&
          <button type="button" onClick={() => handleReveal()}>Reveal Correct Answer</button>
        }
        <br/>
        {
          // esline-disable-next-line
          revealAnswer &&
          <>
            <h2>Correct Answer: {rightAnswer}</h2>
            <h3>
              <a 
                href={`https://derivative-calculator.net/#expr=${derivative}&diffvar=x&showsteps=1`}> 
                  how? 
              </a> 
              
            </h3>
          </>
        }
        <br/>
        {
          // eslint-disable-next-line
          showResult &&
          <h2>Your answer is {correct ? 'right' : 'wrong'} </h2>
        }
      </form>
    </div>
  );
}
export default App;
