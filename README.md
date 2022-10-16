## Quick Run

```bash
cp env-example .env
docker-compose up
```

You can open below service to see!

- Swagger: http://localhost:3000/docs
- Adminer (client for DB): http://localhost:8080

## For local Development

1. update the env

```bash
cp env-example .env
Change DATABASE_HOST=postgres to DATABASE_HOST=localhost
```

2. run additional container:

```bash
docker-compose up -d postgres adminer
```

3.1 for the first time:

```
npm install

npm run migration:run

npm run seed:run
```

3.2 make sure everything is okay before development
(code style, format, unit test, ts compile issue)

```
npm run pre:dev
```

3.3 kick off the dev server

```
npm run start:dev
```

You can open below service to see!

- Swagger: http://localhost:3000/docs
- Adminer (client for DB): http://localhost:8080

## Unit Test

```bash
npm run test:coverage
```

## End-to-End Tests in Docker

```bash
npm run test:e2e:docker
```
