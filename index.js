const fs = require('fs');
let stringCout = '3 + 5 + 10 * 20'.split(' ');//fs.readFileSync('txt/input.txt').toString().replace('\n', '').split(' ');
//цифра?
const isNumber = (i) => (i >= -999999999 && i <= 999999999);
//оператор?
const isOperator = (i) => (i === '/' || i === '*' || i === '+' || i === '-' || i === ')' || i === '(');
//приоритет оператора
const prOp = function (i) {
	switch (i) {
		case '*':
		case '/':
			return 1
		case '+':
		case '-':
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

let arrayExit = [];
let operatorTmp;
let numTmp = [];
let arrayTemp = [];

try {
	for (let i of stringCout) {
		if (!isNumber(i) && !isOperator(i)|| i === ' ') throw 'Символ не опознан. Операция остановлена';
		else if (isNumber(i)) arrayExit.push(i);
		else if (isOperator(i)) {
			if (arrayTemp.length === 0) arrayTemp.push(i);
			else if (isOperatorBracket(i)) {
				while (operatorTmp !== '(') {
					operatorTmp = arrayTemp.pop()
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
			else if (i === '(') arrayTemp.push(i);
			else {
				operatorTmp = arrayTemp.pop();
				if (prOp(operatorTmp) > prOp(i)) {
					arrayExit.push(operatorTmp);
					arrayTemp.push(i);
					operatorTmp = 0;
				}
				else if (prOp(operatorTmp) < prOp(i)) {
					arrayTemp.push(operatorTmp);
					arrayTemp.push(i);
					operatorTmp = 0;
				}
				else {
					arrayExit.push(operatorTmp);
					arrayTemp.push(i);
					operatorTmp = 0;
				}
			}
		}
		else throw 'Символ не опознан. Операция остановлена';
	}
	while (arrayTemp.length !== 0) {
		arrayExit.push(arrayTemp.pop());
	}
	operatorTmp = 0;
	stringCout = arrayExit.join(' ');
	fs.appendFileSync('txt/output.txt', `\n Обратная польская нотация: ${stringCout}`);
	console.log(stringCout);
	
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
			else if (!isNumber(i) && !isOperator(i)) throw 'Символ не опознан. Операция остановлена';
		}
		arrayExit = arrayTemp;
		arrayTemp = [];
	}
	fs.appendFileSync('txt/output.txt', `\n Сумма произведения: ${arrayExit}`);
	console.log(arrayExit);
} catch (e) {
	console.error(e);
}
