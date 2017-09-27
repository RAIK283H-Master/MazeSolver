/*
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomInt(min, max) {
	var r = Math.random();
    return Math.floor(Math.random() * (max - min) + min);
}

/*
 * This function accepts a dimension for the maze's width and height. If that dimension
 * is even, the dimesnion will be incremented. The function returns a text string of
 * mazeHeightWidth rows, each with mazeHeightWidth columns. Passageways are represented
 * by MazeCellTypes.PASSAGEWAY, walls by MazeCellTypes.WALL. 
 */
function generateMaze(mazeHeightWidth) {
	// dimensions should always be odd, so if mazeHeightWidth is even, add one to it.
	if(mazeHeightWidth%2==0){
		mazeHeightWidth++;
	}
	
	maze = [];
	var moves = [];
	for (var i = 0; i < mazeHeightWidth; i++) {
		maze[i] = [];
		for (var j = 0; j < mazeHeightWidth; j++) {
			maze[i][j] = '#';
		}
	}
	var posX = 1;
	var posY = 1;
	maze[posX][posY] = ' ';
	moves.push(posY + posX * mazeHeightWidth);
	while (moves.length) {
		var possibleDirections = "";
		if (posX + 2 > 0 && posX + 2 < mazeHeightWidth - 1 && maze[posX + 2][posY] == MazeCellTypes.WALL) {
			possibleDirections += "S";
		}
		if (posX - 2 > 0 && posX - 2 < mazeHeightWidth - 1 && maze[posX - 2][posY] == MazeCellTypes.WALL) {
			possibleDirections += "N";
		}
		if (posY - 2 > 0 && posY - 2 < mazeHeightWidth - 1 && maze[posX][posY - 2] == MazeCellTypes.WALL) {
			possibleDirections += "W";
		}
		if (posY + 2 > 0 && posY + 2 < mazeHeightWidth - 1 && maze[posX][posY + 2] == MazeCellTypes.WALL) {
			possibleDirections += "E";
		}
		if (possibleDirections) {
			var move =  getRandomInt(0,possibleDirections.length);
			switch (possibleDirections[move]) {
				case "N":
					maze[posX - 2][posY] = MazeCellTypes.PASSAGEWAY;
					maze[posX - 1][posY] = MazeCellTypes.PASSAGEWAY;
					posX -= 2;
					break;
				case "S":
					maze[posX + 2][posY] = MazeCellTypes.PASSAGEWAY;
					maze[posX + 1][posY] = MazeCellTypes.PASSAGEWAY;
					posX += 2;
					break;
				case "W":
					maze[posX][posY - 2] = MazeCellTypes.PASSAGEWAY;
					maze[posX][posY - 1] = MazeCellTypes.PASSAGEWAY;
					posY -= 2;
					break;
				case "E":
					maze[posX][posY + 2] = MazeCellTypes.PASSAGEWAY;
					maze[posX][posY + 1] = MazeCellTypes.PASSAGEWAY;
					posY += 2;
					break;
			}
			moves.push(posY + posX * mazeHeightWidth);
		} else {
			var back = moves.pop();
			posX = Math.floor(back / mazeHeightWidth);
			posY = back % mazeHeightWidth;
		}
	}
	
	// the entry (start) point is ALWAYS the first element of the second row
	maze[1][0] = MazeCellTypes.PASSAGEWAY;
	// the exit (destination) point is ALWAYS the last element of the second to last row
	maze[maze.length-2][maze[0].length-1] = MazeCellTypes.PASSAGEWAY;
	
	// turn maze into plain text one row at a time, then join with newlines
	plainTextMaze = [];
	for(var i=0;i<maze.length;i++){
		plainTextMaze.push(maze[i].join(''));
	}
	plainTextMaze = plainTextMaze.join('\n');
	
	return plainTextMaze;
}