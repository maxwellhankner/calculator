// Body
document.body.style.height = window.innerHeight + 'px';
window.addEventListener('resize', () => {
  document.body.style.height = window.innerHeight + 'px';
});

// Display
let display = document.getElementById('display');
let meridiemElement = document.getElementById('meridiem');

let setDisplay = (string, meridiem) => {
  string = string
    .toLocaleString(undefined, {
      maximumFractionDigits: 3,
    })
    .replace(/,/g, '');
  if (string.length > 8) {
    display.innerText = 'too long';
  } else {
    display.innerText = string;
  }
  if (meridiem) {
    meridiemElement.innerText = meridiem;
  } else {
    meridiemElement.innerText = '';
  }
};

let resetDisplay = () => {
  display.innerText = '';
  meridiemElement.innerText = '';
};

// watch
let getCurrentTime = () => {
  let now = new Date();
  let hour = now.getHours();

  let meridiem = 'AM';
  hour > 11 && (meridiem = 'PM');

  hour === 0 && (hour = 12);
  hour = hour > 12 ? hour - 12 : hour;
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  return {
    time:
      hour +
      ' ' +
      minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 }) +
      ' ' +
      seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 }),
    meridiem,
  };
};

let watch;

let updateTime = () => {
  let { time, meridiem } = getCurrentTime();
  setDisplay(time, meridiem);
  watch = setInterval(() => {
    let { time, meridiem } = getCurrentTime();
    setDisplay(time, meridiem);
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
let savedSymbol = '';
let savedNumber = '';
let math = '';
let calculated = false;

let resetCalculator = () => {
  symbol = '';
  savedSymbol = '';
  savedNumber = '';
  math = '';
  calculated = false;
};

let setSymbol = (char = '') => {
  symbolElement.innerText = char;
};

// Buttons
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
        symbol = '+';
        savedSymbol = '';
        savedNumber = '';
        math += '+';
        resetDisplay();
        break;
      case 'minus':
        if (calculated) {
          calculated = false;
        }
        setSymbol('\u2212');
        symbol = '-';
        savedSymbol = '';
        savedNumber = '';
        math += '-';
        resetDisplay();
        break;
      case 'multiply':
        if (calculated) {
          calculated = false;
        }
        setSymbol('\u00D7');
        symbol = '*';
        savedSymbol = '';
        savedNumber = '';
        math += '*';
        resetDisplay();
        break;
      case 'divide':
        if (calculated) {
          calculated = false;
        }
        setSymbol('\u00F7');
        symbol = '/';
        savedSymbol = '';
        savedNumber = '';
        math += '/';
        resetDisplay();
        break;
      case 'equal':
        if (savedSymbol) {
          math += savedSymbol;
          math += savedNumber;
          try {
            let evaluation = eval(math);
            setDisplay(evaluation);
            math = evaluation;
          } catch {
            setDisplay('Error');
          }
        } else {
          savedSymbol = symbol;
          savedNumber = display.innerText;
          symbol = '';
          setSymbol('');
          calculated = true;
          try {
            let evaluation = eval(math);
            setDisplay(evaluation);
            math = evaluation;
          } catch {
            setDisplay('Error');
          }
        }
        break;
      default:
        if (calculated) {
          calculated = false;
          math = '';
          savedSymbol = '';
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
