# Simple backend

Uses docker-compose to create docker containers for a postgreSQL db and a node server.

## Requirements

Installed docker, docker-compose.

Nice-to-have: make.

## Run dev server

Install npm dependencies with `npm install`.

Start docker containers with `make up`.
It is equivalent to running `sudo docker-compose --env-file ./env/dev.env -f docker-compose.yml up -d`.

Node server will be hosted at localhost:8080 (if you didn't change `/env/dev.env`).

To inspect docker container startup use `make up-debug` (or `sudo docker-compose --env-file ./env/dev.env -f docker-compose.yml up`).

Using Visual Studio Code you should be able to start the `Attach to Docker` to have debugging support.

## Deploy to prod

Run `make up-prod`.

## Configure

Change the values inside `.env` to suit your needs. Never use the default values in a production environment. For that create a new file prod.env.

## API Endpoint

`get localhost:8080/` => Show welcome message.

`get localhost:8080/bets` => Get the generated dummy bets.

`delete localhost:8080/bets/:id` => Delete bet with given id.

`put localhost:8080/bets` => Insert bet into DB. Payload has to be of form `{"amount": number, "teamId": number}`, where `teamId` has to correspond to existing team. Don't forget to use Header `Content-Type: application/json`.

## ToDos

- [x] Create .vscode/launch.json that can be attached to docker node
- [x] Make prod build work

## Credits

The following resources were used to create this project:

- [Setting up Docker + TypeScript + Node (Hot reloading code changes in a running container) 🦄 🚀](https://dev.to/dariansampare/setting-up-docker-typescript-node-hot-reloading-code-changes-in-a-running-container-2b2f)
- [Typeorm Docs](https://orkhan.gitbook.io/typeorm/docs/)
- [Typescript in prod Docker](https://simplernerd.com/docker-typescript-production/)