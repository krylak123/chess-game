class Moves {
  constructor() {
    this.coords = new Coordinates();
  }

  getCurrentPieceMoves(piece, coords, position) {
    if (piece.search(/P/) !== -1) {
      return this.pawnMoves(piece, coords, position);
    } else if (piece.search(/Q/) !== -1) {
      return this.queenMoves(piece, coords, position);
    } else if (piece.search(/K/) !== -1) {
      return this.kingMoves(piece, coords, position);
    }
  }

  checkPositionOccupiedByPiece(newPosY, newPosX, position, color) {
    const coord = this.coords.convertToBoardNotation([[newPosY, newPosX]]);

    if (position[coord[0]]) {
      if (position[coord[0]].search(color) !== -1) return true;
    }

    return false;
  }

  pawnMoves(piece, coords, position) {
    const moves = [];

    const posY = coords[0];
    const posX = coords[1];

    const directionsW = [[-1, 0]];
    const directionsB = [[1, 0]];

    if (piece.search(/^w/) !== -1) {
      for (let direct of directionsW) {
        let newPosY = posY + direct[0];
        let newPosX = posX + direct[1];

        if (newPosY < 0) continue;
        if (this.checkPositionOccupiedByPiece(newPosY, newPosX, position, piece[0])) continue;

        moves.push([newPosY, newPosX]);
      }
    } else {
      for (let direct of directionsB) {
        let newPosY = posY + direct[0];
        let newPosX = posX + direct[1];

        if (newPosY > 7) continue;
        if (this.checkPositionOccupiedByPiece(newPosY, newPosX, position, piece[0])) continue;

        moves.push([newPosY, newPosX]);
      }
    }

    return this.coords.convertToBoardNotation(moves);
  }

  queenMoves(piece, coords, position) {
    const moves = [];

    const posY = coords[0];
    const posX = coords[1];

    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, +1],
      [0, -1],
      [0, +1],
      [1, -1],
      [1, 0],
      [1, +1],
    ];

    for (let direct of directions) {
      let newPosY = posY + direct[0];
      let newPosX = posX + direct[1];

      if (newPosY < 0 || newPosY > 7 || newPosX < 0 || newPosX > 7) continue;
      if (this.checkPositionOccupiedByPiece(newPosY, newPosX, position, piece[0])) continue;

      moves.push([newPosY, newPosX]);
    }

    return this.coords.convertToBoardNotation(moves);
  }

  kingMoves(piece, coords, position) {
    const moves = [];
    const posY = coords[0];
    const posX = coords[1];

    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    for (let direct of directions) {
      let newPosY = posY + direct[0];
      let newPosX = posX + direct[1];

      if (newPosY < 0 || newPosY > 7 || newPosX < 0 || newPosX > 7) continue;
      if (this.checkPositionOccupiedByPiece(newPosY, newPosX, position, piece[0])) continue;

      moves.push([newPosY, newPosX]);
    }

    return this.coords.convertToBoardNotation(moves);
  }

  generateMoves(source, piece, position) {
    const coords = this.coords.convertToTableNotation(source);
    const moves = this.getCurrentPieceMoves(piece, coords, position);

    return moves;
  }
}
