var Queen = function(config){
    this.type = 'queen';
    this.constructor(config);
};

Queen.prototype = new Piece({});

// Function to move the queen to the target position
Queen.prototype.moveTo = function(newPosition) {
    if (this.isValidMove(newPosition)) {
        this.position = newPosition.col + newPosition.row;
        this.render();  // Render the queen in the new position
        this.board.switchPlayer();  // Switch player after valid move
    } else {
        console.warn("Invalid move for the queen.");
        this.board.invalidMove();  // Handle invalid move
    }
};

// Helper function to validate the queen's move
Queen.prototype.isValidMove = function(targetPosition) {
    const currentCol = this.position[0];
    const currentRow = parseInt(this.position[1]);
    const targetCol = targetPosition.col;
    const targetRow = parseInt(targetPosition.row);

    // Check if the move is horizontal, vertical, or diagonal
    const isHorizontal = (targetRow === currentRow && currentCol !== targetCol);
    const isVertical = (targetCol === currentCol && currentRow !== targetRow);
    const isDiagonal = (Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0)) === Math.abs(targetRow - currentRow));

    // Validate that the move is either horizontal, vertical, or diagonal
    if (isHorizontal || isVertical || isDiagonal) {
        // Ensure the target position is within the board limits
        if (targetCol >= 'A' && targetCol <= 'H' && targetRow >= 1 && targetRow <= 8) {
            return true;
        }
    }

    // If the move doesn't match any valid pattern, return false
    return false;
};
