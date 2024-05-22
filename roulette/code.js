
let CurrNum = -1; let balance = 1000; let bet = 100;

let rouge = false, noir = false;
let passe = false, manque = false;
let pair = false, impair = false;
let R1 = false, R2 = false, R3 = false;

//vse rdece stevilke
const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

//vse crne stevilke
const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];



//resetta vse stave pred novim spinom
function ResetAllBets() {
	rouge = false, noir = false;
	passe = false, manque = false;
	pair = false, impair = false;
}


//pokaze trenutno karto al neki
function showCurrNum(p1) {
	document.getElementById("rouletteResult").innerHTML = "Ball hit: " + p1;
}

//pokaze kok zelencev mas
function showBalance() {
	document.getElementById("balance").innerHTML = balance + "$";
}

//za debuggat da vidm bool kje je pa kok je
function getBool(p1) {
	document.getElementById("bool").innerHTML = "Bool value: " + p1;
}

//k zaspina rab tud odstet in pristet 
//kar si zgubu=more ugotovit as kj dubu alne
function CalcutateWins(p1) {
	let win = 0;
	if (p1 == 0) {
		win -= bet;//se mi zdi da zgubis ce pair pa 0
	}
	else if (p1 % 2 == 0) {
		//je even
		if (pair == true) {
			win += bet;
		}
		if (impair == true) {
			win -= bet;
		}
	}
	else {
		//je odd
		if (impair == true) {
			win += bet;
		}
		//ce zgubis
		if (pair == true) {
			win -= bet;
		}
	}


	//skalkulira passe/manque

	//manque
	if (p1 > 0 && p1 <= 18) {
		if (manque == true) {
			win += bet;
		}

		if (passe == true) {
			win -= bet;
		}
	}
	//passe
	else if (p1 > 18) {
		if (passe == true) {
			win += bet;
		}

		if (manque == true) {
			win -= bet;
		}
	}
	//ce pade nicla
	else {
		if (passe || manque) {
			win -= bet;
		}
	}


	//DELA!!!
	//preverja rdece/crne stevilke
	if (redNumbers.includes(p1)) {
		if (rouge == true) {
			win += bet;
		}
		if (noir == true) {
			win -= bet;
		}
	} else if (blackNumbers.includes(p1)) {
		if (noir == true) {
			win += bet;
		}
		if (rouge == true) {
			win -= bet;
		}
	} else {
		//nicla padla
		if (rouge == true) {
			win -= bet;
		}
		if (noir == true) {
			win -= bet;
		}
	}

	//preverja rowse
	if (p1 % 3 == 0) {
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
	else if ((p1 + 1) % 3 == 0) {
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
	else if ((p1 + 2) % 3 == 0) {
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

	//izpise na kok si dubu/zgubu
	document.getElementById("money_won").innerHTML = "Money earned: " + win;
	return win;
}

//nardi random stevilko
function getRouletteSpin() {
	return Math.floor(Math.random() * 37);
}

// ///////////////////

//spremeni barvo gumba, p1 je ime p2 je bool
function ColorSelected(p1, p2) {
	const button = document.getElementById(p1);

	if (p2) {
		//button.style.backgroundColor = '#4caf50';
		button.style.borderColor = '#ffffff';
	}
	else {
		//button.style.backgroundColor = '#ff4c4c';
		button.style.borderColor = '#777777';
	}
}
