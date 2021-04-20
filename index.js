//const fs = require('fs');
//const userDataEntries = fs.readFileSync('txt/user.txt')
//	.toString()
//	.replace('\n', '')
//	.split(' ')
//цифра?
const isNumber = (i) => (i >= 0 && i <= 99999);
//оператор?
const isOperator = (i) => (i === '/' || i === '*' || i === '+' || i === '-' || i === ')' || i === '(');
//приоритет оператора
const prOp = function (i) {
	switch (i) {
		case '*':
		case '/':
			return 3
		case '+':
		case '-':
			return 2
		case '(':
			return 1
		case ')':
			return 0
	}
}
//Проверка на скобки
const isOperatorBracket = (i) => (i === ')');
//вычисление выражения	
const counting = function (arr, operatorTmp) {
	switch (operatorTmp) {
		case '+':
			return +arr[0] + +arr[1];
		case '-':
			return +arr[0] - +arr[1];
		case '*':
			return +arr[0] * +arr[1];
		case '/':
			return +arr[0] / +arr[1];
	}
}
// Считываем выражение
let str = '( 2 * ( 3 + 5 ) ) * 10 - 17 * 2'.split(' ');
let arrayExit = [];
let operatorArrTmp = [];
let operatorTmp;
let numTmp = [];
let testNum = [];
let exitNum = [];


for (let i of str) {
	if (isNumber(i)) {
		arrayExit.push(i);
	}
	else if (isOperator(i)) {
		if (operatorArrTmp.length === 0) operatorArrTmp.push(i);
		else if (isOperatorBracket(i)) {
			while (operatorTmp !== '(') {
				operatorTmp = operatorArrTmp.pop()
				if (operatorTmp === '(') {
					operatorTmp = 0;
					break;
				}
				else {
					arrayExit.push(operatorTmp);
					operatorTmp = 0;
				}
			}
		}
		else if (operatorArrTmp.indexOf('(') == -1) {
			operatorTmp = operatorArrTmp.pop();
			if (prOp(operatorTmp) > prOp(i)) {
				arrayExit.push(operatorTmp);
				operatorArrTmp.push(i);
				operatorTmp = 0;
			}
			else if (prOp(operatorTmp) === prOp(i)) {
				operatorArrTmp.push(operatorTmp);
				operatorArrTmp.push(i);
				operatorTmp = 0;
			}
			else {
				operatorArrTmp.push(operatorTmp);
				operatorArrTmp.push(i);
				operatorTmp = 0;

			}
		}
		else operatorArrTmp.push(i);
	}
}
while (operatorArrTmp.length !== 0) {
	arrayExit.push(operatorArrTmp.pop());
}
operatorTmp = 0;
str = arrayExit.join(' ');

//fs.appendFileSync('txt/out.txt', `\n${str}`);
console.log(str);

while (arrayExit.length !== 1) {
	for (let j of arrayExit) {
		if (isNumber(j) && operatorTmp === 0 && numTmp.length < 2) { 
			numTmp.push(j);
		}
		else if (isOperator(j) && numTmp.length === 2) { 
			operatorTmp = j;
			arrayExit.push(counting(numTmp, operatorTmp));
			operatorTmp = 0;
			numTmp = [];
			arrayExit.shift();
			arrayExit.shift();
			arrayExit.shift();
		}
		else if (isNumber(j) && numTmp.length === 2) {
			arrayExit.push(numTmp.shift());
			numTmp.push(j);
			arrayExit.shift();
		}
		else if (isOperator(j) && numTmp.length === 1) {
			arrayExit.push(numTmp.pop())
			operatorTmp = j;
			arrayExit.push(operatorTmp);
			operatorTmp = 0;
			arrayExit.shift();
		}
	}
}
//fs.appendFileSync('txt/out.txt', `\n${exitNum}`);
console.log(arrayExit);