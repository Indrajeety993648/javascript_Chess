var King = function(config) {
    Piece.call(this, config);
    this.type = 'king';
};

King.prototype = Object.create(Piece.prototype);
King.prototype.constructor = King;

// Helper function to check if the move puts the king in check
King.prototype.isInCheck = function(position) {
    // Logic to determine if the king is in check after moving to 'position'
    // You can implement your isKingInCheck logic here using the game state
    return false; // Placeholder; implement your check logic
};

// Helper function to validate if the king's move is valid
King.prototype.isValidPosition = function(targetPosition) {
    const currentCol = this.position[0].toUpperCase();  // Current column (letter)
    const currentRow = parseInt(this.position[1], 10);  // Current row (number)
    const targetRow = parseInt(targetPosition.row, 10);
    const targetCol = targetPosition.col.toUpperCase();

    // Calculating row and column differences
    const rowDiff = Math.abs(targetRow - currentRow);
    const colDiff = Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0));

    // King can move one square in any direction
    if (rowDiff <= 1 && colDiff <= 1) {
        // Check if there is an enemy piece at the target position
        const targetPiece = this.board.getPieceAt(targetPosition);
        if (targetPiece && targetPiece.color !== this.color) {
            targetPiece.kill(targetPiece);
        }
        return true;
    }
    return false;
};

// Function to move the king to the target position
King.prototype.moveTo = function(targetPosition) {
    if (this.isValidPosition(targetPosition)) {
        const newPosition = targetPosition.col + targetPosition.row;

        // Check if moving to the new position puts the king in check
        if (!this.isInCheck(newPosition)) {
            this.position = newPosition;  
            this.render();  // Render the king in the new position
            this.board.switchPlayer();  // Switch player after valid move
        } else {
            console.warn("Move puts King in check");
        }
    } else {
        console.warn("Invalid move for King");
    }
};

// Rendering the king
King.prototype.render = function() {
    Piece.prototype.render.call(this); 
};
