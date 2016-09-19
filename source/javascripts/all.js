//startNew boolean is used to check whether a new display must be started on the next command
var startNew = false;
//factorialBool is used for the special case of factorials. We do not evaluate decimal factorials
var factorialBool = true;
//decimalBool is used to check for allowing use of the decimal point after operators
var decimalBool = true;
//functions related to changing binary-decimal-hex modes
function changeBinary(){
	//add selected class to binary buttons
	document.getElementById("binary").classList.add('selected');
	//remove selected class from decimal and hex modes
	document.getElementById("decimal").classList.remove('selected');
	document.getElementById("hexidecimal").classList.remove('selected');
	//disable buttons for user input constraints 
	document.getElementById("deci").classList.add('disabled');
	var elements = document.getElementsByClassName("hex");
	for (var i = 0, len = elements.length; i < len; i++) {
    	elements[i].classList.add('disabled');
	}
	var elements = document.getElementsByClassName("decimal");
	for (var i = 0, len = elements.length; i < len; i++) {
    	elements[i].classList.add('disabled');
	}
	decimalBool = false;
	document.getElementById("deci").classList.add("disable");
	//clears display, history and resets memory value on mode change
	memoryValue = "";
	clearDisplay();
	clearHistory();
}
//changing mode to decimal
function changeDecimal(){
	//add selected class to decimal button
	document.getElementById("decimal").classList.add('selected');
	//remove selected class from binary hex modes 
	document.getElementById("binary").classList.remove('selected');
	document.getElementById("hexidecimal").classList.remove('selected');
	//disable buttons for userinput constraints
	document.getElementById("deci").classList.remove('disabled');
	var elements = document.getElementsByClassName("hex");
	for (var i = 0, len = elements.length; i < len; i++) {
    	elements[i].classList.add('disabled');
	}
	var elements = document.getElementsByClassName("decimal");
	for (var i = 0, len = elements.length; i < len; i++) {
    	elements[i].classList.remove('disabled');
	}
	decimalBool = true;
	//clears display, history and resets memory value on mode change
	memoryValue = "";
	clearDisplay();
	clearHistory();
}
//change mode to hexidecimal
function changeHexidecimal(){
	//add selected class to hex
	document.getElementById("hexidecimal").classList.add('selected');
	//remove slected class from decimal and binary modes
	document.getElementById("decimal").classList.remove('selected');
	document.getElementById("binary").classList.remove('selected');
	//disable buttons for userinput constraints 
	document.getElementById("deci").classList.add('disabled');
	var elements = document.getElementsByClassName("hex");
	for (var i = 0, len = elements.length; i < len; i++) {
    	elements[i].classList.remove('disabled');
	}
	var elements = document.getElementsByClassName("decimal");
	for (var i = 0, len = elements.length; i < len; i++) {
    	elements[i].classList.remove("disabled");
	}
	decimalBool = false;
	document.getElementById("deci").classList.add("disable");
	//clears display, history and resets memory value on mode change
	memoryValue = "";
	clearDisplay();
	clearHistory();
}
	
//writing nubers to the screen from user input 
function writeNumber(){
	if (!this.classList.contains("disabled")){
		var deciBool = document.getElementById("decimal").classList.contains("selected");
		var inputScreen = document.querySelector('.screen');

		//if don't need to start new display and display does not contain NaN
		if (!startNew && !inputScreen.innerHTML.contains("NAN")){
			//add clicked value to display
			inputScreen.innerHTML += this.innerHTML;
			//Enable operators after a number is entered
			var elements = document.getElementsByClassName("operator");
			for (var i = 0, len = elements.length; i < len; i++) {
					if (!elements[i].classList.contains("deciop") || deciBool){
			    		elements[i].classList.remove('disabled');
			    	}
			}
		}
		//if need to start new display
		else if(startNew){
			//clear display before typing in number
			clearDisplay();
			//add number to display
			inputScreen.innerHTML += this.innerHTML;
			//enable operators as appropriate
			var elements = document.getElementsByClassName("operator");
			for (var i = 0, len = elements.length; i < len; i++) {
					if (!elements[i].classList.contains("deciop") || deciBool){
			    		elements[i].classList.remove('disabled');
					}
			}
		}
		//if factorial boolean is disabled because of a decimal point, keep it disabled
		if(!factorialBool){
			document.getElementById("factorial").classList.add('disabled');
		}
		if (deciBool && decimalBool){
			document.getElementById("deci").classList.remove("disabled");
			decimalBool = false;
		}
		//do not want to start a new screen on next number
		startNew = false;	
	}
}

