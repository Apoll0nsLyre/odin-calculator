
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
const operators = ["+", "-", "*", "/", "%"];

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
    result(value.textContent);
    reset = true;
});

operator.forEach((operator) => {
    operator.addEventListener("click", () => {
        setOperator(operator);
    });
});

function appendNumber(number){
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

function clear(){
    value.textContent = "0";
    firstNumber = 0;
    secondNumber = 0;
    firstOperator = "";
};

function result(str) {
    const operateurs = ['+', '-', '*', '/'];
  
    function estOperateur(caractere) {
      return operateurs.includes(caractere);
    }
  
    function prioriteOperateur(op) {
      switch (op) {
        case '+':
        case '-':
          return 1;
        case '*':
        case '/':
          return 2;
        default:
          return 0;
      }
    }
  
    function construireArbreExpression(tokens) {
      const pileOperateurs = [];
      const pileOperandes = [];
  
      function appliquerOperation() {
        const operateur = pileOperateurs.pop();
        const droite = pileOperandes.pop();
        const gauche = pileOperandes.pop();
        pileOperandes.push({ type: 'operation', operateur, gauche, droite });
      }
  
      for (let token of tokens) {
        if (!estOperateur(token)) {
          pileOperandes.push({ type: 'nombre', valeur: token });
        } else {
          while (
            pileOperateurs.length > 0 &&
            prioriteOperateur(pileOperateurs[pileOperateurs.length - 1]) >= prioriteOperateur(token)
          ) {
            appliquerOperation();
          }
          pileOperateurs.push(token);
        }
      }
  
      while (pileOperateurs.length > 0) {
        appliquerOperation();
      }
  
      return pileOperandes[0];
    }
  
    function obtenirBlocs(arbre) {
        const blocs = [];
    
        function parcourirArbre(expr) {
          if (expr.type === 'nombre') {
            blocs.push(expr.valeur);
          } else {
            parcourirArbre(expr.gauche);
            blocs.push(expr.operateur);
            parcourirArbre(expr.droite);
          }
        }
    
        parcourirArbre(arbre);
        return blocs;
        }
  
    function evaluerArbre(arbre) {
      if (arbre.type === 'nombre') {
        console.log(arbre.valeur);
        return parseFloat(arbre.valeur);
      } else {
        const gauche = evaluerArbre(arbre.gauche);
        const droite = evaluerArbre(arbre.droite);
  
        switch (arbre.operateur) {
          case '+':
            return gauche + droite;
          case '-':
            return gauche - droite;
          case '*':
            return gauche * droite;
          case '/':
            return gauche / droite;
          default:
            throw new Error('Opérateur non reconnu : ' + arbre.operateur);
        }
      }
    }
  
    const tokens = [];
    let nombreActuel = '';
  
    for (let i = 0; i < str.length; i++) {
      const caractere = str[i];
      if (estOperateur(caractere)) {
        if (nombreActuel !== '') {
          tokens.push(nombreActuel);
          nombreActuel = '';
        }
        tokens.push(caractere);
      } else {
        nombreActuel += caractere;
      }
    }
  
    if (nombreActuel !== '') {
      tokens.push(nombreActuel);
    }
  
    const arbreExpression = construireArbreExpression(tokens);
    const blocs = obtenirBlocs(arbreExpression);
    const resultat = evaluerArbre(arbreExpression);
  
    value.textContent = resultat;
  }

  
  


