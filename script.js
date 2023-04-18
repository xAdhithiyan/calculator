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

function operate(){
    const btns = document.querySelectorAll("button");
    btns.forEach((n) => n.addEventListener(("click"),findingValues))
}

//getting each step and passing it to an array of objects
function findingValues(){
    operation += this.textContent;
    //checking for operator
    if(!(+this.textContent == +this.textContent)){
        if(this.textContent == "."){
            operator = "."; 
        }
        else if(this.textContent == "="){
            display(); // dummy function just to remove the bottom ans
            operation = finalAns = num = ans;
            operator = "=";
        }else{
            operator = this.textContent;
            finalAns = ans;
            num = "";
        }
    }else{
        num += this.textContent;
    }


    ans = Math.round(gettingValues(+finalAns,+num,operator) * 100000) / 100000;
    


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
    if(operator){
        bottomAns.textContent = allOperationsArr[allOperationsArr.length - 1].ans;
    }else{
        bottomAns.textContent = "";
    }
}

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
let operation = operator = num = ans = finalAns = "";
allOperationsArr = [];

operate();