//clear the display screan for a new expression
function clearDisplay(){
	var inputScreen = document.querySelector('.screen');
	//blank display
	inputScreen.innerHTML = '';
	//factorials allowed
	factorialBool = true;
	//start new screen on next button
	startNew = true;
	//allow decimal point to be placed again
	if (document.getElementById("decimal").classList.contains("selected")){
		decimalBool = true;
		document.getElementById("deci").classList.remove("disabled");
	}
	//Disable operators; can't be the first thing entered
	var elements = document.getElementsByClassName("operator");
	for (var i = 0, len = elements.length; i < len; i++) {
		if(elements[i].innerHTML != '-'){
    			elements[i].classList.add('disabled');
		}
	}
}

//dealing with user input of decimals	
function placeDecimal(){
	//do not want to start new display on next button
	startNew = false;
	var elem = document.getElementById("deci");
	if (!elem.classList.contains("disabled")){
		var inputScreen = document.querySelector('.screen');
		inputScreen.innerHTML += '.';
		document.getElementById("factorial").classList.add('disabled');
		document.getElementById("deci").classList.add('disabled');
		//no longer allow boolean after writing a decimal
		factorialBool = false;
		decimalBool = false;
	}
}

//dealing with user input constraints of operator
function isOp(){
	//variable to return
	var ret;
	var inputScreen = document.querySelector('.screen');
	//ret is true if there are any operators in the display excluding -
	if((inputScreen.innerHTML.contains("+") || inputScreen.innerHTML.contains("*") || inputScreen.innerHTML.contains("/") || inputScreen.innerHTML.contains("%") || inputScreen.innerHTML.contains("^"))){
		ret = true;
	}
	//ret is false if there are not any operators in the display excluding -
	if((!inputScreen.innerHTML.contains("+") && !inputScreen.innerHTML.contains("*") && !inputScreen.innerHTML.contains("/") && !inputScreen.innerHTML.contains("%") && !inputScreen.innerHTML.contains("^"))){
		ret = false;
	}
	return ret;
}

