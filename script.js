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
    }
}

function operate(){
    const btns = document.querySelectorAll("button");
    btns.forEach((n) => n.addEventListener(("click"),findingValues))
}

//getting each step and passing it to an array of objects
function findingValues(){
    operation += this.textContent;
    //checking for operator
    if(!(+this.textContent == +this.textContent)){
        if(this.textContent == "="){
            operation = ans;
            finalAns = ans;
            operator = num = "";
        }else{
            operator = this.textContent;
            finalAns = ans;
            num = "";
        }
    }else{
        num += this.textContent;
    }
    
    ans = gettingValues(+finalAns,+num,operator);
    


    //array of operation
    allOperationsArr.push(new OneOperation(operation,operator,num,ans))
    console.table(allOperationsArr)
    display();

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
    bottomAns.textContent = allOperationsArr[allOperationsArr.length - 1].ans;
}

let operation = operator = num = ans = finalAns = "";
allOperationsArr = [];

operate();