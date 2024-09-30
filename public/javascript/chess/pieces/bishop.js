// Bishop Constructor
var Bishop = function(config) {  
    Piece.call(this, config);  // Call the parent constructor  
    this.type = 'bishop';      // Set the type to 'bishop'  
};

// Inherit from Piece
Bishop.prototype = Object.create(Piece.prototype);
Bishop.prototype.constructor = Bishop;

// Bishop move logic
Bishop.prototype.moveTo = function(targetPosition) {  
    const currentCol = this.position[0];  // Current column (e.g., 'C')  
    const currentRow = parseInt(this.position[1], 10);  // Current row (e.g., 3)  
    const targetCol = targetPosition.col;  // Target column (e.g., 'E')  
    const targetRow = parseInt(targetPosition.row, 10);  // Target row (e.g., 5)  

    // Calculate the column and row differences
    const colDiff = Math.abs(currentCol.charCodeAt(0) - targetCol.charCodeAt(0));  
    const rowDiff = Math.abs(currentRow - targetRow);  

    // Check if the move is diagonal (column difference equals row difference)
    if (colDiff === rowDiff) {  
        this.position = targetCol + targetRow;  // Update the position  
        this.render();  // Render the bishop at the new position
        this.board.switchPlayer();  // Switch player after the valid move
    } else {  
        console.warn("Invalid move for Bishop: Must move diagonally.");  
        this.board.invalidMove();  // Handle invalid move
    }  
};

// Reuse the render method from Piece
Bishop.prototype.render = function() {  
    Piece.prototype.render.call(this);  // Call the parent's render method  
};
