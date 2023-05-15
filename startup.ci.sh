# wait until postgres:5432 is up
# and then we run migraiton and seed
/opt/wait-for-it.sh postgres:5432 -- npm run migration:run && npm run seed:run

## and then we can run the api server
npm run start > /dev/null 2>&1 &

# want until localhost:3000 is up
# and then we run linter and e2e
# --runInBand: run the tests in a single process sequentially
# (as opposed to parallel execution)
/opt/wait-for-it.sh localhost:3000 -- npm run lint && npm run test:e2e -- --runInBand