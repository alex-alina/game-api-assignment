import { JsonController, Get, Param, Body, BodyParam, Post, Put, HttpCode, NotFoundError } from 'routing-controllers'
import Game from './entity';


const colors = ['red', 'blue', 'green', 'yellow', 'magenta']

const defaultBoard = [
  ['o', 'o', 'o'],
  ['o', 'o', 'o'],
  ['o', 'o', 'o']
]

const randomColor = (): string => {
  let index = Math.floor(Math.random() * colors.length)
  return colors[index]
}

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


  @Put('/games/:id')
  async updateGame(
    @Param('id') id: number,
    @Body() update: Partial<Game>
  ) {
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find page')

    return Game.merge(game, update).save()
  }

}
