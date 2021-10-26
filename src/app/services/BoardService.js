import Board from '../methods/Boad';

class BoardService {
  async run({ splitedBoard }) {
    const hash = new Board(splitedBoard);

    const board = hash.getBoard(hash, 'o');

    return board;
  }
}

export default new BoardService();
