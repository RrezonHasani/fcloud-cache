# CF-Cache

## Architecture

The architecture that the project is implemented in is the [clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

Please follow the link to get a bit of an understanding of the software architecture used.


Make sure to have at least node version 14.18.0 before getting started.

## Tech stack

using **Typescript, ExpressJS and MongoDB with Mongoose**.


## Start the app

To get started with the project run:
```
npm install
```
Make a .env file from the .env.example and use the same values for local development (assuming you are using a unix terminal)
```
cp .env.example .env
```
If you are using windows command prompt:
```
copy .env.example .env
```
Run docker compose will create MongoDB instance
```
docker-compose up -d
```

To start the app run:
```
npm run start
```


## List of Routes

```sh

+--------+-------------------------+
  Method | URI
+--------+-------------------------+
  GET    | /api/cache/keys # get all keys
  GET    | /api/cache/:key # get cache by key
  POST   | /api/cache/:key # create-update cache by key
  DELETE | /api/cache/:key # delete cache by key
  DELETE | /api/cache/ # delete all keys
+--------+-------------------------+
```

## Testing
This command will run tests
```bash
npm run test
```

