//var defaultPlayer = 'A'; //Player A is the the first player to drop.
	var playerA;
	var playerB;
	var playerTurn;
	var boardArray;
	var gameOver;
	
	function init() {
		playerA = 'A';
		playerB = 'B';
		playerTurn = playerA;
		gameOver = 0;
		boardArray = [ [ null, null, null, null, null, null, null ],
				[ null, null, null, null, null, null, null ],
				[ null, null, null, null, null, null, null ],
				[ null, null, null, null, null, null, null ],
				[ null, null, null, null, null, null, null ],
				[ null, null, null, null, null, null, null ], ];
		
			
		for (var i = 0; i <= 5; i++) {
			for (var j = 0; j <= 6; j++) {
				document.getElementById(i + '_' + j).className = "whitecircle";
			}
		}

		document.getElementById('toggleTurn').innerHTML = "Your turn: Player A";
		document.getElementById('toggleTurn').style.color = "black";
	}

	function toggleColorEnter(id) {
		var element = document.getElementById(id);
		if (playerTurn == playerA) {
			element.className = "yellowcircle";
		} else {
			element.className = "bluecircle";
		}
	}

	function toggleColorLeave(id) {
		var element = document.getElementById(id);
		element.className = "graycircle";
	}

	function dropDisc(col) {
		if (boardArray[0][col - 1] != null || gameOver == 1) {
			return;
		}
		for (var i = 5; i >= 0; i--) {
			if (boardArray[i][col - 1] == null) {
				if (playerTurn == playerA) {
					boardArray[i][col - 1] = playerA;
					document.getElementById(i + '_' + (col - 1)).className = "yellowcircle";
					document.getElementById('col' + col).className = "bluecircle";
					document.getElementById('toggleTurn').innerHTML = "Your turn: Player B";
					playerTurn = playerB;
				} else {
					boardArray[i][col - 1] = playerB;
					document.getElementById(i + '_' + (col - 1)).className = "bluecircle";
					document.getElementById('col' + col).className = "yellowcircle";
					document.getElementById('toggleTurn').innerHTML = "Your turn: Player A";
					playerTurn = playerA;
				}
				checkFormations(i, col - 1);
				break;
			} else {
				continue;
			}
		}
	}

	function checkFormations(discRow, discCol) {
		var discVal = boardArray[discRow][discCol];
		checkVerticalFormation(discRow, discCol, discVal);
		checkHorizontalFormation(discRow, discCol, discVal);
		checkDiagonalLeftFormation(discRow, discCol, discVal);
		checkDiagonalRightFormation(discRow, discCol, discVal);
	}

	function checkVerticalFormation(discRow, discCol, discVal) {
		var count = 1;
		var discArray = [];
		discArray.push(discRow + '_' + discCol);
		for (var i = discRow + 1; i <= 5; i++) {
			if (boardArray[i][discCol] == discVal) {
				count++;
				discArray.push(i + '_' + discCol);
			} else {
				break;
			}
		}
		if (count == 4) {
			gameOver = 1;
			blinkDisc(discVal, discArray);
			showWinner(discVal);
		}
	}

	function checkHorizontalFormation(discRow, discCol, discVal) {
		var count = 1;
		var discArray = [];
		discArray.push(discRow + '_' + discCol);
		for (var i = discCol + 1; i <= 6; i++) {
			if (boardArray[discRow][i] == discVal) {
				count++;
				discArray.push(discRow + '_' + i);
			} else {
				break;
			}
		}

		for (var j = discCol - 1; j >= 0; j--) {
			if (boardArray[discRow][j] == discVal) {
				count++;
				discArray.push(discRow + '_' + j);
			} else {
				break;
			}
		}
		if (count == 4) {
			gameOver = 1;
			blinkDisc(discVal, discArray);
			showWinner(discVal);
		}
	}

	function checkDiagonalRightFormation(discRow, discCol, discVal) {
		var count = 1;
		var i = discRow;
		var j = discCol;
		var discArray = [];
		discArray.push(discRow + '_' + discCol);
		while (i != 5 && j != 0) {
			i++;
			j--;
			if (boardArray[i][j] == discVal) {
				count++;
				discArray.push(i + '_' + j);
			} else {
				break;
			}
		}
		i = discRow;
		j = discCol;
		while (i != 0 && j != 6) {
			i--;
			j++;
			if (boardArray[i][j] == discVal) {
				count++;
				discArray.push(i + '_' + j);
			} else {
				break;
			}
		}
		if (count == 4) {
			gameOver = 1;
			blinkDisc(discVal, discArray);
			showWinner(discVal);
		}
	}

	function checkDiagonalLeftFormation(discRow, discCol, discVal) {
		var count = 1;
		var i = discRow;
		var j = discCol;
		var discArray = [];
		discArray.push(discRow + '_' + discCol);
		while (i != 5 && j != 6) {
			i++;
			j++;
			if (boardArray[i][j] == discVal) {
				count++;
				discArray.push(i + '_' + j);
			} else {
				break;
			}
		}
		i = discRow;
		j = discCol;
		while (i != 0 && j != 0) {
			i--;
			j--;
			if (boardArray[i][j] == discVal) {
				count++;
				discArray.push(i + '_' + j);
			} else {
				break;
			}
		}
		if (count == 4) {
			gameOver = 1;
			blinkDisc(discVal, discArray);
			showWinner(discVal);
		}
	}

	function showWinner(discVal) {
		if (discVal == playerA) {
			document.getElementById('toggleTurn').innerHTML = "The winner is Player A!";
		} else {
			document.getElementById('toggleTurn').innerHTML = "The winner is Player B!";
		}
		document.getElementById('toggleTurn').style.color = "red";
	}

	function blinkDisc(discVal, discArray) {
		for (var i = 0; i < discArray.length; i++) {
			if (discVal == playerA) {
				document.getElementById(discArray[i]).className = "yellowcircleBlinking";
			} else {
				document.getElementById(discArray[i]).className = "bluecircleBlinking";
			}
		}
	}