// TODO: support mulitipule variables (implicit differentiation?)

function randomChoice(arr: any[]): any {
  // choose a random value from a given list
  let index: number = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function generateLog(): string {
  let logs: [string, string] = ["log_a(x)", "ln(x)"];
  let term: string = randomChoice(logs);
  let base: string = Math.floor(Math.random() * 10 + 1).toString();

  if (term === "log_a(x)") {
    term = term.replace("a", base);
  }

  return term;
}

function generateExp(): string {
  let term: string = "u^x";
  let base: string | number =
    Math.random() < 0.7 ? Math.floor(Math.random() * 10 + 1).toString() : "x";

  return term.replace("u", base);
}

function generateTrig(): string {
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

function generatePolynomial(): string {
  let term: string = "";
  let coef: string = (Math.floor(Math.random() * 100) + 2).toString();
  let power: string = Math.floor(Math.random() * 100).toString();
  // use random number to decide wether to use trig functions or not and if it should be a chain rule problem
  let neg: boolean = Math.random() > 0.5 ? true : false;

  term = neg === true ? coef + "x^" + power : coef + "x^(-" + power + ")";

  return term;
}

function generateTerm(
  useTrig: boolean = false,
  useLog: boolean = false,
  useExp: boolean = false
): string {
  // generate a mathamatical term with a coeficent, variable (x), and a power
  let term: string = "";
  let termList: string[] = [];

  
  if (useTrig === false && useLog === false && useExp === false) {
    return generatePolynomial();
  }

  if (useTrig === true) {
    termList.push(generateTrig());
  }

  if (useLog === true) {
    termList.push(generateLog());
  }

  if (useExp === true) {
    termList.push(generateExp());
  }

  if (Math.random() > 0.5) {
    termList.push(generatePolynomial());
  }

  let order: number = Math.floor(Math.random() * termList.length);
  
  // console.log(`term list: ${termList}`);
  
  term = term.concat(termList.splice(termList.indexOf(termList[order]), 1)[0]);

  let len: number = termList.length;

  for (let i = 0; i < len; i++) {
    order = Math.floor(Math.random() * termList.length);
    // TODO: figure out how to implement types since logs and trig functions dont need parens
    let newTerm: string =
      "(" + termList.splice(termList.indexOf(termList[order]), 1)[0] + ")";

    // console.log(`new term: ${newTerm}`);
    // console.log(`before replace: ${term}`);
    // TODO: trig functions should be sin^u(v) instead of sin(v)^u 
    // TODO: need to check if og term is trig function and if new term is polynomial
    term = term.replace(/x(?!.*x)/gim, newTerm);

    // console.log(`after replace: ${term}`);
  }

  return term;
}

function generateF(
  trig: boolean = false,
  log: boolean = false,
  exp: boolean = false,
  numOfTerms: number
): string {
  // create a polynomial
  // let terms: number = Math.floor(Math.random() * 5 + 1);
  let terms: number = numOfTerms;
  let operators: string[] = [" + ", " - ", " / ", " * "];
  let div: boolean = false;
  let f: string = "";

  for (let i = 0; i < terms; i++) {
    let operator = randomChoice(operators); // choose a new operator
    let term = generateTerm(trig, log, exp);

    if (i == 0) {
      // make sure not to have a hanging operator
      f = f.concat(term);
    } else {
      f = f.concat(operator);

      if (div === true) {
        f = f.concat(")");
        div = false;
      }

      if (operator === " / ") {
        f = f.concat("(");
        div = true;
      }

      f = f.concat(term);
    }
  }
  return f;
}

console.log(generateF(true, true, true));

export { generateF };
