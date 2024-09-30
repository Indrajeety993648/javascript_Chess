var Rook = function(config){
    this.type = 'rook';
    this.constructor(config);
};

Rook.prototype = new Piece({});

Rook.prototype.isValidPosition = function(newPosition){
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));
    
    let newCol = newPosition.col;
    let newRow = parseInt(newPosition.row);
    let targetPiece = this.board.getPieceAt(newPosition);

    const isHorizontalMove = (currentRow === newRow && currentCol !== newCol);
    const isVerticalMove = (currentCol === newCol && currentRow !== newRow);

    if (isHorizontalMove || isVerticalMove) {

        if (isHorizontalMove) {
            let start = Math.min(currentCol.charCodeAt(0), newCol.charCodeAt(0)) - 63;
            let end = Math.max(currentCol.charCodeAt(0), newCol.charCodeAt(0)) - 64;
            for(let i = start; i < end; i++){
                let targetPosition = {row: currentRow, col: String.fromCharCode(i + 64)};
                let targetPiece = this.board.getPieceAt(targetPosition);
                if(targetPiece) {
                    console.warn("Invalid move for rook");
                    return false;
                }
            }
        }

        if (isVerticalMove) {
            let start = Math.min(currentRow, newRow) + 1;
            let end = Math.max(currentRow, newRow);
            for(let i = start; i < end; i++){
                let targetPosition = {row: i, col: newCol};
                let targetPiece = this.board.getPieceAt(targetPosition);
                if(targetPiece) {
                    console.warn("Invalid move for rook");
                    return false;
                }
            }
        }

        if (targetPiece && targetPiece.color !== this.color) {
            targetPiece.kill(targetPiece);
        }

        return true;
    }

    // Invalid move
    console.warn("Invalid move for rook");
    return false;
}

Rook.prototype.moveTo = function(newPosition){
    if(this.isValidPosition(newPosition)){
        this.position = newPosition.col + newPosition.row;
        this.render();
        this.board.switchPlayer();
    } else {
        this.board.invalidMove();
    }
}