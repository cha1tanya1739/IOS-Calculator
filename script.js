let currentInput = '';
let operator = '';
let firstOperand = null;

const textField = document.getElementById('text-field');
const buttons = document.querySelectorAll('.bn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        if (buttonText === 'C') {
            clear();
        } else if (buttonText === '+/-') {
            toggleSign();
        } else if (buttonText === '%') {
            calculatePercentage();
        } else if (buttonText === '=') {
            calculateResult();
        } else if (['+', '-', 'x', '/'].includes(buttonText)) {
            setOperator(buttonText);
        } else {
            appendNumber(buttonText);
        }
    });
});

function appendNumber(number) {
    currentInput += number;
    updateDisplay(currentInput);
}

function setOperator(op) {
    if (currentInput === '') return;
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else {
        calculateResult();
    }
    operator = op;
    currentInput = '';
}

function calculateResult() {
    if (firstOperand === null || currentInput === '') return;

    const secondOperand = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case 'x':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = firstOperand / secondOperand;
            break;
        default:
            return;
    }

    updateDisplay(result);
    firstOperand = result;
    currentInput = '';
    operator = '';
}

function clear() {
    currentInput = '';
    firstOperand = null;
    operator = '';
    updateDisplay(0);
}

function toggleSign() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay(currentInput);
    }
}

function calculatePercentage() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay(currentInput);
    }
}

function updateDisplay(value) {
    const valueString = value.toString();
    if (valueString.length > 10) {
        value = parseFloat(value).toPrecision(10);
    }
    textField.textContent = value.toString().slice(0, 10);
}