function operators(){
	if (!this.classList.contains("disabled")){
		var inputScreen = document.querySelector('.screen');
		//if there are operators and did not type a -, or if screen is NaN
		if((isOp() && this.innerHTML != "-") || inputScreen.innerHTML.contains("NAN")){
			//if NaN, start new display
			if(inputScreen.innerHTML.toLowerCase().contains("nan")){
				clearDisplay();
			}
			else if(this.innerHTML != "-"){
				evaluate();
				inputScreen.innerHTML += this.innerHTML;
			}
			else{
				inputScreen.innerHTML += this.innerHTML;
			}
		}
		else{//no other operators but -
			var index = inputScreen.innerHTML.indexOf("-");//find first index of -
			if(index == -1 && this.innerHTML != "-"){//does not have a negative
				evaluate();
				inputScreen.innerHTML += this.innerHTML;
			}
			else{//has a -
				var strCopy = inputScreen.innerHTML;
				var appearances = strCopy.split("-").length-1;
				if(appearances == 0){
					inputScreen.innerHTML += this.innerHTML;
				}
				else if(appearances == 1){//a. -# b. #- c. -#+ d. #+-# e. -#+# f. #+- g. #-#
					//case a
					if(index == 0 && !isOp()){//case a
						inputScreen.innerHTML += this.innerHTML;
					}
					//case b
					else if(index == inputScreen.innerHTML.length - 1 && !isOp()){//case b
						inputScreen.innerHTML += this.innerHTML;
					}
					//case c
					else if(index == 0 && (inputScreen.innerHTML.charAt(inputScreen.innerHTML.length - 1) == "+" || inputScreen.innerHTML.charAt(inputScreen.innerHTML.length - 1) == "*" || inputScreen.innerHTML.charAt(inputScreen.innerHTML.length - 1) == "/" || inputScreen.innerHTML.charAt(inputScreen.innerHTML.length - 1) == "%" || inputScreen.innerHTML.charAt(inputScreen.innerHTML.length - 1) == "^" ) && isOp()){//case c
						inputScreen.innerHTML += this.innerHTML;
					}
					//case d
					else if(index != 0 && inputScreen.innerHTML.charAt(inputScreen.innerHTML.length - 1) != "-" && isOp()){//case d
						evaluate();
						inputScreen.innerHTML += this.innerHTML;
					}
					//case e
					else if(index == 0 && isOp()){//case e
						evaluate();
						inputScreen.innerHTML += this.innerHTML;
					}
					//case f
					else if(index != 0 && inputScreen.innerHTML.charAt(inputScreen.innerHTML.length - 1) == "-" && isOp()){
					}
					//case g
					else if(index != inputScreen.innerHTML.length - 1 && index != 0 && !isOp()){
						evaluate();
						inputScreen.innerHTML += this.innerHTML;
					}
				}
				else if(appearances == 2){//a. -#-  b. #-- c. -#+- d. -#-# e. -#+-# f. #--#
					//case a
					if(index == 0 && inputScreen.innerHTML.charAt(inputScreen.innerHTML.length-1) == "-" && !isOp()){
						inputScreen.innerHTML += this.innerHTML;
					}
					//case b
					else if(index != 0 && inputScreen.innerHTML.charAt(inputScreen.innerHTML.length - 1) == "-" && inputScreen.innerHTML.charAt(index + 1) == "-"){
					}
					//case c
					else if(index == 0 && inputScreen.innerHTML.charAt(inputScreen.innerHTML.length-1) == "-" && isOp()){
					}
					//case d
					else if(index == 0 && inputScreen.innerHTML.charAt(inputScreen.innerHTML.length-1) != "-" && !isOp()){
						evaluate();
						inputScreen.innerHTML += this.innerHTML;
					}
					//case e
					else if(index == 0 && inputScreen.innerHTML.charAt(inputScreen.innerHTML.length-1) != "-" && isOp()){
						evaluate();
						inputScreen.innerHTML += this.innerHTML;
					}
					//case f
					else if(index != 0 && inputScreen.innerHTML.charAt(inputScreen.innerHTML.length-1) != "-" && !isOp()){
						evaluate();
						inputScreen.innerHTML += this.innerHTML;
					}
				}
				else if(appearances == 3){//a. -#--# b. -#--
					//case a
					if(inputScreen.innerHTML.charAt(inputScreen.innerHTML.length-1) != "-"){
						evaluate();
						inputScreen.innerHTML += this.innerHTML;
					}
					//case b
					else{
					}
				}
				//should never reach here but just in case
				else if(appearances >= 4){
					inputScreen.innerHTML = "ERROR";
				}
				
			}
		}
		var elements = document.getElementsByClassName("operator");

		for (var i = 0, len = elements.length; i < len; i++) {

	    	if (elements[i].innerHTML != "-"){
	    		elements[i].classList.add('disabled');
			}
		}	
	}
	//do not want to start a new screen after typing an operator
	startNew = false;
	decimalBool = true;
}

//event listeners for mode buttons
document.getElementById("binary").addEventListener( 'click' , changeBinary, false);
document.getElementById("decimal").addEventListener( 'click' , changeDecimal, false);
document.getElementById("hexidecimal").addEventListener( 'click' , changeHexidecimal, false);

//factorial function - evaluates immediately after
function factorial(){
	if (!this.classList.contains("disabled")){
		var inputScreen = document.querySelector('.screen');
		var evaluatedExpr = evaluateArgument(inputScreen.innerHTML);
		if (!inputScreen.innerHTML.contains("-")){
			//factorial function
			function fact(num) {
	   			if(num == 0) { return 1; }
	   			return num * fact(num-1);
			}
			//write answer to factorial 
			inputScreen.innerHTML = fact(evaluatedExpr);
			//start new display on next number after factorial 
		}
		else {
			inputScreen.innerHTML = "NaN";
		}
		startNew = true;
	}
}

