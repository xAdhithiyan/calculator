function operation(x,y,op){
    switch(op){
        case "+":
            return x + y;
        case "-":
            return x - y;
        case "x":
            return x * y;
        case "/":
            return x / y;
    }
}

//to get two numbers(x,y) and an operator(op) 
function operate(x = "",y = "",op = ""){
    const btn = document.querySelectorAll("button")
    let num = "";
    btn.forEach((n) => n.addEventListener("click",function(){
        if(this.textContent == "="){ 
            y = num;
            allOperationArr.push(new OneOperation(x,y,op));
            console.log(allOperationArr[allOperationArr.length - 1].ans)
            x  = y = op = num = "";
        }else if(!Number.isInteger(+this.textContent)){  //checking if user clicked an operator
            x = num;
            op = this.textContent;
            num = "";
        }else{
            num += this.textContent;
        }
        console.log(num, x, y, op)
        
        
    }))
}

//creating an object for one operation
function OneOperation(x, y, op){
    this.num1 = x;
    this.num2 = y;
    this.ans = operation(+x,+y,op)
}





//an array containing objects of operations
allOperationArr = [];
operate();