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

King.prototype.moveTo = function(targetPosition) {
    const currentCol = this.position[0];
    const currentRow = parseInt(this.position[1], 10);
    const targetCol = targetPosition.col;
    const targetRow = parseInt(targetPosition.row, 10);

    const colDiff = Math.abs(currentCol.charCodeAt(0) - targetCol.charCodeAt(0));
    const rowDiff = Math.abs(currentRow - targetRow);

    // Validate King's movement
    if ((colDiff <= 1 && rowDiff <= 1) && (colDiff + rowDiff > 0)) {
        // Check if moving to target position puts the king in check
        const newPosition = targetCol + targetRow;
        if (!this.isInCheck(newPosition)) {
            this.position = newPosition;  
            this.render();                           
        } else {
            console.warn("Move puts King in check");
        }
    } else {
        console.warn("Invalid move for King");
    }
};

King.prototype.render = function() {
    Piece.prototype.render.call(this); 
};