//simple operator functions - called by evaluate function
function add(x, y, radix) {
	if (radix == 10){
		return parseFloat(x)+parseFloat(y);
	}
	else {
		return parseInt(x,radix)+parseInt(y,radix);
	}
}
function subtract(x, y, radix){
	if (radix == 10){
		return parseFloat(x)-parseFloat(y);
	}
	else {
		return parseInt(x,radix)-parseInt(y,radix);
	}
}
function mult(x, y, radix) {
	if (radix == 10){
		return parseFloat(x)*parseFloat(y);
	}
	else {
		return parseInt(x,radix)*parseInt(y,radix);
	}
}
function divide(x, y, radix) {
	if (radix == 10){
		return parseFloat(x)/parseFloat(y);
	}
	else {
		return parseInt(x,radix)/parseInt(y,radix);
	}
}
function exponent(x, y, radix) {
	if (radix == 10){
		return Math.pow(parseFloat(x),parseFloat(y));
	}
	else {
		return math.pow(parseInt(x,radix),parseInt(y,radix));
	}
}
function modulus(x, y, radix){
	return parseInt(x,radix) % parseInt(y,radix);

}

//filter out empty spaces from array for spliting with negative numbers
function filterSpace(test){
	return test != "";
}

/*  
  evaluate function
  parse the currentExp into an array
  apply the respective operator function to elements
*/
function evaluate(){
	//retreive string value from HTML element
	var inputScreen = document.querySelector('.screen');
	var radix = 10;
	var selectorHex = document.getElementById("hexidecimal");
	var selectorBinary = document.getElementById("binary");
	if (selectorHex.classList.contains("selected")){
		radix = 16;
	}
	else if (selectorBinary.classList.contains("selected")){
		radix = 2;
	}

	//check if addition
	if (inputScreen.innerHTML.contains("+")){
		var elems = inputScreen.innerHTML.split("+");
		var result = add(elems[0],elems[1],radix);
		inputScreen.innerHTML = result.toString(radix).toUpperCase();
	}
	//check if multiplication
	else if(inputScreen.innerHTML.contains("*")){
		var elems = inputScreen.innerHTML.split("*");
		var result = mult(elems[0],elems[1],radix);
		inputScreen.innerHTML = result.toString(radix).toUpperCase();
	}
	//check if divide 
	else if(inputScreen.innerHTML.contains("/")){
		var elems = inputScreen.innerHTML.split("/");
		//allert if divide by 0 but still evaluated
		if (elems[1] == 0) {
			window.alert("Error: divide by 0.");
		}
		var result = divide(elems[0],elems[1],radix);
		inputScreen.innerHTML = result.toString(radix).toUpperCase();
	}
	//check if exponent
	else if(inputScreen.innerHTML.contains("^")){
		var elems = inputScreen.innerHTML.split("^");
		var result = exponent(elems[0],elems[1],radix);
		inputScreen.innerHTML = result.toString(radix).toUpperCase();
	}
	//check if modulous
	else if(inputScreen.innerHTML.contains("%")){
		var elems = inputScreen.innerHTML.split("%");
		var result = modulus(elems[0],elems[1],radix);
		inputScreen.innerHTML = result.toString(radix).toUpperCase();
	}
	//checkif subtraction and dealing with negative numbers
	else if(inputScreen.innerHTML.contains("-")){
		var elems = inputScreen.innerHTML.split("-");
		//split leaves empty spaces with first preceding "-" and concecutive "-"
		//appends "-" to elements proceding an empty space denoting a negative number
		for (var i = 0; i< elems.length;i++){
			if (elems[i].length == 0 && elems[i+1].length != 0){
					elems[i+1] = "-" + elems[i+1];
			}
		}
		//filter out all empty elements
		elems = elems.filter(filterSpace);
		//check case if only one negative number was given and then hit enter
		if (elems.length == 1) {
			inputScreen.innerHTML = elems[0].toString(radix).toUpperCase();
		}
		//otherwise compute normally
		else {
			var result = subtract(elems[0],elems[1],radix);
			inputScreen.innerHTML = result.toString(radix).toUpperCase();
		}
	}
	//start new display on next number after evaluating
	startNew = true;
	var elements = document.getElementsByClassName("operator");
	for (var i = 0, len = elements.length; i < len; i++) {
		if (!elements[i].classList.contains("deciop") || radix == 10){
    		elements[i].classList.remove('disabled');
		}
	}
	if(!inputScreen.innerHTML.contains(".")){
		factorialBool = true;

	}
	else{
		factorialBool = false;
		document.getElementById("factorial").classList.add('disabled');
		document.getElementById("deci").classList.add('disabled');
		decimalBool = false;
	}
} 	

