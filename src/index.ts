import 'reflect-metadata'
import { createKoaServer } from "routing-controllers"
import setupDb from './db'
import GameController from './games/controller';

const app = createKoaServer({
   controllers: [
      GameController
   ]
})
const port = process.env.PORT || 4000

setupDb()
   .then(_ =>
      app.listen(port, () => console.log(`Listening on port ${port}`))
   )
   .catch(err => console.error(err))