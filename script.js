// Display
let display = document.getElementById('display');

let setDisplay = (string) => {
  string = string.toLocaleString(undefined, {
    maximumFractionDigits: 3,
  });
  // change to exponent expressions
  if (string.length > 8) {
    display.innerText = 'too long';
  } else {
    display.innerText = string;
  }
};

let resetDisplay = () => {
  display.innerText = '';
};

// watch
let getCurrentTime = () => {
  let now = new Date();
  let hour = now.getHours();
  hour = hour > 12 ? hour - 12 : hour;
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  return (
    hour +
    ' ' +
    minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 }) +
    ' ' +
    seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })
  );
};

let watch;

let updateTime = () => {
  setDisplay(getCurrentTime());
  watch = setInterval(() => {
    setDisplay(getCurrentTime());
  }, 1000);
};

let stopTime = () => {
  clearInterval(watch);
};

let buttonWait;
let firstClick = true;

let buttonTimeout = () => {
  stopTime();
  if (firstClick) {
    resetDisplay();
    firstClick = false;
  }
  clearTimeout(buttonWait);
  buttonWait = setTimeout(() => {
    resetCalculator();
    setSymbol();
    firstClick = true;
    updateTime();
  }, 8000);
};

updateTime();

// Calculator
let symbolElement = document.getElementById('symbol');

let symbol = '';
let math = '';
let calculated = false;

let resetCalculator = () => {
  symbol = '';
  math = '';
  calculated = false;
};

let setSymbol = (char = '') => {
  symbolElement.innerText = char;
};

let buttons = Array.from(document.getElementsByClassName('button'));
buttons.map((button) => {
  button.addEventListener('click', (e) => {
    buttonTimeout();
    switch (e.target.id) {
      case 'plus':
        if (calculated) {
          calculated = false;
        }
        setSymbol('\u002B');
        math += '+';
        resetDisplay();
        break;
      case 'minus':
        if (calculated) {
          calculated = false;
        }
        setSymbol('\u2212');
        math += '-';
        resetDisplay();
        break;
      case 'multiply':
        if (calculated) {
          calculated = false;
        }
        setSymbol('\u00D7');
        math += '*';
        resetDisplay();
        break;
      case 'divide':
        if (calculated) {
          calculated = false;
        }
        setSymbol('\u00F7');
        math += '/';
        resetDisplay();
        break;
      case 'equal':
        setSymbol('');
        calculated = true;
        try {
          let evaluation = eval(math);
          setDisplay(evaluation);
          math = evaluation;
        } catch {
          setDisplay('Error');
        }
        break;
      default:
        if (calculated) {
          calculated = false;
          math = '';
          setDisplay(math);
          math += e.target.id;
          setDisplay(display.innerText + e.target.id);
        } else {
          math += e.target.id;
          setDisplay(display.innerText + e.target.id);
        }
    }
  });
});