//trig operatorts - evaluated immediately
function trigOp(){
	if (!this.classList.contains("disabled")){
		evaluate();
		var inputScreen = document.querySelector('.screen');
		var value = inputScreen.innerHTML;
		if(this.innerHTML.contains("sin")){
			inputScreen.innerHTML = Math.sin(value);
		}
		else if(this.innerHTML.contains("cos")){
			inputScreen.innerHTML = Math.cos(value);
		}
		else if(this.innerHTML.contains("tan")){
			inputScreen.innerHTML = Math.tan(value);
		}
		startNew = true;
		if (inputScreen.innerHTML.contains(".")){
			decimalBool = false;
			factorialBool = false;
			document.getElementById("deci").classList.add("disabled");
			document.getElementById("factorial").classList.add("disabled");
		}
	}	
}

//square root operator - evaluated immediately 
function sqrt(){
	if (!this.classList.contains("disabled")){
		evaluate();
		var inputScreen = document.querySelector('.screen');
		var value = inputScreen.innerHTML;
		inputScreen.innerHTML = Math.sqrt(value);
		startNew = true;
		if (inputScreen.innerHTML.contains(".")){
			decimalBool = false;
			factorialBool = false;
			document.getElementById("deci").classList.add("disabled");
			document.getElementById("factorial").classList.add("disabled");
		}
	}
}

var memoryValue = "";
//saves value of the current display
function ms(){
	var inputScreen = document.querySelector('.screen');

	//do not save NaN or if there is an expression
	if(!inputScreen.innerHTML.toLowerCase().contains("nan") && !isOp()){
		if(inputScreen.innerHTML.contains("-")){
			if(inputScreen.innerHTML.indexOf("-") == 0){
				var str = inputScreen.innerHTML.substring(1);
				if(str.contains("-")){
					alert("Memory value cannot be an expression.");
				}
				else{
					memoryValue = inputScreen.innerHTML;
				}
			}
			else{
				alert("Memory value cannot be an expression.");
			}
		}
		else{
			memoryValue = inputScreen.innerHTML;
		}
	}
	else{
		//if NaN, alert
		if(inputScreen.innerHTML.toLowerCase().contains("nan")){
			alert("Value not a number so it cannot be saved to memory.")
		}
		//if operator, alert
		else if(isOp()){
			alert("Memory value cannot be an expression.");
		}

	}
}

//wipes the current display and pasts the value saved in MS
function mr(){
	var inputScreen = document.querySelector('.screen');
	var subStr = inputScreen.innerHTML;
	var deciBool = document.getElementById("decimal").classList.contains("selected");
	// don't add empty strings to memory
	if (memoryValue != ""){
		inputScreen.innerHTML = memoryValue;
		
		var elements = document.getElementsByClassName("operator");
				for (var i = 0, len = elements.length; i < len; i++) {
						if (!elements[i].classList.contains("deciop") || deciBool){
				    		elements[i].classList.remove('disabled');
				    	}
				}
		if (inputScreen.innerHTML.contains(".")){
			decimalBool = false;
			document.getElementById("deci").classList.add("disabled");
			factorialBool = false;
			document.getElementById("factorial").classList.add("disabled");
		}
	}
	
}

//M+ button adds display value to the saved memory value
function mplus(){
	var inputScreen = document.querySelector('.screen');
	var value = parseFloat(memoryValue) + parseFloat(inputScreen.innerHTML);
	memoryValue = value;
}

