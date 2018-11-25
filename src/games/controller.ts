import { JsonController, Get, Param, Body, BodyParam, Post, Put, HttpCode, NotFoundError, BadRequestError } from 'routing-controllers'
import Game, { Color } from './entity';


const colors: Array<Color> = ['red', 'blue', 'green', 'yellow', 'magenta']

const defaultBoard = [
  ['o', 'o', 'o'],
  ['o', 'o', 'o'],
  ['o', 'o', 'o']
]

const randomColor = (): Color => {
  let index = Math.floor(Math.random() * colors.length)
  let newColor: Color = colors[index]
  return newColor
}

const moves = (board1, board2) =>
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length

@JsonController()

export default class GameController {

  @Get('/games')
  async getGames() {
    const games = await Game.find()
    return { games }
  }

  @Post('/games')
  @HttpCode(201)
  async createGame(
    @BodyParam("name") name: string,
  ) {
    const game = await Game.create()
    game.name = name
    game.color = randomColor()
    game.board = defaultBoard

    return await game.save()
  }
  // (not for id).

  @Put('/games/:id')
  async updateGame(
    @Param('id') id: number,
    @Body() update: Partial<Game>,
    @BodyParam("board") board: string,
    @BodyParam("color") color: Color
  ) {
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find page')

    if (board) {
      const newBoard = JSON.parse(board)
      const checkMoves = moves(game.board, newBoard)
      if (checkMoves === 1) {
        update.board = newBoard
      }
      else {
        throw new BadRequestError("Only one move on the board is allowed")
      }
    }


    if (colors.includes(color)) {
      update.color = color
    } else {
      throw new BadRequestError("Valid colors: red, blue, green, yellow, magenta")
    }




    return Game.merge(game, update).save()
  }


}

