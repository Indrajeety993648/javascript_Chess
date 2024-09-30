var Pawn = function(config){
    this.type = 'pawn';
    this.constructor(config);
};

Pawn.prototype = new Piece({});

Pawn.prototype.isValidPosition = function(targetPosition){
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));
    
    let moveDistance = this.color === 'white' ? 1 : -1;
    let initialRow = this.color === 'white' ? 2 : 7;
    let targetPiece = this.board.getPieceAt(targetPosition);

    //Check if move is valid
    if(!targetPiece && targetPosition.col === currentCol){
        if(targetPosition.row === (currentRow+moveDistance).toString()){
            //Regular one square move
            return true;
        } else if(currentRow === initialRow && (targetPosition.row === (currentRow + 2*moveDistance).toString())){
            return true;
        }
    } else if (Math.abs(targetPosition.col.charCodeAt(0) - currentCol.charCodeAt(0)) === 1 &&
            targetPosition.row === (currentRow + moveDistance).toString()) {
        if (targetPiece && targetPiece.color !== this.color) {
            targetPiece.kill(targetPiece);
            return true;
        }
    }

    // If none of the above conditions are met, the move is invalid
    console.warn("Invalid move for pawn");
    return false;
}

Pawn.prototype.moveTo = function(targetPosition){
    if(this.isValidPosition(targetPosition)){
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        this.board.switchPlayer();
    } else {
        this.board.invalidMove();
    }
}