//function to evaluate two aguments with respective operator from useinput
function evaluateArgument(argument){
	var finalResult;
	var radix = 10;
	var selectorHex = document.getElementById("hexidecimal");
	var selectorBinary = document.getElementById("binary");
	if (selectorHex.classList.contains("selected")){
		radix = 16;
	}
	else if (selectorBinary.classList.contains("selected")){
		radix = 2;
	}

	//check if addition
	if (argument.contains("+")){
		var elems = argument.split("+");
		var result = add(elems[0],elems[1],radix);
		finalResult = result.toString(radix).toUpperCase();
	}
	//check if multiplication
	else if(argument.contains("*")){
		var elems = argument.split("*");
		var result = mult(elems[0],elems[1],radix);
		finalResult = result.toString(radix).toUpperCase();
	}
	//check if divide 
	else if(argument.contains("/")){
		var elems = argument.split("/");
		//allert if divide by 0 but still evaluated
		if (elems[1] == 0) {
			window.alert("Error: divide by 0.");
		}
		var result = divide(elems[0],elems[1],radix);
		finalResult = result.toString(radix).toUpperCase();
	}
	//check if exponent
	else if(argument.contains("^")){
		var elems = argument.split("^");
		var result = exponent(elems[0],elems[1],radix);
		finalResult = result.toString(radix).toUpperCase();
	}
	//check if modulous
	else if(argument.contains("%")){
		var elems = argument.split("%");
		var result = modulus(elems[0],elems[1],radix);
		finalResult = result.toString(radix).toUpperCase();
	}
	//checkif subtraction and dealing with negative numbers
	else if(argument.contains("-")){
		var elems = argument.split("-");
		//split leaves empty spaces with first preceding "-" and concecutive "-"
		//appends "-" to elements proceding an empty space denoting a negative number
		for (var i = 0; i< elems.length;i++){
			if (elems[i].length == 0 && elems[i+1].length != 0){
					elems[i+1] = "-" + elems[i+1];
			}
		}
		//filter out all empty elements
		elems = elems.filter(filterSpace);
		//check case if only one negative number was given and then hit enter
		if (elems.length == 1) {
			finalResult = elems[0].toString(radix).toUpperCase();
		}
		//otherwise compute normally
		else {
			var result = subtract(elems[0],elems[1],radix);
			finalResult = result.toString(radix).toUpperCase();
		}
	}
	else{
		finalResult = argument;
	}
	if(!finalResult.contains(".")){
		factorialBool = true;
	}
	else{
		factorialBool = false;
		document.getElementById("factorial").classList.add('disabled');
	}

	return finalResult;
} 



// send an expression (or result of an advanced expression) to the input screen.
function addHistExprToScreen(expr){
	var inputScreen = document.querySelector('.screen');
	// extract inner expression from a square root expression and send the square root of that expression to the input screen.
	if(expr.startsWith('sqrt(')){
		var innerExpr = evaluateArgument(expr.substring(5, expr.length-1));
		inputScreen.innerHTML = Math.sqrt(innerExpr);
	}
	// extract inner expression from a sine expression and send the sine of that expression to the input screen.
	else if(expr.startsWith('sin(')){
		var innerExpr = evaluateArgument(expr.substring(4, expr.length-1));
		inputScreen.innerHTML = Math.sin(innerExpr);
	}
	// extract inner expression from a cosine expression and send the cosine of that expression to the input screen.
	else if(expr.startsWith('cos(')){
		var innerExpr = evaluateArgument(expr.substring(4, expr.length-1));
		inputScreen.innerHTML = Math.cos(innerExpr);
	}
	// extract inner expression from a tangent expression and send the tangent of that expression to the input screen.
	else if(expr.startsWith('tan(')){
		var innerExpr = evaluateArgument(expr.substring(4, expr.length-1));
		inputScreen.innerHTML = Math.tan(innerExpr);
	}
	// extract inner expression from a factorial expression and send the factorial of that expression to the input screen.
	else if(expr.startsWith('(')){
		var innerExpr = evaluateArgument(expr.substring(1, expr.length-2));
		var evaluatedExpr = parseInt(innerExpr);
		function factorial(num) {
   			if(num == 0) { return 1; }
   			return num * factorial(num-1);
		}
		inputScreen.innerHTML = factorial(evaluatedExpr);
	}
	// send a basic expression to the input screen
	else{
		inputScreen.innerHTML = expr;
		startNew = false;
	}
	// re-enable operators
	var elems = document.getElementsByClassName("operator");
	for (var i = 0; i < elems.length; i++){
			elems[i].classList.remove("disabled");
	}
	// disable factorial for numbers with decimal points and don't allow multiple decimal points in a number
	if (inputScreen.innerHTML.contains(".")){
		document.getElementById("factorial").classList.add("disabled");
		document.getElementById("deci").classList.add("disabled");
	}
}

