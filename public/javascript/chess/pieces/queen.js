var Queen = function(config){
    this.type = 'queen';
    this.constructor(config);
};

Queen.prototype = new Piece({});

Queen.prototype.isValidPosition = function(newPosition) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));
    
    let newCol = newPosition.col;
    let newRow = parseInt(newPosition.row);
    let targetPiece = this.board.getPieceAt(newPosition);

    const isHorizontalMove = (currentRow === newRow && currentCol !== newCol);
    const isVerticalMove = (currentCol === newCol && currentRow !== newRow);
    const isDiagonalMove = (Math.abs(currentCol.charCodeAt(0) - newCol.charCodeAt(0)) === Math.abs(currentRow - newRow));

    if (isHorizontalMove || isVerticalMove || isDiagonalMove) {

        if (isHorizontalMove) {
            let start = Math.min(currentCol.charCodeAt(0), newCol.charCodeAt(0)) - 63;
            let end = Math.max(currentCol.charCodeAt(0), newCol.charCodeAt(0)) - 64;
            for(let i = start; i < end; i++){
                let targetPosition = {row: currentRow, col: String.fromCharCode(i + 64)};
                let targetPiece = this.board.getPieceAt(targetPosition);
                if(targetPiece) {
                    console.warn("Invalid move for queen (horizontal block)");
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
                    console.warn("Invalid move for queen (vertical block)");
                    return false;
                }
            }
        }

        if (isDiagonalMove) {
            let colStep = (newCol.charCodeAt(0) - currentCol.charCodeAt(0)) / Math.abs(newCol.charCodeAt(0) - currentCol.charCodeAt(0));
            let rowStep = (newRow - currentRow) / Math.abs(newRow - currentRow);
            let steps = Math.abs(newRow - currentRow);

            for (let i = 1; i < steps; i++) {
                let targetPosition = {
                    row: currentRow + i * rowStep,
                    col: String.fromCharCode(currentCol.charCodeAt(0) + i * colStep)
                };
                let targetPiece = this.board.getPieceAt(targetPosition);
                if(targetPiece) {
                    console.warn("Invalid move for queen (diagonal block)");
                    return false;
                }
            }
        }

        if (targetPiece && targetPiece.color !== this.color) {
            targetPiece.kill(targetPiece);
        }

        return true;
    }

    console.warn("Invalid move for queen");
    return false;
};

Queen.prototype.moveTo = function(newPosition){
    if(this.isValidPosition(newPosition)){
        this.position = newPosition.col + newPosition.row;
        this.render();
        this.board.switchPlayer();
    } else {
        this.board.invalidMove();
    }
};