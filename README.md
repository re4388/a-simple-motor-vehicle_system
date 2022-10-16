## Quick Run

```bash
cp env-example .env
docker-compose up
```

## Local Development

```bash
cp env-example .env
Change DATABASE_HOST=postgres to DATABASE_HOST=localhost
```

run additional container:
```bash 
docker-compose up -d postgres adminer
```

```
npm install

npm run migration:run

npm run seed:run

npm run start:dev
```

- Swagger: http://localhost:3000/docs
- Adminer (client for DB): http://localhost:8080





1. run up the postgres db
```
docker-compose up postgres
(or just start the container if not the first time)
```

2. install dependencies
```
npm i
```

3. make sure every thing work
```
npm pre:dev
```

4.  run up api server locally
```
npm run start:dev
```

## Unit Test
```bash
npm run test:coverage
```

## End-to-End Tests in Docker

```bash
npm run test:e2e:docker
```