var advancedExpr = '';

//create an advanced expression for sqrt, sin, cos, tan, and factorial
function createAdvExpr(exprType){
	var inputScreen = document.querySelector('.screen');
	var expr = inputScreen.innerHTML;
	// create different types of expressions
	switch(exprType){
		// create a square root expression for the history box
		case 'sqrtExpr':
			advancedExpr = 'sqrt(' + expr + ')';
			break;
		//create a sine expression for the history box
		case 'sinExpr':
			advancedExpr = 'sin(' + expr + ')';
			break;
		// create a cosine expression for the history box
		case 'cosExpr':
			advancedExpr = 'cos(' + expr + ')';
			break;
		// create a tangent expression for the history box
		case 'tanExpr':
			advancedExpr = 'tan(' + expr + ')';
			break;
		// create a factorial expression for the history box
		case 'factExpr':
			advancedExpr = '(' + expr + ')!';
			break;
	}
}

var historyBox = document.querySelector('.history');

//add basic expressions to the history box
function addToHistoryBasic(){
	var inputScreen = document.querySelector('.screen');
	var expression = inputScreen.innerHTML;
	var newHistElt = document.createElement("div");
	newHistElt.className = 'history-element';
    newHistElt.innerHTML = expression;
    newHistElt.addEventListener('click',function(){addHistExprToScreen(expression)},false);
    //don't add empty strings to the history box
    if(expression != ''){
    	//add the expression to the history box
    	historyBox.appendChild(newHistElt);
    }
    //auto-scroll to the bottom of the box when a new expression is added
    historyBox.scrollTop = historyBox.scrollHeight;
}

// clear the histoy box
function clearHistory(){
	var elements = document.getElementsByClassName('history-element');	
	while(elements[0]){
		elements[0].parentNode.removeChild(elements[0]);
	}
}

//add advanced expressions to the history box
function addToHistoryAdv(){
	if (!this.classList.contains("disabled")){
		var newHistElt = document.createElement("div");
		newHistElt.className = 'history-element';
	    newHistElt.innerHTML = advancedExpr;
	    newHistElt.addEventListener('click',function(){addHistExprToScreen(newHistElt.innerHTML)},false);
	    historyBox.appendChild(newHistElt);
	    //auto-scroll to the bottom of the box when a new expression is added
	    historyBox.scrollTop = historyBox.scrollHeight;
	}
}

//numbers
for(var i = 0, len = 10; i < len; i++){
	document.getElementById(i).addEventListener('click',writeNumber,false);
}

//letters
var letters = document.getElementsByClassName("hex");
for(var l = 0; l < letters.length; l++){
	letters[l].addEventListener('click',writeNumber,false);
}

