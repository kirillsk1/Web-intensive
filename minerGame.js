let mineField = [];
let score = 0;
let isGameOn = 0;
let fieldSize = 8;
let minesQuantity = 8;

function createTable(rows, columns) {
	let body = document.body;
	let tbl = document.createElement('table');
	tbl.style.border = '1px solid black';
	for (let i = 0; i < rows; ++i) {
		let tr = tbl.insertRow();
		for (let j = 0; j < columns; ++j) {
			let td = tr.insertCell();
		}
	}
	body.appendChild(tbl);
}

// установка флажка
function rightClickCell(clickedRow, clickedColumn) {
	let cell = document.getElementsByTagName("td")[clickedRow * fieldSize + clickedColumn];
	if (cell.classList.length === 0) {
		cell.innerHTML = "⚐";
		cell.classList.add("flag");
	}
	else if (cell.classList.contains("flag")) {
		cell.innerHTML = "";
		cell.classList.remove("flag");
	}
}


function clickCell(clickedRow, clickedColumn) {
	let cell = document.getElementsByTagName("td")[clickedRow * fieldSize + clickedColumn];
	if (cell.classList.contains("visited") || isGameOn === 0) {
		return 0;
	} else {
		if (cell.classList.contains("flag")) {
			cell.innerHTML = "";
			cell.classList.remove("flag");
		}
		cell.classList.add("visited");
		let clickedValue = mineField[clickedRow][clickedColumn];
		if (clickedValue < 0) {
			cell.innerHTML = "☠";
			cell.classList.add("bomb");
			isGameOn = 0;
			popupResult("Вы проиграли!");
		}
		else if (clickedValue === 0) {
			cell.classList.add("free");
			if (clickedRow === 0 && clickedColumn === 0) {
				clickCell(clickedRow + 1, clickedColumn);
				clickCell(clickedRow, clickedColumn + 1);
				clickCell(clickedRow + 1, clickedColumn + 1);
			}	else if (clickedRow === 0 && clickedColumn === fieldSize - 1) {
				clickCell(clickedRow + 1, clickedColumn);
				clickCell(clickedRow, clickedColumn - 1);
				clickCell(clickedRow + 1, clickedColumn - 1);
			}	else if (clickedRow === fieldSize - 1 && clickedColumn === 0) {
				clickCell(clickedRow - 1, clickedColumn);
				clickCell(clickedRow, clickedColumn + 1);
				clickCell(clickedRow - 1, clickedColumn + 1);
			}	else if (clickedRow === fieldSize - 1 && clickedColumn === fieldSize - 1) {
				clickCell(clickedRow - 1, clickedColumn);
				clickCell(clickedRow, clickedColumn - 1);
				clickCell(clickedRow - 1, clickedColumn - 1);
			}	else if (clickedRow === 0 && clickedColumn > 0 && clickedColumn < fieldSize - 1) {
				clickCell(clickedRow, clickedColumn + 1);
				clickCell(clickedRow, clickedColumn - 1);
				clickCell(clickedRow + 1, clickedColumn - 1);
				clickCell(clickedRow + 1, clickedColumn);
				clickCell(clickedRow + 1, clickedColumn + 1);
			}	else if (clickedRow === fieldSize - 1 && clickedColumn > 0 && clickedColumn < fieldSize - 1) {
				clickCell(clickedRow, clickedColumn + 1);
				clickCell(clickedRow, clickedColumn - 1);
				clickCell(clickedRow - 1, clickedColumn - 1);
				clickCell(clickedRow - 1, clickedColumn);
				clickCell(clickedRow - 1, clickedColumn + 1);
			}	else if (clickedColumn === 0 && clickedRow > 0 && clickedRow < fieldSize - 1) {
				clickCell(clickedRow - 1, clickedColumn);
				clickCell(clickedRow + 1, clickedColumn);
				clickCell(clickedRow - 1, clickedColumn + 1);
				clickCell(clickedRow, clickedColumn + 1);
				clickCell(clickedRow + 1, clickedColumn + 1);
			} else if (clickedColumn === fieldSize - 1 && clickedRow > 0 && clickedRow < fieldSize - 1) {
				clickCell(clickedRow - 1, clickedColumn);
				clickCell(clickedRow + 1, clickedColumn);
				clickCell(clickedRow - 1, clickedColumn - 1);
				clickCell(clickedRow, clickedColumn - 1);
				clickCell(clickedRow + 1, clickedColumn - 1);
			} else {
				clickCell(clickedRow - 1, clickedColumn - 1);
				clickCell(clickedRow - 1, clickedColumn);
				clickCell(clickedRow - 1, clickedColumn + 1);
				clickCell(clickedRow, clickedColumn - 1);
				clickCell(clickedRow, clickedColumn + 1);
				clickCell(clickedRow + 1, clickedColumn - 1);
				clickCell(clickedRow + 1, clickedColumn);
				clickCell(clickedRow + 1, clickedColumn + 1);
			}
			score += 1;
		}
		else {
			cell.innerHTML = clickedValue.toString();
			cell.classList.add("check")
			score += 1;
		}
		console.log(score);
		if (score === fieldSize * fieldSize - minesQuantity) {
			popupResult("Вы выиграли!");
		}
	}
}

