function createTable(rows, columns) {
	let body = document.body;
	let tbl = document.createElement('table');
	tbl.style.border = '1px solid black';
	for (let i = 0; i < rows; ++i) {
		let tr = tbl.insertRow();
		for (let j = 0; j < columns; ++j) {
			let td = tr.insertCell();
			td.className = 'white';
			td.onclick = changeColor;
		}
	}
	body.appendChild(tbl);
}

function changeColor() {
	let cell = event.target;
	if (cell.className == 'white') {
		cell.className = 'black';
	} else {
		cell.className = 'white';
	}
}

function changeColorAll() {
	let tbl = document.getElementsByTagName('table')[0];
	tbl.classList.toggle('invert')
}

createTable(5, 5);