/*
 * this function displays the maze to the screen
 */
function showMaze(m,title) {
	// get the table with id="maze" so we can add elements to it
	var $mazeTable = $('<table class="maze"></table>');
	// set the width proportional to the size of the maze
	$mazeTable.width(m.maze.length * 10 + 'px');
	// loop through each row in the table
	for (var i = 0; i < m.maze.length; i++) {
		// create a row in the table
		var $mazeRow = $('<tr class="mazeRow"></tr>')
		for (var j = 0; j < m.maze[i].length; j++) {
			// create the cell
			var $cell = $('<td>&nbsp;</td>')
				// colorize the cells
			if (m.maze[i][j].type === MazeCellTypes.WALL) $cell.addClass('wall');
			else if (m.maze[i][j].type === MazeCellTypes.SOLUTION) $cell.addClass('path');
			else $cell.addClass('passageway')
			$mazeRow.append($cell);
		}
		$mazeTable.append($mazeRow);
	}
	var $mazeDiv = $('#mazeDiv');
	$mazeDiv.append($mazeTable);
}

/*
 * this is the "main" method, the method that will set the maze creation and solving into motion
 */
		
$(document).ready(function () {
	// get the HTML element with id outputDiv, so we can add some result meta
	var $outputDiv = $('#outputDiv');

	
	// generate the maze in plain txt
	var plainTextMaze = generateMaze(51);
	
	
	// SET UP AND PERFORM BREADTH FIRST SEARCH
	// initialize the maze object
	var mBFS = new Maze(plainTextMaze);
	// solve the maze and store the number of nodes visited
	var numCellsVisitedBFS = mBFS.solveMazeBFS();
	// get the length of the solution:
	var numCellsInSolutionBFS = mBFS.cellsInSolution()
	// log some data
	$outputDiv.append('<p>');
	$outputDiv.append('<b>BREADTH FIRST SEARCH</b><br/>');
	$outputDiv.append('Number of cells visited: '+numCellsVisitedBFS+'<br/>');
	$outputDiv.append('Number of cells in solution: '+numCellsInSolutionBFS+'<br/>');
	$outputDiv.append('</p>');
	// display the maze
	showMaze(mBFS);
	
	
	// SET UP AND PERFORM DEPTH FIRST SEARCH
	// initialize the maze object
	mDFS = new Maze(plainTextMaze);
	// solve the maze and store the number of nodes visited
	numCellsVisitedDFS = mDFS.solveMazeDFS();
	// get the length of the solution:
	numCellsInSolutionDFS = mDFS.cellsInSolution()
	// log some data
	$outputDiv.append('<p>');
	$outputDiv.append('<b>DEPTH FIRST SEARCH</b><br/>');
	$outputDiv.append('Number of cells visited: '+numCellsVisitedDFS+'<br/>');
	$outputDiv.append('Number of cells in solution: '+numCellsInSolutionDFS+'<br/>');
	$outputDiv.append('</p>');
	// the solution to the maze will be the same (by the definition of "perfect maze") so we
	// don't need to display the maze again.
});
