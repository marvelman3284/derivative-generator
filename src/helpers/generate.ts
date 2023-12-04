// TODO: support mulitipule variables (implicit differentiation?)
// TODO: make polynomials optional
// TODO: fix inverse trig

function randomChoice(arr: any[]): any {
  // DOC: choose a random value from a given list
  let index: number = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function generateLog(): string {
  // DOC: choose between either natural or std log, only generate the base if it's std log
  // TODO: fix logs need to be in format log(var, base) to be derived
  let logs: [string, string] = ["log_a(x)", "ln(x)"];
  let term: string = randomChoice(logs);

  if (term === "log_a(x)") {
    let base: string = Math.floor(Math.random() * 10 + 1).toString();
    term = term.replace("a", base);
  }

  return term;
}

function generateExp(): string {
  // DOC: generate an exponential function, with the possibility for both the base and the power to be a variable
  let term: string = "u^{(x)}";
  let base: string | number =
    Math.random() < 0.7 ? Math.floor(Math.random() * 10 + 1).toString() : "x";

  return term.replace("u", base);
}

function generateTrig(): string {
  // DOC: choose randomly between 1 of the 6 trig functions
  let trigFunctions: string[] = [
    "cos(x)",
    "sin(x)",
    "tan(x)",
    "sec(x)",
    "csc(x)",
    "cot(x)",
  ];
  return randomChoice(trigFunctions);
}

function generateInverseTrig(): string {
  // DOC: choose randomly between 1 of 6 transendental trig functions
  let trigFunctions: string[] = [
    "acos(x)",
    "asin(x)",
    "atan(x)",
    "asec(x)",
    "acsc(x)",
    "acot(x)",
  ];
  return randomChoice(trigFunctions);
}

function generatePolynomial(): string {
  // DOC: generate a single-term polynomial in the form a*x^(b)
  let term: string = "";
  let coef: string = (Math.floor(Math.random() * 100) + 2).toString();
  let power: string = Math.floor(Math.random() * 20 + 1).toString();
  // use random number to decide wether to use trig functions or not and if it should be a chain rule problem
  let neg: boolean = Math.random() > 0.5 ? true : false;

  term =
    neg === true ? coef + "x^{" + power + "}" : coef + "x^{(-" + power + ")}";

  return term;
}

function generateTerm(
  useTrig: boolean = false,
  useInverseTrig: boolean = false,
  useLog: boolean = false,
  useExp: boolean = false,
  useChain: boolean = false
): string {
  // DOC: generate a single term (it might be long) based on the given parameters
  let term: string = "";
  let termList: string[] = [];

  if (
    useTrig === false &&
    useLog === false &&
    useExp === false &&
    useInverseTrig === false
  ) {
    termList.push(generatePolynomial());
    if (useChain === true) {
      termList.push(generatePolynomial());
    }
  }

  // DOC: add terms to the termList based on the parameters
  if (useTrig === true) {
    termList.push(generateTrig());
  }

  if (useLog === true) {
    termList.push(generateLog());
  }

  if (useExp === true) {
    termList.push(generateExp());
  }

  if (useInverseTrig === true) {
    termList.push(generateInverseTrig());
  }

  // DOC: just for shits n gigs, have the chance of adding on a polynomial
  if (Math.random() > 0.7 || useChain === true) {
    termList.push(generatePolynomial());
  }

  // DOC: choose the first term randomly from `termList`
  let order: number = Math.floor(Math.random() * termList.length);
  term = term.concat(termList.splice(termList.indexOf(termList[order]), 1)[0]);
  let len: number = termList.length;

  for (let i = 0; i < len; i++) {
    // DOC: choose the next term and then decide wether it should invovle chain rule or not
    order = Math.floor(Math.random() * termList.length);
    // TODO: figure out how to implement types since logs and trig functions dont need parens
    let newTerm: string =
      "(" + termList.splice(termList.indexOf(termList[order]), 1)[0] + ")";

    // TODO: trig functions should be sin^u(v) instead of (sin(v))^u
    // TODO: need to check
    // if og term is trig function and if new term is polynomial
    if (useChain === true) {
      term = term.replace(/x(?!.*x)/gim, newTerm);
    } else {
      term = term.concat(newTerm);
    }
  }

  return term;
}

function generateF(
  trig: boolean = false,
  invTrig: boolean = false,
  log: boolean = false,
  exp: boolean = false,
  chain: boolean = false,
  quotient: boolean = false,
  product: boolean = false,
  numOfTerms: number = 1
): [string, string] {
  // DOC: generate a function composed of multiple terms with operators seperating them
  let operators: string[] = [" + ", " - "];
  let operator: string = "";
  let skip: boolean = false;
  let texF: string = "\\frac{d}{dx}[";
  let f: string = "";

  if (quotient === true) {
    operators.push(" / ");
  }

  if (product === true) {
    operators.push(" * ");
  }

  for (let i = 0; i < numOfTerms; i++) {
    operator = randomChoice(operators); // DOC: choose a new operator
    let term = generateTerm(trig, invTrig, log, exp, chain);
    let termTex: string = "";

    if (skip === true) {
      skip = false;
      continue;
    }

    if (operator === " / ") {
      termTex = "\\dfrac{" + term + "}";
      let nextTerm: string = generateTerm(trig, invTrig, log, exp, chain);
      termTex = "(" + termTex + "{" + nextTerm + "})";
      texF = texF.concat(termTex);
      f = f.concat(term, " / ", nextTerm);
      skip = true;
    } else {
      if (i !== 0) {
        texF = texF.concat(operator);
        f = f.concat(operator);
      }
      texF = texF.concat(term);
      f = f.concat(term);
    }
  }

  f = f.replace(/{/g, "");
  f = f.replace(/}/g, "");
  texF = texF.concat("]=?");
  return [texF, f];
}

export { generateF };
