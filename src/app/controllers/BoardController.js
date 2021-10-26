import BoardService from '../services/BoardService';

class BoardController {
  async show(request, response) {
    const board = request.params;
    const splitedBoard = board[0].replace(/\/\?board=/g, '').split('');

    const boardWithBestMoviment = await BoardService.run({ splitedBoard });

    return response.status(201).json({ turn: boardWithBestMoviment });
  }
}

export default new BoardController();
