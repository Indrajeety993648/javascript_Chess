var King = function(config){
    this.type = 'king';
    this.constructor(config);
};



King.prototype = new Piece({});
King.prototype.isValidPosition = function(targetPosition){
    let currentCol = this.position[0].toUpperCase();  // Current column (letter)
    let currentRow = parseInt(this.position[1], 10);  // Current row (number)
    let targetRow = parseInt(targetPosition.row, 10);
    let targetCol = targetPosition.col.toUpperCase();

    console.log('currR: ', currentRow, " type: ", typeof currentRow);
    console.log('currC: ', currentCol, " type: ", typeof currentCol);
    console.log('targetR: ', targetRow, " type: ", typeof targetRow );
    console.log('targetC: ', targetCol, " type: ", typeof targetCol );

    // Calculating  row and column differences
    let rowDiff = Math.abs(targetRow - currentRow);
    let colDiff = Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0));

    // King can move one square in any direction
    if (this.color === this.board.currentPlayer && rowDiff <= 1 && colDiff <= 1) {
        let targetPiece = this.board.getPieceAt(targetPosition);
    
        if (targetPiece && targetPiece.color !== this.color) {
            targetPiece.kill(targetPiece);
        }
        return true;
    }
    
    console.warn("Invalid move for King");
    return false;
}

King.prototype.moveTo = function(targetPosition){

    if (this.isValidPosition(targetPosition)) {
        console.log("start");
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        this.board.switchPlayer();
        return console.log("yes end");
    }
    return console.log("no");
}