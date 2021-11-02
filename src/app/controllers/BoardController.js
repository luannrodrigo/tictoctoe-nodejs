import BoardService from '../services/BoardService';

class BoardController {
  async show(request, response) {
    const { board } = request.query;

    const splittedBoard = board ? board.split('') : '';

    const boardWithBestMovement = await BoardService.run({ splittedBoard });

    return response.status(201).json(boardWithBestMovement);
  }
}

export default new BoardController();
