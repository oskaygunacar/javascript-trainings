const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay(){
    display.value = displayValue;
}


keys.addEventListener('click', (e)=> {
    const element = e.target
    const value = e.target.value

    if (!element.matches('button')) return;

    switch(value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case ':':
            inputDecimal(value);
            break;
        case 'clear':
            clear();
            break;
        default:
            inputNumber(value);
    }   
    updateDisplay();
})

function inputNumber(num){
    if (waitingForSecondValue) { 
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0' ? num : displayValue + num; // ternary (short if)
    }
}

function inputDecimal(){
    if (!displayValue.includes('.')){
        displayValue += '.'
    }
}

function clear(){
    displayValue = '0';
}

function handleOperator(nextOperator){
    const value = parseFloat(displayValue)
    if (firstValue === null) {
        firstValue = value

    } else if(operator) {
        const result = calculate(firstValue, value, operator)
        displayValue = String(result);
        firstValue = result;
    }
    operator = nextOperator
    waitingForSecondValue = true;
    console.log(firstValue, value, operator, waitingForSecondValue)
}

function calculate(first, second, operator) {
    if (operator == '+') {
        return first + second
    } else if (operator == '-'){
        return first - second
    } else if (operator == '*' ){
        return first * second
    } else if (operator == '/') {
        return first / second
    } else {
        return second
    }
}