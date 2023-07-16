
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
let firstOperator = "";
let resultNumber = "";

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
        multipleOperator();
        setOperator(operator);
    });
});

function appendNumber(number){
    if (reset === true && firstOperator === ""){
        reset = false;
        clear();
    }
    if (value.textContent === "0"){
        value.textContent = "";
    }
    value.textContent += number.textContent;
    if (firstOperator !== ""){
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
        if (firstOperator !== ""){
            secondNumber += ".";
            value.textContent += ".";
        }else if (firstOperator === "" && !(value.textContent.includes("."))){
            if (value.textContent.includes(".")){
                return;
            }else{
            firstNumber += ".";
            value.textContent += ".";
            }
        }
    };
};

function setOperator(operator){
    value.textContent += operator.textContent;
    firstOperator = operator.textContent;
};

function deleteNumber(){
    value.textContent = value.textContent.slice(0, -1);
    if (firstOperator !== ""){
        secondNumber = secondNumber.slice(0, -1);
    }else{
        firstNumber = firstNumber.slice(0, -1);
    }
    console.log(firstNumber, "first");
    console.log(secondNumber, "second");
};

function add(){
    value.textContent = parseFloat(firstNumber) + parseFloat(secondNumber);
};

function subtract(){
    value.textContent = parseFloat(firstNumber) - parseFloat(secondNumber);
};

function multiply(){
    value.textContent = parseFloat(firstNumber) * parseFloat(secondNumber);
};

function divide(){
    if (secondNumber == 0){
        value.textContent = "Error";
        return;
    }else{
    value.textContent = parseFloat(firstNumber) / parseFloat(secondNumber);
    };
};

function percent(){
        value.textContent = parseFloat(firstNumber) * parseFloat(secondNumber) / 100;
}

function clear(){
    value.textContent = "0";
    firstNumber = 0;
    secondNumber = 0;
    firstOperator = "";
};

function result(){
    if (firstOperator === "+"){
        add();
    }
    else if (firstOperator === "-"){
        subtract();
    }
    else if (firstOperator === "*"){
        multiply();
    }
    else if (firstOperator === "/"){
        divide();
    }else if (firstOperator === "%"){
        percent();
    }
    firstNumber = value.textContent;
    secondNumber = "";
    firstOperator = "";
};

function multipleOperator(){
    if (firstOperator !== ""){
        result();
        firstNumber = value.textContent;
        secondNumber = "";
    }
}

