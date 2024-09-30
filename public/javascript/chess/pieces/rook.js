// Rook Constructor
var Rook = function(config) {
    this.type = 'rook';
    Piece.call(this, config); // Call the parent constructor (Piece)
};

// Inherit from Piece
Rook.prototype = Object.create(Piece.prototype);
Rook.prototype.constructor = Rook;

// Method to check if the move is valid for the rook
Rook.prototype.isValidMove = function(targetPosition) {
    if (!targetPosition || !targetPosition.col || !targetPosition.row) {
        console.warn("Invalid target position");
        return false;
    }

    // Convert current and target positions to 0-based indices
    let currentCol = this.position.charCodeAt(0) - 65; // Convert A-H to 0-7
    let currentRow = parseInt(this.position.charAt(1)) - 1; // Convert 1-8 to 0-7
    let targetCol = targetPosition.col.charCodeAt(0) - 65;
    let targetRow = parseInt(targetPosition.row) - 1;

    // Check if the move is horizontal or vertical
    if (currentCol !== targetCol && currentRow !== targetRow) {
        console.warn("Invalid move for rook: not horizontal or vertical");
        return false;
    }

    // If the move is horizontal or vertical, it's valid (ignoring board/blocking logic)
    return true;
};

// Method to move the rook to the target position
Rook.prototype.moveTo = function(targetPosition) {
    const result = this.isValidMove(targetPosition);
    if (result === true) {
        // Move the rook to the new position
        this.position = targetPosition.col + targetPosition.row;
        this.render(); // Call the render method to update the piece's position
        this.board.switchPlayer(); // Switch player after a valid move
        return true;
    }
    this.board.invalidMove(); // Handle invalid move
    return false; // Invalid move
};

// Method to "remove" the rook (capture)
Rook.prototype.kill = function() {
    if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
    }
    this.position = null; // Clear the position
};

// Render method (inherits from Piece)
Rook.prototype.render = function() {
    Piece.prototype.render.call(this); // Call the parent render method
};
