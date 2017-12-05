var displayFrontier = true;

/*
 * this function displays the maze to the screen
 */
function getMazeTable(m) {
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
			else if (displayFrontier && m.maze[i][j].type === MazeCellTypes.VISITED) $cell.addClass('visited');
			else if (displayFrontier && m.maze[i][j].type === MazeCellTypes.FRONTIER) $cell.addClass('frontier');
			else $cell.addClass('passageway')
			$mazeRow.append($cell);
		}
		$mazeTable.append($mazeRow);
	}
	return $mazeTable;
}

function showResults(m, title){
	var $outputDiv = $('<div class="outputDiv"></div>');
	counts = m.cellCounts()
	numCellsInSolution = counts['solution'];
	numCellsInFrontier = counts['frontier'];
	numCellsVisited = counts['visited'];
	// log some data
	$outputDiv.append('<p>');
	$outputDiv.append('<b>'+title+'</b><br/>');
	$outputDiv.append('Number of cells in solution: '+numCellsInSolution+'<br/>');
	$outputDiv.append('Number of cells visited: '+numCellsVisited+'<br/>');
	$outputDiv.append('Number of cells in frotier: '+numCellsInFrontier+'<br/>');
	$outputDiv.append('</p>');
	$outputDiv.append(getMazeTable(m))
	$outputDiv.append('<hr>');	
	$('#resultsDiv').append($outputDiv);
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
	// solve the maze
	mBFS.solveMazeBFS();
	// show BFS results
	showResults(mBFS,"BREADTH-FIRST SEARCH");
	
	// SET UP AND PERFORM DEPTH FIRST SEARCH
	// initialize the maze object
	var mDFS = new Maze(plainTextMaze);
	// solve the maze 
	mDFS.solveMazeDFS();
	// show BFS results
	showResults(mDFS,"DEPTH-FIRST SEARCH");
	
	// SET UP AND PERFORM DIJKSTRA'S ALGORITHM
	// initialize the maze object
	var mDFS = new Maze(plainTextMaze);
	// solve the maze 
	mDFS.solveMazeDijkstra();
	// show BFS results
	showResults(mDFS,"DIJKSTRA'S ALGORITHM");
	
	// SET UP AND PERFORM A*
	// initialize the maze object
	var mDFS = new Maze(plainTextMaze);
	// solve the maze 
	mDFS.solveMazeAStar();
	// show BFS results
	showResults(mDFS,"A*");
});
