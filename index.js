
const fs = require('fs');
const userDataEntries = fs.readFileSync('txt/user.txt')
	.toString()
	.replace('\n', '')
	.split(' ')
//цифра?
let isNumber = function (i) {
	if (i >= 0 && i <= 99999) return true;
	else return false
}
//оператор?
let isOperator = function (i) {
	if (i === '/' || i === '*' || i === '+' || i === '-' || i === ')' || i === '(') return true;
	else return false
}
//приоритет оператора
let prOp = function (i) {
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
let opBracket = function (i) {
	if (i === ')') return true;
	else return false;
}
//вычисление выражения	
let counting = function (arr, operatorTmp) {
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
let str = userDataEntries; //prompt('Введите выражение', '( 3 + 5 ) * 10 - 17 * 2').split(' ');
let reversString = [];
let op = [];
let operatorTmp;
let numTmp = [];
let testNum = [];
let exitNum = [];


for (let i of str) {
	if (isNumber(i)) {
		reversString.push(i);
	}
	if (isOperator(i)) {
		if (op.length === 0) op.push(i);
		else if (opBracket(i)) {
			while (op.lenght !== 0) {
				if (op.indexOf('(') == 0) {
					op.shift()
				}
				else if (op.length !== 0 && op[op.lenght - 1] !== "(") {
					reversString.push(op.pop());
				}
				else break;
			}
		}
		else if (op.indexOf('(') == -1) {
			operatorTmp = op.pop();
			if (prOp(operatorTmp) > prOp(i)) {
				reversString.push(operatorTmp);
				op.push(i);
			}
			else if (prOp(operatorTmp) === prOp(i)) {
				op.push(operatorTmp);
				op.push(i);
			}
			else {
				op.push(operatorTmp);
				op.push(i);

			}
		}
		else op.push(i);
	}
}
while (op.length !== 0) {
	reversString.push(op.pop());
}
operatorTmp = 0;
str = reversString.join(' ');

fs.appendFileSync('txt/out.txt', `\n${str}`);

for (let j of reversString) {
	if (isNumber(j) && operatorTmp === 0) {
		numTmp.push(j)
	}
	else if (isOperator(j) && numTmp.length === 2) {
		operatorTmp = j;
		testNum.push(counting(numTmp, operatorTmp));
		operatorTmp = 0;
		numTmp = [];
	}
	else if (isOperator(j) && numTmp.length === 1) {
		operatorTmp = j;
		numTmp.push(testNum.pop())
		testNum.push(counting(numTmp, operatorTmp));
		operatorTmp = 0;
		numTmp = [];
	}
	else if (testNum.length === 2) { //нужно допилить и передавать в основной массив...
		operatorTmp = j;
		exitNum.push(counting(testNum, operatorTmp));
	}
}
fs.appendFileSync('txt/out.txt', `\n${exitNum}`);
console.log(exitNum)