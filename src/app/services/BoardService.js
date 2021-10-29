import AppError from '../../errors/AppError';
import Board from '../methods/Board';

class BoardService {
  async run({ splittedBoard }) {
    if (splittedBoard.length === 0) {
      throw new AppError('Board Cannot be null/undefined', 400);
    }

    const checkPlayers = splittedBoard.every(
      (player) => player === 'x' || player === 'o' || player === ' '
    );

    if (!checkPlayers) {
      throw new AppError('Invalid players', 400);
    }

    const hash = new Board(splittedBoard);

    const board = hash.getBoard(hash, 'o');

    return board;
  }
}

export default new BoardService();
