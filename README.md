# Expense Tracker

- Simple SPA for recording your daily expense
- Coding style follow eslint standard, javascript standard
- Test-Driven-Development concept, following Red–Green–Refactor cycle

## Environment Setup
- Node.js 4.0 or above
- Mongodb
- Mocha

## Project-Setup
Download the project from github
```
git clone https://github.com/libterty/Expense-Tracker.git
```

To initialize the project, type following script to install
```
npm i
```

To initialize the inital data, type following script to install data
```
npm run seeder
```

Running the project
```
npm run start
```

## For developers

To unit test the project
```
npm i chai chai-http mocha nodemon q superagent supertest nyc --save-dev
```

To lint under eslint standard
```
npm i eslint eslint-config-prettier eslint-plugin-prettier --save-dev
```

### Running the test
To be notice, the following _id using in the /test/routes.test.js has to change.
Expect error if you don't, generating _id is considering not equivalent

```
npm run dev

npm run test
```

### Running the linting
```
npm run lint
```

## Auhtor
[11](https://github.com/libterty)

