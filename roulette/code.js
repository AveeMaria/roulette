
let CurrNum = -1; let balance = 1000; let bet = 100;

let rouge = false, noir = false;
let passe = false, manque = false;
let pair = false, impair = false;
let R1 = false, R2 = false, R3 = false;
let D1 = false, D2 = false, D3 = false;

//za bettat stevilke
let Numbers = new Array(37);
Numbers.fill(false);
//console.log(Numbers);

//vse rdece stevilke
const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

//vse crne stevilke
const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

//put true on a number u bet on
function SelectNumber(num) {
	return Numbers[num] = !Numbers[num];
}


//resetta vse stave pred novim spinom
function ResetAllBets() {
	let rouge = false, noir = false;
	let passe = false, manque = false;
	let pair = false, impair = false;
	let R1 = false, R2 = false, R3 = false;
	let D1 = false, D2 = false, D3 = false;
}
/*
function createBooleanArray(length) {
	return new Array(length).fill(false);
}*/


//pokaze trenutno karto al neki
function showCurrNum(num) {
	document.getElementById("rouletteResult").innerHTML = "Ball hit: " + num;
}

//pokaze kok zelencev mas
function showBalance() {
	document.getElementById("balance").innerHTML = balance + "$";
}

//za debuggat da vidm bool kje je pa kok je
function getBool(num) {
	document.getElementById("bool").innerHTML = "Bool value: " + num;
}

//k zaspina rab tud odstet in pristet 
//kar si zgubu=more ugotovit as kj dubu alne
function CalcutateWins(num) {
	let win = 0;

	//preverja rdece/crne stevilke
	win += CheckRedBlack(num);

	// odd/even check
	win += CheckOddEven(num);

	//check passe/manque
	win += CheckPasseManque(num);
	
	//dozens check
	win += CheckDozenBets(num);

	// pristeje/odsteje glede na rowse
	win += CheckRowBets(num);

	// pristeje/odsteje glede na posamezne st
	win += CheckNumberBets(num);

	//izpise na kok si dubu/zgubu
	document.getElementById("money_won").innerHTML = "Money earned: " + win;
	return win;
}

function CheckPasseManque(num) {
	let win = 0;
	//manque
	if (num > 0 && num <= 18) {
		if (manque) {
			win += bet;
		}

		if (passe) {
			win -= bet;
		}
	}
	//passe
	else if (num > 18) {
		if (passe) {
			win += bet;
		}

		if (manque) {
			win -= bet;
		}
	}
	//ce pade nicla
	else {
		if (passe) {
			win -= bet;
		}
		if (manque) {
			win -= bet;
		}
	}

	return win;
}
function CheckRedBlack(num) {
	let win = 0;

	if (redNumbers.includes(num)) {
		if (rouge) {
			win += bet;
		}
		if (noir) {
			win -= bet;
		}
	} else if (blackNumbers.includes(num)) {
		if (noir) {
			win += bet;
		}
		if (rouge) {
			win -= bet;
		}
	} else {
		//nicla pade
		if (rouge) {
			win -= bet;
		}
		if (noir) {
			win -= bet;
		}
	}

	return win;
}
function CheckOddEven(num) {
	let win = 0;
	if (num == 0) {
		win -= bet;//se mi zdi da zgubis ce mas pair pa je 0
	}
	else if (num % 2 == 0) {
		//je even
		if (pair) {
			win += bet;
		}
		if (impair) {
			win -= bet;
		}
	}
	else {
		//je odd
		if (impair) {
			win += bet;
		}
		if (pair) {
			win -= bet;
		}
	}

	return win;
}
function CheckDozenBets(num) {
	let win = 0;
	if (num >= 1 && num <= 12) {
		//D1
		if (D1) {
			win += 2 * bet;
		}
		if (D2) {
			win -= bet;
		}
		if (D3) {
			win -= bet;
		}
	}
	else if (num >= 13 && num <= 24) {
		//D2
		if (D1) {
			win -= bet;
		}
		if (D2) {
			win += 2 * bet;
		}
		if (D3) {
			win -= bet;
		}
	}
	else if (num >= 25 && num <= 36) {
		//D3
		if (D1) {
			win -= bet;
		}
		if (D2) {
			win -= bet;
		}
		if (D3) {
			win += 2 * bet;
		}
	}
	else {
		//0
		if (D1) {
			win -= bet;
		}
		if (D2) {
			win -= bet;
		}
		if (D3) {
			win -= bet;
		}
	}
	return win;
}
function CheckRowBets(num) {
	let win = 0;

	if (num % 3 == 0) {
		//R1
		if (R1) {
			win += 2 * bet;
		}
		if (R2) {
			win -= bet;
		}
		if (R3) {
			win -= bet;
		}
	}
	else if ((num + 1) % 3 == 0) {
		//R2
		if (R1) {
			win -= bet;
		}
		if (R2) {
			win += 2 * bet;
		}
		if (R3) {
			win -= bet;
		}
	}
	else if ((num + 2) % 3 == 0) {
		//R3
		if (R1) {
			win -= bet;
		}
		if (R2) {
			win -= bet;
		}
		if (R3) {
			win += 2 * bet;
		}
	}
	else {
		if (R1) {
			win -= bet;
		}
		if (R2) {
			win -= bet;
		}
		if (R3) {
			win -= bet;
		}
	}
	return win;
}
function CheckNumberBets(num) {
	let win = 0;

	for (let i = 0; i < Numbers.length; i++) {

		//prever use bette
		if (Numbers[i]) {
			//ce zadanes number
			if (i == num) {
				win += 35 * bet;
			}
			else {
				win -= bet;
			}
		}
	}
	return win;
}

//nardi random stevilko
function getRouletteSpin() {
	return Math.floor(Math.random() * 37);
}

// ///////////////////

//spremeni barvo gumba, num je ime p2 je bool
function ColorSelected(num, p2) {
	const button = document.getElementById(num);

	if (p2) {
		//button.style.backgroundColor = '#4caf50';
		button.style.borderColor = '#ffffff';
	}
	else {
		//button.style.backgroundColor = '#ff4c4c';
		button.style.borderColor = '#777777';
	}
}