/*begin keystrokes*/
function keyPressed(key){
 	var inputScreen = document.querySelector('.screen');
 	//inputScreen.innerHTML = key.charCode;
 	if(key.charCode >= 48 && key.charCode <= 57){
 		var val = key.charCode - 48;
 		document.getElementById(val).click();
 		var elements = document.getElementsByClassName("operator");
		for (var i = 0, len = elements.length; i < len; i++) {
	   		elements[i].classList.remove('disabled');
		}
 	}
 	else{
 		//enables keyboard input
 		switch(key.charCode){
 			case 0:
 				document.getElementById("equals").click();
 				break;
 			case 33:
 				document.getElementById("factorial").click();
 				break;
 			case 37:
 				document.getElementById("mod").click();
 				break;
 			case 42:
 				document.getElementById("times").click();
 				break;
 			case 43:
 				document.getElementById("plus").click();
 				break;
 			case 45:
 				document.getElementById("minus").click();
 				break;
 			case 47:
 				document.getElementById("divide").click();
 				break;
 			case 94:
 				document.getElementById("power").click();
 				break;
 			case 46:
 				document.getElementById("deci").click();
 				break;
 			case 65:
 				document.getElementById("A").click();
				break; 				
 			case 97: 
 				document.getElementById("A").click();
 				break;
 			case 66:
 				document.getElementById("B").click();
				break; 				
 			case 98: 
 				document.getElementById("B").click();
 				break;
  			case 67:
 				document.getElementById("C").click();
				break; 				
 			case 99: 
 				document.getElementById("C").click();
 				break;
  			case 68:
 				document.getElementById("D").click();
				break; 				
 			case 100: 
 				document.getElementById("D").click();
 				break;
  			case 69:
 				document.getElementById("E").click();
				break; 				
 			case 101: 
 				document.getElementById("E").click();
 				break;
  			case 70:
 				document.getElementById("F").click();
				break; 				
 			case 102: 
 				document.getElementById("F").click();
 				break;
 		}
 	}
 }
 window.addEventListener("keypress",keyPressed,false);

//decimal button event listener
document.getElementById("deci").addEventListener('click',placeDecimal,false);

//clear button event listener
document.getElementById("clear").addEventListener('click',clearDisplay,false);

//plus button event listener
document.getElementById("plus").addEventListener('click',operators,false);

//divide button event listener
document.getElementById("divide").addEventListener('click',operators,false);

//multiply button event listener
document.getElementById("times").addEventListener('click',operators,false);

//equals button event listeners
document.getElementById("equals").addEventListener('click',addToHistoryBasic,false);
document.getElementById("equals").addEventListener('click',evaluate,false);

//subtraction button event listeners
document.getElementById("minus").addEventListener('click',operators,false);

//power button event listener
document.getElementById("power").addEventListener('click',operators,false);

//factorial button event listeners
document.getElementById("factorial").addEventListener('click',function(){createAdvExpr("factExpr")},false);
document.getElementById("factorial").addEventListener('click',factorial,false);
document.getElementById("factorial").addEventListener('click',addToHistoryAdv,false);

//square root event listeners
document.getElementById("sqrt").addEventListener('click',function(){createAdvExpr("sqrtExpr")},false);
document.getElementById("sqrt").addEventListener('click',sqrt,false);
document.getElementById("sqrt").addEventListener('click',addToHistoryAdv,false);

//mod button event listener
document.getElementById("mod").addEventListener('click',operators,false);

//trig operation event listeners
document.getElementById("sin").addEventListener('click',function(){createAdvExpr("sinExpr")},false);
document.getElementById("cos").addEventListener('click',function(){createAdvExpr("cosExpr")},false);
document.getElementById("tan").addEventListener('click',function(){createAdvExpr("tanExpr")},false);
document.getElementById("sin").addEventListener('click',trigOp,false);
document.getElementById("cos").addEventListener('click',trigOp,false);
document.getElementById("tan").addEventListener('click',trigOp,false);
document.getElementById("sin").addEventListener('click',addToHistoryAdv,false);
document.getElementById("cos").addEventListener('click',addToHistoryAdv,false);
document.getElementById("tan").addEventListener('click',addToHistoryAdv,false);

//memory event listeners
document.getElementById("MS").addEventListener('click',ms,false);
document.getElementById("MR").addEventListener('click',mr,false);
document.getElementById("Mplus").addEventListener('click',mplus,false);

//Disable operators; can't be the first key entered
var elements = document.getElementsByClassName("operator");
for (var i = 0, len = elements.length; i < len; i++) {
	if (elements[i].innerHTML != "-"){
	    elements[i].classList.add('disabled');
	}
}

//starts calculator in decimal mode, this should be the last thing in the code
document.getElementById("decimal").click();
	