/*
 * This is an enumerated type to hold the types of cells required to represent a maze.
 */
MazeCellTypes = {
	WALL: '#',
	PASSAGEWAY: ' ',
	SOLUTION: '@',
}

class MazeCell {
	constructor(row, col, type) {
		this.row = row;
		this.col = col;
		this.type = type;
	}
	
	projection(){
		return '['+this.row+','+this.col+']'
	}
}

class Maze {
	/* 
	 *this function constructs the maze object, and accepts an argument,
	 * plainTextMaze, which is an nxn string representation of a maze
	 * with each cell described by single-character MazeCellTypes.
	 */
	
	constructor(plainTextMaze) {
		// split the string into rows
		this.maze = plainTextMaze.split('\n')

		for (var i = 0; i < this.maze.length; i++) {
			// store each row as a char array
			this.maze[i] = this.maze[i].split('');

			for (var j = 0; j < this.maze[i].length; j++) {
				var type = this.maze[i][j];
				this.maze[i][j] = new MazeCell(i, j, type);
			}
		}

		this.start = this.maze[1][0];
		this.destination = this.maze[this.maze.length-2][this.maze[0].length-1];
		this.destination.type = MazeCellTypes.PASSAGEWAY;
	}

	/*
	 * this function determines whether the argument cell meets the destination criteria
	 */
	destinationPredicate(cell) {
		if (this.destination.row === cell.row && this.destination.col == cell.col)
			return true;
		else
			return false;
	}

	/*
	 * this function returns all of the neighbors of the argument cell (it does not
	 * check whether those neighbors have been visited)
	 */
	getNeighbors(cell) {
		var neighbors = [];

		// can you move up?
		if (cell.row - 1 >= 0 &&
			this.maze[cell.row - 1][cell.col].type === MazeCellTypes.PASSAGEWAY) {
			neighbors.push(this.maze[cell.row - 1][cell.col]);
		}
		// can you move left?
		if (cell.col - 1 >= 0 &&
			this.maze[cell.row][cell.col - 1].type === MazeCellTypes.PASSAGEWAY) {
			neighbors.push(this.maze[cell.row][cell.col - 1]);
		}
		// can you move down?
		if (cell.row + 1 < this.maze.length &&
			this.maze[cell.row + 1][cell.col].type === MazeCellTypes.PASSAGEWAY) {
			neighbors.push(this.maze[cell.row + 1][cell.col])
		}
		// can you move right?
		if (cell.col + 1 < this.maze[cell.row].length &&
			this.maze[cell.row][cell.col + 1].type === MazeCellTypes.PASSAGEWAY) {
			neighbors.push(this.maze[cell.row][cell.col + 1]);
		}
		

		return neighbors;
	}

	
	/*
	 * this function uses a breadth first search to solve the maze. When the solution
	 * is found, the function modifies the maze by marking each cell of the solution
	 * with the type MazeCellTypes.SOLUTION. The function returns the number of cells
	 * that it needed to visit to find the path.
	 */
	solveMazeBFS() {
		var firstElement = this.start;
		// create the queue to hold the cells we have visited but need
		// to return to explore (we will treat the array like a queue)
		var queue = new Array()
		queue.push(firstElement);

		// create a set to hold the cells we have visited and add the 
		// first element
		var visited = new Set();
		visited.add(firstElement.projection())
		
		// create a map to hold cells to parents, set first element's
		// parents as false (is source cell). Generally, the parents
		// map will have projection values as keys and objects as values.
		var parents = new Array();
		parents[firstElement.projection()] = false;
		
		// iterationCounter prevents infinite loops
		var iterationCounter = 0;
		
		// enter your code here
		while (iterationCounter<Math.pow(this.maze.length,4) && queue.length >= 1) {
			iterationCounter++;
			
			// get the next element in the queue
			var current = queue.shift();

			// test to see if it meets the destination criteria
			if (this.destinationPredicate(current)) {
				// we've found the path! Awesome!
				break;
			}

			// get the neighbors of the current cell (passageways)
			var neighbors = this.getNeighbors(current);

			// one by one, add neighbors to the queue
			for(var i=0;i<neighbors.length;i++){
				 
				var neighbor = neighbors[i].projection();
				
				// see if we've already visited this cell
				if(!visited.has(neighbor)){
					// if we haven't,  add it to the visited set
					visited.add(neighbor);
					// add current as the neighbor's parent
					parents[neighbor]=current;
					// add the neighbor to the queue
					queue.push(neighbors[i])
				}
			}
		}

		// backtrack through each cell's parent and set path cells to type
		// solution
		iterationCounter = 0;
		while(iterationCounter < Math.pow(this.maze.length,4) && current){
			current.type = MazeCellTypes.SOLUTION;
			current = parents[current.projection()];
			iterationCounter++;
		}	
		
		return visited.size;
	}
	
	/*
	 * this function uses a depth first search to solve the maze. When the solution
	 * is found, the function modifies the maze by marking each cell of the solution
	 * with the type MazeCellTypes.SOLUTION. The function returns the number of cells
	 * that it needed to visit to find the path.
	 */
	solveMazeDFS() {
		// TODO
		return 0;
	}
	
	/*
	 * this function returns the number of cells that are included in the solution path.
	 */
	cellsInSolution(){
		var numCellsInSolution = 0;
		for (var i = 0; i < this.maze.length; i++) {
			for (var j = 0; j < this.maze[i].length; j++) {
				if (this.maze[i][j].type === MazeCellTypes.SOLUTION){
					numCellsInSolution++;
				}
			}
		}
		return numCellsInSolution;
	}
}

