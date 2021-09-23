let symbol = '';
let math = '';
let calculated = false;

let display = document.getElementById('display');
let symbolElement = document.getElementById('symbol');

let buttons = Array.from(document.getElementsByClassName('button'));
buttons.map((button) => {
  button.addEventListener('click', (e) => {
    switch (e.target.id) {
      case 'plus':
        if (calculated) {
          calculated = false;
        }
        symbolElement.innerText = '\u002B';
        math += '+';
        display.innerText = '';
        break;
      case 'minus':
        if (calculated) {
          calculated = false;
        }
        symbolElement.innerText = '\u2212';
        math += '-';
        display.innerText = '';
        break;
      case 'multiply':
        if (calculated) {
          calculated = false;
        }
        symbolElement.innerText = '\u00D7';
        math += '*';
        display.innerText = '';
        break;
      case 'divide':
        if (calculated) {
          calculated = false;
        }
        symbolElement.innerText = '\u00F7';
        math += '/';
        display.innerText = '';
        break;
      case 'equal':
        symbolElement.innerText = '';
        calculated = true;
        try {
          let evaluation = eval(math);
          display.innerText = evaluation;
          math = evaluation;
        } catch {
          display.innerText = 'Error';
        }
        break;
      default:
        if (calculated) {
          calculated = false;
          math = '';
          display.innerText = math;
          math += e.target.id;
          display.innerText += e.target.id;
        } else {
          math += e.target.id;
          display.innerText += e.target.id;
        }
    }
  });
});
