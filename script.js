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
    //to decide wheater top or bottom ans
    let TopOrBottom;
    btn.forEach((n) => n.addEventListener("click",function(){
        if(this.textContent == "="){ 
            y = num;
            
            //push the operation into an array
            allOperationArr.push(new OneOperation(x,y,op));
            //to display the final ans
            display(x,y,op,1)
            TopOrBottom = 0;
            //to continue the operation
            num = allOperationArr[allOperationArr.length - 1].ans;
            x = y = op = "";
        }else if(!Number.isInteger(+this.textContent)){  //checking if user clicked an operator
            x = num;
            op = this.textContent;
            num = "";
            TopOrBottom = 1;
        }
        else{
            num += this.textContent;
            TopOrBottom = 1;
        }

        //to display ans in display area
        if(!op && TopOrBottom){
            display(num,y,op)
        }else if(op && TopOrBottom){
            display(x,num,op)
        }

        //to display the operation
        //console.log(num, x, y, op)        
    }))
}

//creating an object for one operation
function OneOperation(x, y, op){
    this.num1 = x;
    this.num2 = y;
    this.ans = operation(+x,+y,op)
}


//to display the operations in display area
function display(x,y,op,n = 0){
    const topAns = document.querySelector(".topAns");
    const bottomAns = document.querySelector(".bottomAns")

    //to erase everything and display final ans
    if(n != 0){
        topAns.textContent = `${allOperationArr[allOperationArr.length - 1].ans}`;
        bottomAns.textContent = "";
    }else if(n == 0){
        topAns.textContent = `${x}${op}${y}`;
        //to display bottom ans(partial ans)
        if(y){
            bottomAns.textContent = `${operation(+x,+y,op)}`
        }
    }
}

//an array containing objects of operations
allOperationArr = [];
operate();

