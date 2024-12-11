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

        //if two numbers and oper already exist, operate as if equals pressed then shift result into num1
        if(num1 && num2 && oper){
            equals();
        }

        oper = button.value;
        value = "";
    }
    else if(classList.contains("equals")){
        num2 = value;
        if(num1 && num2 && oper){
            equals();
        }
        value = "";
    }
    else if(classList.contains("clear")){
        console.log("clear called  num1:" + num1 + " num2:" + num2 + " oper:" + oper + "value:" + value);
    }
}

function equals(){
    console.log("equals called  num1:" + num1 + " num2:" + num2 + " oper:" + oper);
    value = operate();
    num1 = value;
    num2 = null;
    oper = null;
    console.log("value:" + value);
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