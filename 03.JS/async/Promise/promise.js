const fakePromiseDelay = false ? 2000 : 8000;

function PromiseWith2secondsDelay(delay) {
  return new Promise((resolve, reject) => {
    const randomBetween1and2 = Math.floor(Math.random() * 2) + 1;

    switch (randomBetween1and2) {
      case 1:
        setTimeout(() => {
          return resolve("Random success !");
        }, fakePromiseDelay);
        break;
      case 2:
        setTimeout(() => {
          return reject("Random error !");
        }, delay);
        break;
    }
  });
}
function PromiseResolved(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Forced Resolved Promise !");
    }, delay);
  });
}
function PromiseRejected(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("Forced Rejected Promise !");
    }, delay);
  });
}
function Exo1() {
  PromiseWith2secondsDelay(fakePromiseDelay)
    .then(console.log)
    .catch(console.log);
}
function Exo2() {
  PromiseWith2secondsDelay(fakePromiseDelay)
    .then(console.log)
    .catch(console.log)
    .then(() => {
      PromiseWith2secondsDelay(fakePromiseDelay)
        .then(console.log)
        .catch(console.log);
    });
}
function Exo3() {
  Promise.all([
    PromiseResolved(fakePromiseDelay).catch((error) => ({ error })),
    PromiseRejected(fakePromiseDelay).catch((error) => ({ error })),
  ])
    .then(console.table)
    .catch(console.log);
}
async function Exo4() {
  try {
    const promiseOne = await PromiseRejected(fakePromiseDelay);
    console.log(promiseOne);
  } catch (e) {
    console.log(e);
  }
  try {
    const promiseTwo = await PromiseResolved(fakePromiseDelay);
    console.log(promiseTwo);
  } catch (e) {
    console.log(e);
  }
}
async function Exo5() {
  try {
    const randomPromise = await PromiseWith2secondsDelay(fakePromiseDelay);
    console.log(randomPromise);
  } catch (e) {
    console.log(e);
  }
}
async function Exo6() {
  let milisecondsTimer = 0;
  const timer = setInterval(() => {
    milisecondsTimer++;
  }, 1);

  try {
    const promiseOne = await PromiseRejected(fakePromiseDelay);
    console.log(promiseOne);
  } catch (e) {
    console.log(e);
  }
  try {
    const promiseTwo = await PromiseResolved(fakePromiseDelay);
    console.log(promiseTwo);
  } catch (e) {
    console.log(e);
  }
  console.log(`Timer: ${milisecondsTimer}ms`);
  clearInterval(timer);
}
async function Exo7() {
  const randomDelayRejection = Math.floor(Math.random() * 100) + 1;
  const randomDelayResolution = Math.floor(Math.random() * 100) + 1;
  try {
    const result = await Promise.race([
      PromiseRejected(randomDelayRejection),
      PromiseResolved(randomDelayResolution),
    ]);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}
async function Exo8() {
  const requestURL = "https://api.agify.io/?name=luc";

  const FailedRequest = Math.floor(Math.random() * 2) === 1;

  try {
    const response = FailedRequest
      ? await fetch("https://api.agify.iO/name=luc")
      : await fetch(requestURL);
    console.log(JSON.parse(await response.text()));
  } catch (e) {
    console.error("Failed Request :", e);
  }
}
async function Exo9() {
  const requestURL = "https://api.agify.io/?name=luc";
  const secondRequestURL = "https://cat-fact.herokuapp.com/facts/random";

  const FailedRequest = Math.floor(Math.random() * 2) === 1;

  async function secondRequest() {
    try {
      const response = await fetch(secondRequestURL);
      console.log(JSON.parse(await response.text()));
    } catch (e) {
      console.error("Failed Request :", e);
    }
  }

  // First request
  try {
    const response = await fetch(requestURL);
    console.log(JSON.parse(await response.text()));
    secondRequest().then(console.log).catch(console.error);
  } catch (e) {
    console.error("Failed Request :", e);
  }
  // Second request
}
async function Exo10(URL, Attempts = 0) {
  const MaxAttempts = 5;

  if (Attempts >= MaxAttempts) throw new Error("Max attempts reached");

  const Delay = Math.pow(2, Attempts) * 1000;
  await new Promise((resolve) => setTimeout(resolve, Delay));

  try {
    const response = await fetch(URL);
    return JSON.parse(await response.text());
  } catch (error) {
    console.error(
      `Failed to reach the API .... restarting in ${backoffDelay / 1000}s`,
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Exo10(URL, Attempts + 1);
  }
}

Exo10("https://api.agify.io/?name=luc").then(console.log).catch(console.error);

/**
 * execute all exos
 */
// Exo1();
// Exo2();
// Exo3();
// Exo4();
// Exo5();
// Exo6();
// Exo7();
// Exo8();
// Exo9();
