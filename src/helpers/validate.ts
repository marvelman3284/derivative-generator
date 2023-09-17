import { parse, derivative } from 'mathjs';
const { symbolicEqual } = require('mathjs'); // HACK: only works if you use require, don't know why

// TODO: simplify output (math.simplify)?
// TODO: render output in katex
function validate(question: string, answer: string): [string, boolean] {
  // DOC: check the user inputted derivative aginst the computer generated one

  // DOC: try catch is needed for `SyntaxErrors` (bad ending to the string) 
  try {
    // DOC: check to make sure that a question has been generated or than an answer was entered
    if (question === "") {
      question = "0";
    }

    if (answer === "") {
      answer = "1";
    }
    
    let answerDerivative: string = parse(answer).toString();
    let questionDerivative: string = derivative(parse(question), 'x').toString();
    let equality: boolean = symbolicEqual(answerDerivative, questionDerivative)

    return [questionDerivative, equality];
  } catch (error) {
    return ["", false];
  }
}

export {validate};
