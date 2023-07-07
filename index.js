
const pad = document.querySelector(".pad");
const number = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const value = document.querySelector(".value");
const deleteBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clear");
const equalBtn = document.querySelector(".equal");
const commaBtn = document.querySelector(".comma");

let reset = false;
let firstNumber = 0;
let secondNumber = 0;
let firstOperand = "";
let secondOperand = "";

clearBtn.addEventListener("click", () => {
    clear();
});

commaBtn.addEventListener("click", () => {
    comma();
});   

number.forEach((number) => {
    number.addEventListener("click", () => {
        appendNumber(number);
    });
});

deleteBtn.addEventListener("click", () => {
    deleteNumber();
});

equalBtn.addEventListener("click", () => {
    result();
    reset = true;
});

operator.forEach((operator) => {
    operator.addEventListener("click", () => {
        setOperator(operator);
    });
});

function appendNumber(number){
    if (reset === true && firstOperand === ""){
        reset = false;
        clear();
    }
    if (value.textContent === "0"){
        value.textContent = "";
    }
    value.textContent += number.textContent;
    if (firstOperand !== ""){
        secondNumber += number.textContent;
    }else{
        firstNumber += number.textContent;
    }
    console.log(firstNumber, "first");
    console.log(secondNumber, "second");
};

function comma(){
    if (value.textContent === ""){
        value.textContent = "0.";
    }else{
        value.textContent += ".";
        if (firstOperand !== ""){
            secondNumber += ".";
        }else{
            firstNumber += ".";
        }
    };
};

function setOperator(operator){
    value.textContent += operator.textContent;
    firstOperand = operator.textContent;
};

function deleteNumber(){
    value.textContent = value.textContent.slice(0, -1);
    if (firstOperand !== ""){
        secondNumber = secondNumber.slice(0, -1);
    }else{
        firstNumber = firstNumber.slice(0, -1);
    }
    console.log(firstNumber, "first");
    console.log(secondNumber, "second");
};

function add(){
    if (firstOperand === "+"){
        value.textContent = parseInt(firstNumber) + parseInt(secondNumber);
    }
        
};

function subtract(){
    if (firstOperand === "-"){
        value.textContent = parseInt(firstNumber) - parseInt(secondNumber);
    }
};

function multiply(){
    if (firstOperand === "*"){
        value.textContent = parseInt(firstNumber) * parseInt(secondNumber);
    }
};

function divide(){
    if (firstOperand === "/"){
        value.textContent = parseInt(firstNumber) / parseInt(secondNumber);
    }
};

function percent(){
    if (firstOperand === "%"){
        value.textContent = parseInt(firstNumber) * parseInt(secondNumber) / 100;
    }
}

function clear(){
    value.textContent = "0";
    firstNumber = 0;
    secondNumber = 0;
    firstOperand = "";
};

function result(){
    if (firstOperand === "+"){
        add();
    }
    else if (firstOperand === "-"){
        subtract();
    }
    else if (firstOperand === "*"){
        multiply();
    }
    else if (firstOperand === "/"){
        divide();
    }else if (firstOperand === "%"){
        percent();
    }
    firstNumber = value.textContent;
    secondNumber = "";
    firstOperand = "";
};

