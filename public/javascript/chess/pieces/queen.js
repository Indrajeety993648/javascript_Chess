var Queen = function(config){
    this.type = 'queen';
    this.constructor(config);
};



Queen.prototype = new Piece({});
Queen.prototype.moveTo = function(newPosition) {
    if (this.isValidMove(newPosition)) {
        this.position = newPosition.col + newPosition.row;
        this.render();
    } else {
        console.warn("Invalid move for the queen.");
    }
};

Queen.prototype.isValidMove = function(targetPosition) {
    const currentCol = this.position[0];
    const currentRow = parseInt(this.position[1]);
    const targetCol = targetPosition.col;
    const targetRow = parseInt(targetPosition.row);

    // Check if the move is horizontal, vertical, or diagonal
    const isHorizontal = (targetCol === currentCol);
    const isVertical = (targetRow === currentRow);
    const isDiagonal = (Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0)) === Math.abs(targetRow - currentRow));

    // Check if the move is valid
    if (isHorizontal || isVertical || isDiagonal) {
        // Check if the target position is within the board
        if (targetCol >= 'A' && targetCol <= 'H' && targetRow >= 1 && targetRow <= 8) {
            return true;
        }
    }

    return false;
};