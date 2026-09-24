let currentOperand = '0';
let previousOperand = '';
let operator = null;
let shouldResetScreen = false;

const currentOperandEl = document.getElementById('currentOperand');
const previousOperandEl = document.getElementById('previousOperand');

function updateDisplay() {
  currentOperandEl.textContent = currentOperand;
  previousOperandEl.textContent = previousOperand;
}

function appendNumber(number) {
  if (shouldResetScreen) {
    currentOperand = '0';
    shouldResetScreen = false;
  }
  if (number === '.' && currentOperand.includes('.')) return;
  if (currentOperand === '0' && number !== '.') {
    currentOperand = number;
  } else {
    currentOperand += number;
  }
  updateDisplay();
}

function chooseOperator(op) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    calculate();
  }
  operator = op;
  previousOperand = `${currentOperand} ${operator}`;
  shouldResetScreen = true;
  updateDisplay();
}

function calculate() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current) || operator === null) return;

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '×':
      result = prev * current;
      break;
    case '÷':
      result = current === 0 ? 'Error' : prev / current;
      break;
    case '%':
      result = prev % current;
      break;
    default:
      return;
  }

  if (result !== 'Error') {
    result = Math.round(result * 100000000) / 100000000;
  }

  currentOperand = result.toString();
  operator = null;
  previousOperand = '';
  shouldResetScreen = true;
  updateDisplay();
}

function clearAll() {
  currentOperand = '0';
  previousOperand = '';
  operator = null;
  updateDisplay();
}

function deleteLast() {
  if (currentOperand.length === 1) {
    currentOperand = '0';
  } else {
    currentOperand = currentOperand.slice(0, -1);
  }
  updateDisplay();
}

document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
  if (e.key === '.') appendNumber('.');
  if (e.key === '+') chooseOperator('+');
  if (e.key === '-') chooseOperator('-');
  if (e.key === '*') chooseOperator('×');
  if (e.key === '/') { e.preventDefault(); chooseOperator('÷'); }
  if (e.key === 'Enter' || e.key === '=') calculate();
  if (e.key === 'Backspace') deleteLast();
  if (e.key === 'Escape') clearAll();
});
