import { parse, derivative } from 'mathjs';
const { symbolicEqual } = require('mathjs'); // only works if you use require, don't know why

function validate(question: string, answer: string): [string, boolean] {
  if (question == "") {
    question = "0";
  }

  if (answer == "") {
    answer = "1";
  }
  
  let answerDerivative: string = parse(answer).toString();
  let questionDerivative: string = derivative(parse(question), 'x').toString();
  let equality: boolean = symbolicEqual(answerDerivative, questionDerivative)

  return [questionDerivative, equality];
}

export {validate};
