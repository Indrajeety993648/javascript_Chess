// //Knight Constructor
// var Knight = function(config) {
//     Piece.call(this, config);  // Call the parent constructor
//     this.type = 'knight';      // Set the type to 'knight'
// };

// Knight.prototype = Object.create(Piece.prototype);
// Knight.prototype.constructor = Knight;

// Knight.prototype.moveTo = function(targetPosition) {
//     const currentCol = this.position[0];                  
//     const currentRow = parseInt(this.position[1], 10);    
//     const targetCol = targetPosition.col;                 
//     const targetRow = parseInt(targetPosition.row, 10);   

//     // Calculate the column and row difference
//     const colDiff = Math.abs(currentCol.charCodeAt(0) - targetCol.charCodeAt(0));
//     const rowDiff = Math.abs(currentRow - targetRow);

//     if ((colDiff === 2 && rowDiff === 1) || (colDiff === 1 && rowDiff === 2)) {
//         this.position = targetCol + targetRow;  // Update the position
//         this.render();                          // Render the new position
//     } else {
//         console.warn("Invalid move for Knight");
//     }
// };

// Knight.prototype.render = function() {
//     Piece.prototype.render.call(this); 
// };

var King = function(config){
    this.type = 'king';
    this.constructor(config);
};



King.prototype = new Piece({});
King.prototype.move = function(newPosition){

}