import React from "react";

function Faq() {
  return (
  <>
    <h1>Welcome!</h1>
    <h3>Intro</h3>
      <p>
        First of all, if you're here and reading this I'm going to assume that you're of the technically minded sort and interested in this sorta stuff. If that's the case then I implore you to check out the source code <a href="https://github.com/marvelman3284/derivative-generator"> here</a>! I strongly believe that the best way to learn (how to code/about code) is by reading direct source code and documentation. If that's not your cup of tea/you can't understand my code (its ok, i can't either)/your bored in class then feel free to keep reading ahead! 
      </p>
    <h3>How it works</h3>    
      <p>
        <ol>
          <li>
            First came the challenge of generating derivative questions. This took some critical thinking and a bit of janking but eventually I got it to work like this:
              <ol>
                <li>
                  Working our backwards we start with the `generateF` function which takes a multidude of flags including all the boolean values of the checkboxes you see in the box in the bottom left as well as the number of terms (controlled by the user input also in that box). The function returns a list of two strings (typed as `[string, string]`), one for outputting to the screen and other for actual computations After the intial function decleration is a few variable initializations for the operators (addition and subtraction (multiplaction and division are handled seperately)), an empty string which will hold the current operator, a boolean for skip, and two strings we will eventually return, `texF` and `f`, representing the latex formatted version of the function and the raw function respectively
                </li>
                <li>
                  Next we check if quotient and product rule are enabled (check boxes are checked) and if so we push the multiplaction and division operator to the `operators` list.
                </li>

                <li>
                  Getting into the meat of the function is the for loop which loops from 0 to the number of terms (`numOfTerms`). The loop starts off by choosing a random operator from the `operators` list before generating a new terms using the `generateTerm` function (explained later). At the top it also initializes an empty string for the latex formatted string called `termTex`.
                </li>

                <li>
                  Next comes the jankiness: right after the variable initializations if a conditional which checks if the variable `skip` is `true` in which case it resets `skip` to `false` and skips to the next iteration of the for-loop.
                </li>

                <li>
                  This is used when division is involved since divison is implemented through the use of fraction which is handled by creating the denominator in the same iteration of the loop that creates the numerator. First a standard check is used to make sure that the randomly selected operator was division (`operator === ' / '`). Then some latex formatting is applied to `termTex` using standard string concatination before `generateTerm` is called again to make the next term which will go on the bottom of the fraction. The denominator is then placed on the bottom with latex and the raw string is created using the std ` / ` character.
              </li>

              <li>
                If the operator is **not** division then we can generalize and handle everything else the same way. Concatinate the operator to the previous term (if it's not the first iteration of the loop) then concat the new term. If it is the first iteration of the loop then simply concat the term.
              </li>

              <li>
                Finally format the two strings correctly and return them.
              </li>
            </ol>
          </li>

          <li>
            Next comes the `generateTerm` function:
            <ol>
              <li>
                Just like the `generateF` function the decleration involves a lot of arguments for each of the different checkboxes; however, this time there is, reasonably, no space for the number of terms since this is where the single terms are generated.
              </li>
              <li>
                After the intial declerations of the string to hold the term (`term`) and the term list (`termList`), the function begins with a check to see if all the parameters are false. If they are all false then we only need to push a polynomial to the term list, if chain rule is enabled, we will also push a second polynomial to the term list. However, if not all the parameters passed are false then we must check which ones are true and push the respective term to `termList`. After checking that, theres ~30% chance for another polynomial to be added in.
              </li>

              <li>
                Once all the conditionals are out of the way we choose a random term from `termList` to start with (or be the 'outside' term) and concat that into the term string. Finally, before entering the for loop, we create a variable of the length of the term list before the for loop. It's worth noting that this variable is neccessary because if we check the length of the list in the for-loop itself, the code will not work since we are constantly removing elements from the list.
              </li>

              <li>
                Inside the for-loop we choose a new random term and place it inside paranthesis.
              </li>
            </ol>
          </li>
      </ol>
    </p>
  </>
  );
}

export default Faq;