function restartGame() {
	score = 0;
	mineField = [];
	let tds = document.getElementsByTagName("td");
	for (let i = 0; i < tds.length; ++i) {
		tds[i].className = "";
		tds[i].innerHTML = "";
	}
	createMineField();
}

function popupResult(message) {
	let templatePopup = document.getElementById("template-popup");
	let popupDiv = document.createElement('div');
	
	popupDiv.setAttribute('id', 'popup-div');
	popupDiv.innerHTML = templatePopup.textContent.replace('{{text}}', message);

	document.body.appendChild(popupDiv);
}


function newGame() {
	let popupDiv = document.getElementById('popup-div');
	if (popupDiv) {
		document.body.removeChild(popupDiv);
	}
	restartGame();
}

// Возвращает случайное целое число между min (включительно) и max (не включая max)
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function createMineField() {
	for (let i = 0; i < fieldSize; ++i) {
		mineField.push([]);
		for (let j = 0; j < fieldSize; ++j) {
			mineField[i].push(0);
		}
	}
	let k = 0;
	let rows = [];
	let cols = [];
	while (k < minesQuantity) {
		let minePosition = getRandomInt(0, fieldSize * fieldSize);
		let mineRow = Math.floor(minePosition / fieldSize);
		let mineColumn = minePosition % fieldSize;
		
		if (mineField[mineRow][mineColumn] >= 0) {
			mineField[mineRow][mineColumn] = Number.MIN_SAFE_INTEGER;
			rows.push(mineRow);
			cols.push(mineColumn);
			markArea(mineRow, mineColumn);
			k += 1;
		} else {
			continue;
		}
	}
	console.log(mineField);
	isGameOn = 1;
}


function markArea(row, column) {
	if (row === 0 && column === 0) {
		mineField[row + 1][column] += 1;
		mineField[row][column + 1] += 1;
		mineField[row + 1][column + 1] += 1;
	}	else if (row === 0 && column === fieldSize - 1) {
		mineField[row + 1][column] += 1;
		mineField[row][column - 1] += 1;
		mineField[row + 1][column - 1] += 1;
	}	else if (row === fieldSize - 1 && column === 0) {
		mineField[row - 1][column] += 1;
		mineField[row][column + 1] += 1;
		mineField[row - 1][column + 1] += 1;
	}	else if (row === fieldSize - 1 && column === fieldSize - 1) {
		mineField[row - 1][column] += 1;
		mineField[row][column - 1] += 1;
		mineField[row - 1][column - 1] += 1;
	}	else if (row === 0 && column > 0 && column < fieldSize - 1) {
		mineField[row][column + 1] += 1;
		mineField[row][column - 1] += 1;
		mineField[row + 1][column - 1] += 1;
		mineField[row + 1][column] += 1;
		mineField[row + 1][column + 1] += 1;
	}	else if (row === fieldSize - 1 && column > 0 && column < fieldSize - 1) {
		mineField[row][column + 1] += 1;
		mineField[row][column - 1] += 1;
		mineField[row - 1][column - 1] += 1;
		mineField[row - 1][column] += 1;
		mineField[row - 1][column + 1] += 1;
	}	else if (column === 0 && row > 0 && row < fieldSize - 1) {
		mineField[row - 1][column] += 1;
		mineField[row + 1][column] += 1;
		mineField[row - 1][column + 1] += 1;
		mineField[row][column + 1] += 1;
		mineField[row + 1][column + 1] += 1;
	} else if (column === fieldSize - 1 && row > 0 && row < fieldSize - 1) {
		mineField[row - 1][column] += 1;
		mineField[row + 1][column] += 1;
		mineField[row - 1][column - 1] += 1;
		mineField[row][column - 1] += 1;
		mineField[row + 1][column - 1] += 1;
	} else {
		mineField[row - 1][column - 1] += 1;
		mineField[row - 1][column] += 1;
		mineField[row - 1][column + 1] += 1;
		mineField[row][column - 1] += 1;
		mineField[row][column + 1] += 1;
		mineField[row + 1][column - 1] += 1;
		mineField[row + 1][column] += 1;
		mineField[row + 1][column + 1] += 1;
	}
}


createTable(fieldSize, fieldSize);

let tds = document.getElementsByTagName("td");
for (let i = 0; i < tds.length; ++i) {
	tds[i].addEventListener("click", function() {
        clickCell(Math.floor(i / fieldSize), i % fieldSize);
  });
	tds[i].addEventListener("contextmenu", function(e) {
				e.preventDefault();
        rightClickCell(Math.floor(i / fieldSize), i % fieldSize);
  });
}
createMineField();