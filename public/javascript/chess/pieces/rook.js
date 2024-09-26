var Rook = function(config, board) {
    this.type = 'rook';
    this.board = board; // Store a reference to the board
    this.constructor(config);
};

Rook.prototype = new Piece({});

Rook.prototype.isValidMove = function(targetPosition) {
    let currentCol = this.position.charCodeAt(0) - 65; // Convert A-H to 0-7
    let currentRow = parseInt(this.position.charAt(1)) - 1; // Convert 1-8 to 0-7
    let targetCol = targetPosition.col.charCodeAt(0) - 65;
    let targetRow = parseInt(targetPosition.row) - 1;

    // Check if the move is horizontal or vertical
    if (currentCol !== targetCol && currentRow !== targetRow) {
        console.warn("Invalid move for rook: not horizontal or vertical");
        return false;
    }

    // Determine direction of movement
    let colStep = currentCol === targetCol ? 0 : (targetCol > currentCol ? 1 : -1);
    let rowStep = currentRow === targetRow ? 0 : (targetRow > currentRow ? 1 : -1);

    // Check for pieces blocking the path
    let col = currentCol + colStep;
    let row = currentRow + rowStep;
    while (col !== targetCol || row !== targetRow) {
        let pieceInPath = this.board.getPieceAt({
            col: String.fromCharCode(col + 65),
            row: (row + 1).toString()
        });
        if (pieceInPath) {
            console.warn("Invalid move for rook: piece blocking path");
            return false;
        }
        col += colStep;
        row += rowStep;
    }

    // Check if there's a piece at the target position
    let pieceAtTarget = this.board.getPieceAt(targetPosition);
    if (pieceAtTarget) {
        if (pieceAtTarget.color === this.color) {
            console.warn("Invalid move for rook: cannot capture own piece");
            return false;
        } else {
            return 'capture'; // Valid capture move
        }
    }

    return true; // Valid move
};

Rook.prototype.move = function(targetPosition) {
    const result = this.isValidMove(targetPosition);
    if (result === true) {
        // Move the rook to the new position
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        return true;
    } else if (result === 'capture') {
        // Capture the piece and move
        let pieceToCapture = this.board.getPieceAt(targetPosition);
        if (pieceToCapture) {
            pieceToCapture.kill();
        }
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        return true;
    }
    return false; // Invalid move
};

Rook.prototype.kill = function() {
    if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
    }
    this.position = null;
};
