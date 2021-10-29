import AppError from '../../errors/AppError';

class Board {
  constructor(hashtag = ['', '', '', '', '', '', '', '', '']) {
    this.hashtag = hashtag.map((item) => item.trim());
  }

  isEmpty() {
    const status = this.hashtag.every((list) => !list);

    return status;
  }

  isFilled() {
    const status = this.hashtag.every((list) => list);

    return status;
  }

  getWinner() {
    const combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const IsXWinner = combinations.some((combination) => {
      const [a, b, c] = combination;

      return (
        this.hashtag[a] === 'x' &&
        this.hashtag[b] === 'x' &&
        this.hashtag[c] === 'x'
      );
    });

    const IsOWinner = combinations.some((combination) => {
      const [a, b, c] = combination;

      return (
        this.hashtag[a] === 'o' &&
        this.hashtag[b] === 'o' &&
        this.hashtag[c] === 'o'
      );
    });

    return [IsXWinner, IsOWinner];
  }

  movement(position, player) {
    if (![0, 1, 2, 3, 4, 5, 6, 7, 8].includes(position)) {
      throw new AppError('Invalid position', 400);
    }

    if (!['x', 'o', ''].includes(player)) {
      throw new AppError('Invalid player', 400);
    }

    this.hashtag[position] = player;

    return this.hashtag;
  }

  getAvailableMovements() {
    const movements = [];

    for (let i = 0; i < 9; i++) {
      if (this.hashtag[i] === '') {
        movements.push(i);
      }
    }

    return movements;
  }

  minimax(board, player) {
    const result = this.getWinner();

    if (result[0]) return 10;
    if (result[1]) return -10;
    if (this.isFilled()) return 0;

    let score = 0;

    for (let i = 0; i < 9; i++) {
      if (this.hashtag[i] === '') {
        this.hashtag[i] = player;

        if (player === 'x') {
          score = Math.max(score, this.minimax(board, 'o'));
        } else {
          score = Math.min(score, this.minimax(board, 'x'));
        }

        this.hashtag[i] = '';

        if (score === -10) return i;
      }
    }

    return score;
  }

  getBoard(board, player) {
    let boardArray = '';

    const position = this.minimax(board, player);

    const lists = this.movement(position, 'o');

    for (let i = 0; i < lists.length; i++) {
      boardArray += lists[i] ? lists[i] : ' ';
    }

    return boardArray;
  }
}

export default Board;
