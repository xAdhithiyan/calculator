function operation(x,y,op){
    switch(op){
        case "+":
            return x + y;
            break;
        case "-":
            return x - y;
            break;
        case "x":
            return x * y;
            break;
        case "/":
            return x / y;
            break;
        case "^":
            return Math.pow(x,y)
            break;
    }
}

//to get two numbers(x,y) and an operator(op) 
function operate(x = "",y = "",op = ""){
    const btn = document.querySelectorAll("button")
    let num = "";
    //to decide wheater top or bottom dispaly
    let TopOrBottom;
    //to check for multiple operations
    let noOfOp = 0;
    let x1=0;

    btn.forEach((n) => n.addEventListener("click",function(){
        // to remove last element entered
        if(this.textContent == "="){ 
            y = num;
            
            //push the operation into an array
            allOperationArr.push(new OneOperation(x1,y,op));
            //to display the final ans
            display(x,y,op,1,x1)

            TopOrBottom = 0;
            noOfOp = 0;
            //to continue the operation
            num = allOperationArr[allOperationArr.length - 1].ans;
             x = y = op = "";
        }else if(!Number.isInteger(+this.textContent) && noOfOp > 0 && this.textContent != "."){
            op = this.textContent;
            x = document.querySelector(".topAns").textContent;
            num = "";
            TopOrBottom = 1;
            x1 = document.querySelector(".bottomAns").textContent;
        }
        else if(!Number.isInteger(+this.textContent) && this.textContent != "."){  //checking if user clicked an operator
            op = this.textContent;
            x = num;
            num = "";
            TopOrBottom = 1;
            noOfOp ++;
            x1=x;

        }
        else{
            num += this.textContent;
            TopOrBottom = 1;
        }
        
        //to display ans in display area
        if(!op && TopOrBottom){
            display(num,y,op,0,x1)
        }else if(op && TopOrBottom){
            display(x,num,op,0,x1)
        }

        //to display the operation
        //console.log(num, x, y, op)        
    }))
}

//creating an object for one operation
function OneOperation(x, y, op){
    this.num1 = x;
    this.num2 = y;
    this.ans = Math.round(operation(+x,+y,op) * 10000) / 10000
}


//to display the operations in display area
function display(x,y,op,n = 0,x1=x){
    const topAns = document.querySelector(".topAns");
    const bottomAns = document.querySelector(".bottomAns")

    //to erase everything and display final ans
    if(n != 0){
        topAns.textContent = `${allOperationArr[allOperationArr.length - 1].ans}`;
        bottomAns.textContent = "";
    }else if(n == 0){
        if(op!= "CLEAR"){
            if(x == "" ){x = "0"}
            topAns.textContent = `${x}${op}${y}`;
        }
        //to display bottom ans(partial ans)
        if(y){
            bottomAns.textContent = `${Math.round(operation(+x1,+y,op) * 10000) / 10000}`
        }
    }
}


//to refresh the calculator 
document.querySelector(".clear").addEventListener("click",() => window.location.reload())
//an array containing objects of operations
allOperationArr = [];
operate();

