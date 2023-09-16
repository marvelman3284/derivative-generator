import React, { useEffect, useState } from "react";
import { OptionFormProps, OptionValues } from "../helpers/types";
import "../App.css";

function OptionsForm({ onSubmit }: OptionFormProps) {
  // DOC: default option values used for comparisions
  const defaultOptionValues: OptionValues = {
    useTrig: false,
    useInvTrig: false,
    useExp: false,
    useLog: false,
    useChain: false,
    numTerms: 1,
  };

  const [isChanged, setIsChanged] = useState<boolean>(false);

  const [options, setOptions] =
    useState<OptionValues>(defaultOptionValues);

  // DOC: check if the form (state) has changed and update `isChanged` accordingly
  useEffect(() => {
    const changed = Object.keys(options).some((key) => {
      return (
        options[key as keyof OptionValues] !=
        defaultOptionValues[key as keyof OptionValues]
      );
    });

    setIsChanged(changed);
  }, [options]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, checked } = e.target;
    setOptions({ ...options, [name]: checked });
  };

  // DOC: need a seperate handleChange function for `numTerms` since its the only number compared to the other boolean values
  const handleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (parseInt(value) <= 1) {
      value = "1";
    }
    setOptions({ ...options, [name]: parseInt(value) });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(options);
    setIsChanged(false);
  };

  return (
    <div className="optionsForm">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="checkbox"
            name="useTrig"
            checked={options.useTrig}
            onChange={handleChange}
          />
          Include trig functions?
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            name="useLog"
            checked={options.useLog}
            onChange={handleChange}
          />
          Include logarithmic functions (natural log as well)?
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            name="useExp"
            checked={options.useExp}
            onChange={handleChange}
          />
          Include exponential functions?
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            name="useInvTrig"
            checked={options.useInvTrig}
            onChange={handleChange}
          />
          Include inverse trig functions?
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            name="useChain"
            checked={options.useChain}
            onChange={handleChange}
          />
          Include chain rule problems?
        </label>

        <br />

        <label>
          How many terms should there be?
          <input
            type="number"
            name="numTerms"
            min={1}
            defaultValue={1}
            onChange={handleNumChange}
          />
        </label>

        <br />

        <button
          type="submit"
          disabled={!isChanged}
          className={isChanged ? "changed" : "unchanged"}
        >
          {isChanged ? "Click submit to save your changes" : "no new changes"}
        </button>
      </form>
    </div>
  );
}

export default OptionsForm;
