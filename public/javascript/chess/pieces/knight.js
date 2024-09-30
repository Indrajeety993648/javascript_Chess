var Knight = function(config){
    this.type = 'knight';
    this.constructor(config);
};



Knight.prototype = new Piece({});

Knight.prototype.isValid = function (targetPosition){
    let currentCol = this.position.charAt(0) 
    let currentRow = parseInt(this.position.charAt(1)); 
    let targetCol = targetPosition.col;
    let targetRow = targetPosition.row; 
    let targetPiece = this.board.getPieceAt(targetPosition);
    if (
        (Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0)) === 2 && Math.abs(targetRow - currentRow) === 1) ||
        (Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0)) === 1 && Math.abs(targetRow - currentRow) === 2)
    ) {
        if(targetPiece && targetPiece.color !== this.color){
            targetPiece.kill(targetPiece);
        }
        return true;
    }


    console.warn("Invalid move for knight");
    return false;

}


Knight.prototype.moveTo = function(newPosition){

    if(this.isValid(newPosition)){
        this.position = newPosition.col + newPosition.row;
        this.render();
        this.board.switchPlayer();
    } else {
        this.board.invalidMove();
    }
}