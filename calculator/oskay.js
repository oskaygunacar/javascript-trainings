const calculatorKeys = document.querySelector('.calculator-keys');
let displayValue = document.querySelector('.calculator-input')

let waitingForSecondValue = false;

displayValue.value = '0';

let firstValue = null;
let operator = null;


calculatorKeys.addEventListener('click', (event)=>{
    let clickedElement = event.target;
    if (clickedElement.matches('button')) {
        let clickedElementValue = clickedElement.value;

        switch(clickedElementValue){
            case '+':
            case '-':
            case '*':
            case '/':
                handleOperator(clickedElementValue)
                break;
            case '=':
                displayValue.value = calculator();
                break;
            case '.':
                decimal()
                break;
            case 'clear':
                displayValue.value = '0';
                break;
            default:
                numberInput(clickedElementValue);

        }
    }
})


function numberInput(clickedElementValue){
    if (waitingForSecondValue) {
        displayValue.value = clickedElementValue
        waitingForSecondValue = false;
    } else {
        displayValue.value = displayValue.value == '0' ? clickedElementValue : displayValue.value + clickedElementValue
    }
}

function handleOperator(nextOperator){
    if (firstValue === null) {
        firstValue = displayValue.value;
        waitingForSecondValue = true;
    } else if (operator) {
            firstValue = displayValue.value;
            waitingForSecondValue = true;
        }
    operator = nextOperator;
    console.log(firstValue, operator, waitingForSecondValue)
}

function calculator(){
    if (firstValue != null && firstValue != '0'){
        firstValue = Number(firstValue)
        secondValue = Number(displayValue.value)
        switch(operator) {
            case '+':
                return firstValue + secondValue;
            case '-':
                return firstValue - secondValue;
            case '*':
                return firstValue * secondValue;
            case '/':
                return firstValue / secondValue;
        }
    }
    return '0';
}

function decimal(){
    if (!displayValue.value.includes('.')){
        displayValue.value += '.'
    }
}