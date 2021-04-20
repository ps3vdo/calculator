const fs = require('fs');
const userDataEntries = fs.readFileSync('txt/input.txt')
	.toString()
	.replace('\n', '')
	.split(' ')
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
let arrayTemp = [];

{//обратная польская нотация
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

fs.appendFileSync('txt/output.txt', `\n Обратная польская нотация: ${str}`);
console.log(str);
}

while (arrayExit.length !== 1) {
	for (let j of arrayExit) {
		if (isNumber(j) && operatorTmp === 0 && numTmp.length < 2) { 
			numTmp.push(j);
		}
		else if (isOperator(j) && numTmp.length === 2) { 
			operatorTmp = j;
			arrayTemp.push(counting(numTmp, operatorTmp));
			operatorTmp = 0;
			numTmp = [];
		}
		else if (isNumber(j) && numTmp.length === 2) {
			arrayTemp.push(numTmp.shift());
			numTmp.push(j);
		}
		else if (isOperator(j) && numTmp.length === 1) {
			arrayTemp.push(numTmp.pop())
			operatorTmp = j;
			arrayTemp.push(operatorTmp);
			operatorTmp = 0;
		}
		else if (isOperator(j) && numTmp.length === 0) {
			arrayTemp.push(j);
		}
	}
	arrayExit = arrayTemp;
	arrayTemp = [];
}
fs.appendFileSync('txt/out.txt', `\n Сумма произведения: ${exitNum}`);
console.log(arrayExit);