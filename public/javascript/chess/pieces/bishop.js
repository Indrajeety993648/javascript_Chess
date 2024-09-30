var Bishop = function(config){
    this.type = 'bishop';
    this.constructor(config);
};

Bishop.prototype = new Piece({});

Bishop.prototype.isValid = function (targetPosition){
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));
    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);
    let targetPiece = this.board.getPieceAt(targetPosition);
    
    // Check if the move is diagonal
    if (Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0)) === Math.abs(targetRow - currentRow)) {
        // Check if the path is clear
        let colStep = targetCol > currentCol ? 1 : -1;
        let rowStep = targetRow > currentRow ? 1 : -1;
        let col = currentCol.charCodeAt(0) + colStep;
        let row = currentRow + rowStep;
        
        while (String.fromCharCode(col) !== targetCol || row !== targetRow) {
            if (this.board.getPieceAt({col: String.fromCharCode(col), row: row})) {
                return false;
            }
            col += colStep;
            row += rowStep;
        }
        
        if(targetPiece && targetPiece.color !== this.color){
            targetPiece.kill(targetPiece);
        }
        return true;
    }

    return false;
}

Bishop.prototype.moveTo = function(newPosition){
    if(this.isValid(newPosition)){
        this.position = newPosition.col + newPosition.row;
        this.render();
        this.board.switchPlayer();
    } else {
        this.board.invalidMove();
    }
}