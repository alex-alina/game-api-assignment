import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"

const port = process.env.PORT || 4000

const app = createKoaServer({
   controllers: []
})

app.listen(port, () => console.log(`Listening on port ${port}`))