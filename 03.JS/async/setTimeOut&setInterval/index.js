const Readline = require("readline");
const rl = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function printWordWithDelay(word) {
  let index = 0;
  let result = "";
  setInterval(() => {
    if (index < word.length) {
      console.log((result += word[index]));
      index++;
    }
  }, 1000);
}

let randomNumber = Math.floor(Math.random() * 10);

const GuessingGame = (number) => {
  const parsedNumber = parseInt(number);

  if (parsedNumber === randomNumber) {
    console.log("You guessed it!");
    return process.exit(0);
  } else if (parsedNumber > randomNumber) {
    console.log("Too high!");
    requestNumber();
  } else if (parsedNumber < randomNumber) {
    console.log("Too low!");
    requestNumber();
  } else {
    console.log("Please enter a valid number");
    requestNumber();
  }
};
const requestNumber = () => {
  rl.question("Enter a number between 1 and 10: ", (number) => {
    GuessingGame(number);
  });
};
const GameTimer = (time) => {
  let counter = time;
  setInterval(() => {
    // console.log(`[GAME]: Time remaining: ${counter}`);
    counter--;
    if (counter < 0) {
      console.log("\nTime's up!");
      process.exit(0);
    }
  }, 1000);
};

// exo 1
// printWordWithDelay("Hello");

// exo 2
requestNumber();
GameTimer(10);
