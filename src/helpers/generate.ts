function randomChoice(arr: any[]): any {
  // choose a random value from a given list
  let index: number = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function generateTerm(trig: boolean = false): string { 
  // generate a mathamatical term with a coeficent, variable (x), and a power
  let term: string = "";
  let trigFunctions: string[] = ["cos(x)", "sin(x)", "tan(x)", "sec(x)", "csc(x)", "cot(x)"];
  
  let coef: string = (Math.floor(Math.random() * 100) + 1).toString();
  let power: string = (Math.floor(Math.random() * 100)).toString();
  
  // use random number to decide wether to use trig functions or not and if it should be a chain rule problem
  let neg: boolean =  Math.random() > 0.5 ? true : false;
  let chain: number = Math.random();

  term = neg === true ? coef + "*x^" + power : coef + "*x^(-" + power + ")";

  if (chain > 0.5 && trig === true) { // chain rule
    let outsideFunction: string = randomChoice(trigFunctions);
    term = outsideFunction.replace('x', term);
  } else if (chain < 0.5 && trig === true) { // product rule
    term = term.concat(randomChoice(trigFunctions));
  } 

  return term;
}

function generateF(trig: boolean = false): string {
  // create a polynomial
  let terms: number = Math.floor((Math.random() * 5) + 1);
  let operators: string[] = [" + ", " - ", " / ", " * "];
  let f: string = "";
  let operator: string = randomChoice(operators) // must choose the first operators outside the loop for the logic to wor
  
  for(let i=0; i<terms; i++) {
    let term = trig === true ? generateTerm() : generateTerm(true);
   
    // if the previously choosen operator is divison add parenthesis to the next term to reduce confusion
    if (operator === ' / ' && i > 0) {
      term = "(" + term + ")"
    }
    
    f = f.concat(term);
    if (i+1<terms) { // make sure not to have a hanging operator
      f = f.concat(operator);
    }
    
    operator = randomChoice(operators) // choose a new operator
  }
  return f;
}

export {generateF};
