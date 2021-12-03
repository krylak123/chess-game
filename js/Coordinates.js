class Coordinates {
  constructor() {}

  convertToTableNotation(source) {
    let x = source[1];
    let y = source[0];

    if (x === '1') x = 7;
    else if (x === '2') x = 6;
    else if (x === '3') x = 5;
    else if (x === '4') x = 4;
    else if (x === '5') x = 3;
    else if (x === '6') x = 2;
    else if (x === '7') x = 1;
    else if (x === '8') x = 0;

    if (y === 'a') y = 0;
    else if (y === 'b') y = 1;
    else if (y === 'c') y = 2;
    else if (y === 'd') y = 3;
    else if (y === 'e') y = 4;
    else if (y === 'f') y = 5;
    else if (y === 'g') y = 6;
    else if (y === 'h') y = 7;

    return [x, y];
  }

  convertToBoardNotation(moves) {
    const result = [];

    moves.forEach(coord => {
      let x = coord[0];
      let y = coord[1];

      if (x === 0) x = 8;
      else if (x === 1) x = 7;
      else if (x === 2) x = 6;
      else if (x === 3) x = 5;
      else if (x === 4) x = 4;
      else if (x === 5) x = 3;
      else if (x === 6) x = 2;
      else if (x === 7) x = 1;

      if (y === 0) y = 'a';
      else if (y === 1) y = 'b';
      else if (y === 2) y = 'c';
      else if (y === 3) y = 'd';
      else if (y === 4) y = 'e';
      else if (y === 5) y = 'f';
      else if (y === 6) y = 'g';
      else if (y === 7) y = 'h';

      result.push(`${y}${x}`);
    });

    return result;
  }
}
