function gettingValues(x,y,op = ""){
    switch(op){
        case "+":
            return x + y;
            break;
        case "-":
            return x - y;
            break;
        case "x":
            if(!num){return ans}
            else{return x * y;}
            break;
        case "/":
            if(!num){return ans}
            else{return x / y;}
            break;
        case "^":
            return Math.pow(x,y)
            break;
        case "":
            return num;
            break;
        case "=":
            operator = "";
            return ans;
            break;
        case ".":
            return dotButton();
            break;
    }
}
function numpadValues(exp){
    switch(exp){
        case "+":
            return "+";
            break;
        case "-":
            return "-";
            break;
        case "*":
            return "x";
            break;
        case "/":
            return "/";
            break;
        case "^":
            return "^";
            break;
        case "Enter":
            return "=";
            break;
        case ".":
            if(!num.includes(".")){return "."}
            else{return ""}
            break;
        case "Escape":
            reset();
            return "";
            break;
        case "Backspace":
            backspace();
            return "";
            break;
        case " ":
            return "";
            break;
        default:
            return "";
            break;
    }
}

function operate(){
    const btns = document.querySelectorAll("button");
    btns.forEach((n) => n.addEventListener(("click"),findingValues));

    //for numpad
    window.addEventListener("keydown",function(n){
        console.log(n.key)
        if(+n.key || n.key ==0){
            this.textContent = n.key;
        }else{
            this.textContent = numpadValues(n.key)
        }

        if(this.textContent){
            findingValues();
        }
    })

    
    //to clear the window
    document.querySelector(".clear").removeEventListener("click",findingValues);
    document.querySelector(".clear").addEventListener("click",reset);
    //to remove one element
    document.querySelector(".backspace").removeEventListener(("click"),findingValues);
    document.querySelector(".backspace").addEventListener(("click"),backspace);
}


//getting each step and passing it to an array of objects
function findingValues(){
    operation += this.textContent;
    //checking for operator
    if(!(+this.textContent == +this.textContent)){
        if(this.textContent == "."){
            operator = ".";
            //only able to use the "." once -> removing the event listener
            let btn = document.querySelector(".decimal")
            btn.removeEventListener(("click"),findingValues);
        }else if(this.textContent == "="){
            display(); // dummy function just to remove the bottom ans
            operation = finalAns = num = ans;
            operator = "=";

            //only able to use the "." once at the starting> removing the event listener
            let btn = document.querySelector(".decimal")
            if(ans.toString().includes(".")){btn.removeEventListener(("click"),findingValues);}
            else{btn.addEventListener(("click"),findingValues)}
        }else{
            operator = this.textContent;
            finalAns = ans;
            num = "";
            //adding "." again to new number -> adding the event listner
            let btn = document.querySelector(".decimal")
            btn.addEventListener(("click"),findingValues);

        }
    }else{
        num += this.textContent;
    }

    ans = Math.round(gettingValues(+finalAns,+num,operator) * 100000) / 100000;
    
    //to avoid repetation of operator
    if(!allOperationsArr.length){
        console.log()
    }else if(!num && !allOperationsArr[allOperationsArr.length - 1].num){
        operation = operation.substring(0,operation.length-2) + operation.substring(operation.length-1,operation.length);
    }

    //array of operation
    allOperationsArr.push(new OneOperation(operation,operator,num,ans))
    console.table(allOperationsArr)
    display();
    changingDisplay();

}

//objects for each step
function OneOperation(operation,operator,num,ans){
    this.operation = operation;
    this.operator = operator;
    this.num = num;
    this.ans = ans;
}

function display(){
    const topAns = document.querySelector(".topAns")
    const bottomAns = document.querySelector(".bottomAns")
    topAns.textContent = allOperationsArr[allOperationsArr.length - 1].operation;
    if(operator){
        bottomAns.textContent = allOperationsArr[allOperationsArr.length - 1].ans;
    }else{
        bottomAns.textContent = "";
    }
}

//for floats
function dotButton(){
    operator = allOperationsArr[allOperationsArr.length - 1].operator;
    num = num + ".";
    let compare = 0;
    for(let i = 0 ; i< ans.toString().length;i++){
        if(ans.toString()[i] == "."){
            compare = 1; 
        }
    }
    ans = compare == 1 ? ans  : ans + ".";
    return (ans);
}

//to remove one element
function backspace(){
    allOperationsArr.pop();
    if(!allOperationsArr.length){
        reset();
    }else{
        operation = allOperationsArr[allOperationsArr.length - 1].operation;
        operator = allOperationsArr[allOperationsArr.length - 1].operator;
        num = allOperationsArr[allOperationsArr.length - 1].num;
        ans = allOperationsArr[allOperationsArr.length - 1].ans;
        display();
        changingDisplay();
    }

    //only able to use the "." once at the starting> removing the event listener
    let btn = document.querySelector(".decimal")
    if(ans.toString().includes(".")){btn.removeEventListener(("click"),findingValues);}
    else{btn.addEventListener(("click"),findingValues)}


}


//repeating code cause i dont know to how delacre global vaiarables -_-
function reset(){
    operation = operator = num = ans = finalAns = "";
    allOperationsArr = [];
    document.querySelector(".topAns").textContent = "";
    document.querySelector(".bottomAns").textContent = "";

    //only able to use the "." once at the starting> removing the event listener
    let btn = document.querySelector(".decimal")
    if(ans.toString().includes(".")){btn.removeEventListener(("click"),findingValues);}
    else{btn.addEventListener(("click"),findingValues)}

}

//to increase display size
function changingDisplay(){
    const topAns = document.querySelector(".topAns");
    const altDisplay = document.querySelector(".display")
    const main = document.querySelector(".main")
    if(topAns.textContent.length > 12){
        topAns.classList.add("altTopAns")
        altDisplay.classList.add("altDisplay")
        main.classList.add("altMain")
        if(topAns.textContent.length > 24){
            topAns.classList.remove("altTopAns")
            altDisplay.classList.remove("altDisplay")
            main.classList.remove("altMain")

            topAns.classList.add("altTopAns2")
            altDisplay.classList.add("altDisplay2")
            main.classList.add("altMain2")
        }else{
            topAns.classList.remove("altTopAns2")
            altDisplay.classList.remove("altDisplay2")
            main.classList.remove("altMain2")
        }
    }else{
        topAns.classList.remove("altTopAns")
        altDisplay.classList.remove("altDisplay")
        topAns.classList.remove("altTopAns2")
        altDisplay.classList.remove("altDisplay2")
        main.classList.remove("altMain")
        main.classList.remove("altMain2")
    }    
}
let operation = operator = num = ans = finalAns = "";
let allOperationsArr = [];
operate();

