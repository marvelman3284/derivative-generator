// TODO: speedrun mode?

import React from "react";
import "./App.css";
import OptionsForm from "./components/options";
import { useState } from "react";
import { generateF } from "./helpers/generate";
import { validate } from "./helpers/validate";
import { OptionValues } from "./helpers/types";
import Footer from "./components/footer";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

function App() {
  let [derivative, setDerivative] = useState(["", ""]);
  let [answer, setAnswer] = useState("");
  let [reveal, setReveal] = useState(false); // DOC: this is to reveal the `reveal correct answer` button
  let [revealAnswer, setRevealAnswer] = useState(false); // DOC: and this is to reveal the actual correct answer in text
  let [rightAnswer, setRightAnswer] = useState(""); // DOC: these next three are kinda redundent but im too stupid to fix it
  let [showResult, setShowResult] = useState(false);
  let [questionDerivative, correct]: [string, boolean] = validate(
    derivative[1],
    answer
  );

  // DOC: read in the state from the options from
  const [optionsData, setOptionsData] = useState<OptionValues>();

  function handleChange(evt: any) {
    const value = evt.target.value;
    setAnswer(value.toString());
  }

  const handleOptionsSubmit = (data: OptionValues) => {
    setOptionsData(data);
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setReveal(true);
    setShowResult(true);
  };

  const handleReveal = () => {
    setRevealAnswer(true);
    setRightAnswer(questionDerivative);
  };

  return (
    // TODO: need to create a checkbox for trig functions
    <div className="App">
      <div className="box">
        <OptionsForm onSubmit={handleOptionsSubmit} />
      </div>

      <br />

      <div className="problem">
        <button
          type="button"
          className="generate"
          onClick={() =>
            setDerivative(
              generateF(
                optionsData?.useTrig,
                optionsData?.useInvTrig,
                optionsData?.useLog,
                optionsData?.useExp,
                optionsData?.useChain,
                optionsData?.useQuotient,
                optionsData?.useProduct,
                optionsData?.numTerms
              )
            )
          }
        >
          Generate derivative problem
        </button>

        <h3>
          <BlockMath math={derivative[0]} />
        </h3>

        <form className="answer" onSubmit={submitForm}>
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
            // eslint-disable-next-line
            reveal && (
              <button type="button" onClick={() => handleReveal()}>
                Reveal Correct Answer
              </button>
            )
          }
          <br />
          {
            // eslint-disable-next-line
            // TODO: needs to be rendered as latex
            revealAnswer && (
              <>
                <h2>Correct Answer (simplified): {rightAnswer}</h2> 
                <h3>
                  <a
                    href={`https://derivative-calculator.net/#expr=${derivative[1]}&diffvar=x&showsteps=1`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    how?
                  </a>
                </h3>
              </>
            )
          }
          <br />
          {
            // eslint-disable-next-line
            showResult && <h2>Your answer is {correct ? "right" : "wrong"} </h2>
          }
        </form>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
export default App;
