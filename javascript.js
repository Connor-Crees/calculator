const buttons = document.querySelectorAll("button");
let num1 = "";
let num2 = "";
let oper = "";
let value = "";
const display = document.getElementById("display");

// called at program start
function Start(){
    addButtonListeners(buttons);
}

// adds event listeners to each button in given buttons array
function addButtonListeners(buttons){
    buttons.forEach(button => {
        button.addEventListener("click", function(){buttonClick(button)});
    });
}

function buttonClick(button){
    const classList = button.classList;
    // console.log(value + " pressed");
    if(classList.contains("number")){
        // no leading zeros
        if(button.value == "0" && value == ""){
            return;
        }

        // check for starting with decimal point
        if(classList.contains("decimal") && value == ""){
            value = "0";
        }
        // only allow one deciaml point
        if(classList.contains("decimal") && value.includes(".")){
            return;
        }

        value += button.value;
        updateDisplay();
    }
    else if(classList.contains("operator")){
        if(num1){
            num2 = value;
        }
        else {
            num1 = value;
        }

        if(num1 && num2 && oper){
            equals();
        }

        oper = button.value;
        value = "";
    }
    else if(classList.contains("equals")){
        // console.log("equals pressed  num1:" + num1 + " num2:" + num2 + " oper:" + oper + "value:" + value);
        num2 = value;
        if(num1 && num2 && oper){
            equals();
        }
    }
    else if(classList.contains("clear")){
        // console.log("clear called  num1:" + num1 + " num2:" + num2 + " oper:" + oper + " value:" + value);
        num1 = "";
        num2 = "";
        oper = "";
        value = "0";
        updateDisplay();
        value = "";
    }
    else if(classList.contains("clear-entry")){
        // console.log("clear-entry called  num1:" + num1 + " num2:" + num2 + " oper:" + oper + "value:" + value);
        value = "0";
        updateDisplay();
        value = "";
    }
    else if(classList.contains("delete")){
        value = value.slice(0, -1);
        if(value == ""){
            value = "0";
            updateDisplay();
            value = "";
        }
        else{
            updateDisplay();
        }
        
    }
}

function equals(){
    // console.log("equals called  num1:" + num1 + " num2:" + num2 + " oper:" + oper);
    value = operate();
    num1 = value;
    num2 = "";
    oper = "";
    // console.log("value:" + value);
    updateDisplay();
    value = "";
}

function updateDisplay(){
    display.textContent = value;
}

// evaluates the operation: num1 oper num2
// expects num1 and num2 as Strings
function operate(){
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    switch(oper){
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            if(b == 0){return "divideByZero"};
            return a / b;
    }
}

Start();