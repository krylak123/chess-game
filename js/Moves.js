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

  getCurrentPieceMoves(piece, coords) {
    if (piece.search(/P/) !== -1) {
      return this.pawnMoves(piece, coords);
    } else if (piece.search(/Q/) !== -1) {
      return this.queenMoves(piece, coords);
    } else if (piece.search(/K/) !== -1) {
      return this.kingMoves(piece, coords);
    }
  }

  pawnMoves(piece, coords) {
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

        moves.push([newPosY, newPosX]);
      }
    } else {
      for (let direct of directionsB) {
        let newPosY = posY + direct[0];
        let newPosX = posX + direct[1];

        if (newPosY > 7) continue;

        moves.push([newPosY, newPosX]);
      }
    }

    return this.coords.convertToBoardNotation(moves);
  }

  queenMoves(piece, coords) {
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

        if (newPosY < 0 || newPosY > 7) continue;

        moves.push([newPosY, newPosX]);
      }
    } else {
      for (let direct of directions) {
        let newPosY = posY + direct[0];
        let newPosX = posX + direct[1];

        if (newPosY < 0 || newPosY > 7) continue;

        moves.push([newPosY, newPosX]);
      }
    }

    return this.coords.convertToBoardNotation(moves);
  }

  kingMoves(piece, coords) {
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

        if (newPosY < 0 || newPosY > 7) continue;

        moves.push([newPosY, newPosX]);
      }
    } else {
      for (let direct of directions) {
        let newPosY = posY + direct[0];
        let newPosX = posX + direct[1];

        if (newPosY < 0 || newPosY > 7) continue;

        moves.push([newPosY, newPosX]);
      }
    }

    return this.coords.convertToBoardNotation(moves);
  }

  generateMoves(source, piece) {
    const coords = this.coords.convertToTableNotation(source);
    const moves = this.getCurrentPieceMoves(piece, coords);

    return moves;
  }
}
