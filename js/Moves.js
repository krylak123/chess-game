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

  pawnMovesGenerator(moves, posY, posX, directions, position, piece) {
    for (let direct of directions) {
      const newPosY = posY + direct[0];
      const newPosX = posX + direct[1];

      if (newPosY < 0 || newPosX < 0 || newPosX > 7) continue;
      if (this.checkPositionOccupiedByPiece(newPosY, newPosX, position, piece[0])) continue;

      moves.push([newPosY, newPosX]);
    }
  }

  pawnMoves(piece, coords, position) {
    const moves = [];

    const posY = coords[0];
    const posX = coords[1];

    const directionsW = [-1, 0];
    const directionsB = [1, 0];

    if (piece.search(/^w/) !== -1) {
      let newPosY = posY + directionsW[0];
      let newPosX = posX + directionsW[1];

      const coord1 = this.coords.convertToBoardNotation([[newPosY, newPosX]]);
      const coord2 = this.coords.convertToBoardNotation([[newPosY, newPosX - 1]]);
      const coord3 = this.coords.convertToBoardNotation([[newPosY, newPosX + 1]]);

      if (position[coord1] && position[coord2] && position[coord3]) {
        const directions = [
          [-1, -1],
          [-1, 1],
        ];

        this.pawnMovesGenerator(moves, posY, posX, directions, position, piece);
      } else if (position[coord1] && !position[coord2] && position[coord3]) {
        const directions = [[-1, 1]];

        this.pawnMovesGenerator(moves, posY, posX, directions, position, piece);
      } else if (position[coord1] && position[coord2] && !position[coord3]) {
        const directions = [[-1, -1]];

        this.pawnMovesGenerator(moves, posY, posX, directions, position, piece);
      } else if (!position[coord1] && position[coord2] && position[coord3]) {
        const directions = [
          [-1, 0],
          [-1, -1],
          [-1, 1],
        ];

        this.pawnMovesGenerator(moves, posY, posX, directions, position, piece);
      } else if (!position[coord1] && !position[coord2] && position[coord3]) {
        const directions = [
          [-1, 0],
          [-1, 1],
        ];

        this.pawnMovesGenerator(moves, posY, posX, directions, position, piece);
      } else if (!position[coord1] && position[coord2] && !position[coord3]) {
        const directions = [
          [-1, 0],
          [-1, -1],
        ];

        this.pawnMovesGenerator(moves, posY, posX, directions, position, piece);
      } else if (!position[coord1] && !position[coord2] && !position[coord3]) {
        const directions = [[-1, 0]];

        this.pawnMovesGenerator(moves, posY, posX, directions, position, piece);
      }
    } else {
      let newPosY = posY + directionsB[0];
      let newPosX = posX + directionsB[1];

      const coord1 = this.coords.convertToBoardNotation([[newPosY, newPosX]]);
      const coord2 = this.coords.convertToBoardNotation([[newPosY, newPosX - 1]]);
      const coord3 = this.coords.convertToBoardNotation([[newPosY, newPosX + 1]]);

      if (position[coord1] && position[coord2] && position[coord3]) {
        const directions = [
          [1, -1],
          [1, 1],
        ];

        this.pawnMovesGenerator(moves, posY, posX, directions, position, piece);
      } else if (position[coord1] && !position[coord2] && position[coord3]) {
        const directions = [[1, 1]];

        this.pawnMovesGenerator(moves, posY, posX, directions, position, piece);
      } else if (position[coord1] && position[coord2] && !position[coord3]) {
        const directions = [[1, -1]];

        this.pawnMovesGenerator(moves, posY, posX, directions, position, piece);
      } else if (!position[coord1] && position[coord2] && position[coord3]) {
        const directions = [
          [1, 0],
          [1, -1],
          [1, 1],
        ];

        this.pawnMovesGenerator(moves, posY, posX, directions, position, piece);
      } else if (!position[coord1] && !position[coord2] && position[coord3]) {
        const directions = [
          [1, 0],
          [1, 1],
        ];

        this.pawnMovesGenerator(moves, posY, posX, directions, position, piece);
      } else if (!position[coord1] && position[coord2] && !position[coord3]) {
        const directions = [
          [1, 0],
          [1, -1],
        ];

        this.pawnMovesGenerator(moves, posY, posX, directions, position, piece);
      } else if (!position[coord1] && !position[coord2] && !position[coord3]) {
        const directions = [[1, 0]];

        this.pawnMovesGenerator(moves, posY, posX, directions, position, piece);
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
