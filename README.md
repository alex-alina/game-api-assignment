## Game API - Homework Project
[Game demo server deployed on Heroku](https://enigmatic-taiga-58228.herokuapp.com/games)

## Description
The project's goal was to build a basic REST API in TypeScrip that creates and updates a game board.
The games table was created using TypeORM. The model has an id, a name, a color and board field.
The webserver was setup using routing-controllers. 

When a game starts, the app sets the board to an empty board. The board is a two dimensional array that contains three arrays with three times the letter 'o'.
When a game is changed and the board field is updated, only 1 move is permited per request. Only one element out of the 9 can be changed into something else per move.

Endpoints: 
* `GET /games`: list all games
* `POST /games`: the only input is a name. Create a new game with an id, name, color and board. Each newly created game receives a random color out of these colors: red, blue, green, yellow, magenta.
* `PUT /games/:id`: update an existing game. Overwrite one or more fields of the game. Includes color validation.

## Tech stack
* TypeScript
* Koa
* TypeORM
* PostgreSQL 

## Demo
Using HTTPie from the Terminal:
```bash
http https://enigmatic-taiga-58228.herokuapp.com/games 
http POST https://enigmatic-taiga-58228.herokuapp.com/games name="Munchkin game"
http PUT https://enigmatic-taiga-58228.herokuapp.com/games/2 board='[["o","o","o"],["o","o","o"],["o","o","m"]]'
```

## Setup

* You need a working Postgres database that is preferrably empty and running 
* Install the dependencies using `npm install`
* Start the server using `nodemon .`
* You can now access enpoints with HTTPie commands on `localhost:4000`


## License
MIT Licence - Copyright &copy; 2018 - Alina Rusu

