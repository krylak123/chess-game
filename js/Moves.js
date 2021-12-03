const table = [
  ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
  ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
  ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
  ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
  ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
  ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
  ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
  ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],
];

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

  checkPositionOccupiedByPieceColorWhite(newPosY, newPosX, position) {
    const coord = this.coords.convertToBoardNotation([[newPosY, newPosX]]);

    if (position[coord[0]]) {
      if (position[coord[0]].search(/^w/) !== -1) return true;
    }

    return false;
  }

  checkPositionOccupiedByPieceColorBlack(newPosY, newPosX, position) {
    const coord = this.coords.convertToBoardNotation([[newPosY, newPosX]]);

    if (position[coord[0]]) {
      if (position[coord[0]].search(/^b/) !== -1) return true;
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
        if (this.checkPositionOccupiedByPieceColorWhite(newPosY, newPosX, position)) continue;

        moves.push([newPosY, newPosX]);
      }
    } else {
      for (let direct of directionsB) {
        let newPosY = posY + direct[0];
        let newPosX = posX + direct[1];

        if (newPosY > 7) continue;
        if (this.checkPositionOccupiedByPieceColorBlack(newPosY, newPosX, position)) continue;

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

    if (piece.search(/^w/) !== -1) {
      for (let direct of directions) {
        let newPosY = posY + direct[0];
        let newPosX = posX + direct[1];

        if (newPosY < 0 || newPosY > 7 || newPosX < 0 || newPosX > 7) continue;
        if (this.checkPositionOccupiedByPieceColorWhite(newPosY, newPosX, position)) continue;

        moves.push([newPosY, newPosX]);
      }
    } else {
      for (let direct of directions) {
        let newPosY = posY + direct[0];
        let newPosX = posX + direct[1];

        if (newPosY < 0 || newPosY > 7 || newPosX < 0 || newPosX > 7) continue;
        if (this.checkPositionOccupiedByPieceColorBlack(newPosY, newPosX, position)) continue;

        moves.push([newPosY, newPosX]);
      }
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

    if (piece.search(/^w/) !== -1) {
      for (let direct of directions) {
        let newPosY = posY + direct[0];
        let newPosX = posX + direct[1];

        if (newPosY < 0 || newPosY > 7 || newPosX < 0 || newPosX > 7) continue;
        if (this.checkPositionOccupiedByPieceColorWhite(newPosY, newPosX, position)) continue;

        moves.push([newPosY, newPosX]);
      }
    } else {
      for (let direct of directions) {
        let newPosY = posY + direct[0];
        let newPosX = posX + direct[1];

        if (newPosY < 0 || newPosY > 7 || newPosX < 0 || newPosX > 7) continue;
        if (this.checkPositionOccupiedByPieceColorBlack(newPosY, newPosX, position)) continue;

        moves.push([newPosY, newPosX]);
      }
    }

    return this.coords.convertToBoardNotation(moves);
  }

  generateMoves(source, piece, position) {
    const coords = this.coords.convertToTableNotation(source);
    const moves = this.getCurrentPieceMoves(piece, coords, position);

    return moves;
  }
}
