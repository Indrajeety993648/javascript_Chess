var Piece = function(config){
    this.position = config.position;
    this.color = config.color;
    this.board = config.board;
    if(this.position){
        this.render();        
    }    
}
Piece.prototype.moveTo = function(targetPosition){
    console.log("Method not implemeted by: " + this.type);
}


Piece.prototype.attachListeners = function(){
    
}

Piece.prototype.render = function(){
    var col = this.position[0];
    var row = this.position[1];
    var element = document.querySelector(`[data-col="${col}"] [data-row="${row}"]`);
    if (element) {  
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
        // Create a new div element to represent the piece
        var pieceElement = document.createElement('div');
        
        // Add classes to the new element for styling
        pieceElement.classList.add('piece', this.color, this.type);
        
        // Clear any existing content in the cell
        element.innerHTML = '';
        
        // Append the new piece element to the cell
        element.appendChild(pieceElement);
        this.$el = pieceElement;
        this.attachListeners();
    } else {
        console.warn(`Element not found for position: ${this.position}`);
    }
}

Piece.prototype.kill = function(targetPiece){
    const pieces = targetPiece.color === 'white' ? this.board.whitePieces : this.board.blackPieces;
    const pieceType = (targetPiece.type === 'king' || targetPiece.type === 'queen') ? targetPiece.type : targetPiece.type + 's';
    if(targetPiece.type === 'king' || targetPiece.type === 'queen'){
        delete pieces[targetPiece.type];
    } else{
        const index = pieces[pieceType].indexOf(targetPiece);
        if (index !== -1) {
            pieces[pieceType].splice(index, 1);
        }
    }
    
    this.removePiece(targetPiece);
}

Piece.prototype.removePiece = function(config) {
    let $element = document.querySelector(`[data-col="${config.position[0]}"] [data-row="${config.position[1]}"]`);
    if ($element) {
        $element.innerHTML = ''; 
    }
};