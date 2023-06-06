<p align="center">
  <img src=".github/logo.png" width="400" alt="SAARM logo" />
</p>

## 🍄 Social Account Abstraction Recovery and Management

Experience the future of social account abstraction recovery - where accessibility meets security, and your Ethereum identity is never out of reach.

Applicaton provides GraphQL API and command-line interface for managing recovery process of your ethereum-based account-abstraction smart contract in case your keys are compromized or you cannot get access to keys.

This is proof-of-concept of socio-technical mechanics related to account recovery

## 📋 Feature list

- [x] Social Recovery via your friends social network accounts
- [ ] Web UI for SRA
- [ ] Moblie UI for wallet owner
- [ ] Freeze your account via Telegram bot (and unfreeze with private keys which are not compromised or with SRAs)
- [ ] Storing recovery process state onchain (or in decentralized storages like IPFS)
- [ ] Different wallets (accounts) with transaction amount limits

## 🥕 Assumptions and requirements

1. SRA can use different entropy sources for hash generation, for PoC we use hash from google account ID
2. SRA is not required to use ethereum wallet

## 🧊 User flow description

1. Create Account Abstraction (AA) wallet
    - Deploy AA smart into blockchain
    - Add you alerting keys (accounts which can freeze wallet)
    - Add backup access key if needed (optional, TBD)
1. Add social recovery agents (SRA)
    - Ask your friend to generate hash from some data only he knows. In current example we use hash from google account data, and salt (owner's account address) via web app and get another hash from this hash [add link to web app]
    - User writes hash of SRA's hash to smart contract
1. (...You lost access to your keys or compromise it...)
1. Ask your friend to freeze your wallet
    - User asks somebody with alert keys to sent alert transaction to user's AA wallet
1. Start recovering process by asking social recovery agents for their social data
    - Go to your friends (only you know the list of them)
    - Ask them to genereate hash from their social data via web app
    - Collect and store in app all the hashes of your friend (currently - androud wallet with recovery feature)
1. User change access wallet
    - User submit transaction to blockchain with SRA's data hashes
    - Smart contract checks validity of hashes stored and calculated based on user's input
    - Smart contract updates owner if hashes are equal

Simple lightweight template for a backend applications, based on [NestJS](https://nestjs.com).
[Prisma.io](https://www.prisma.io) and SQLite uses as base for data storage (Postgres and others DBMS available too).

## 📃 Get started (TL;DR)

```shell
# Init project
$ npx liteend-cli new <project-name>

# Deploy database: 
$ npm run db:migrations:apply

# Seed DB: 
$ npm run db:seed

# Development run: 
$ npm run start:dev

# Production build: 
$ npm run build

# Production run: 
$ npm start:prod
```

### 🥡 Docker-compose

To launch the project in a Docker container, run the command `docker-compose up -d`

### 📦 Database workflow

```shell
# Edit schema: 
$ prisma/schema.prisma

# Format schema: 
$ npm run db:schema:format

# Create migration: 
$ npm run db:migrations:create

# Deploy migrations to database: 
$ npm run db:migrations:apply
```

> More info about using Prisma: https://www.prisma.io

#### 🔑 Database admin panel in docker

The project has an admin panel configured to work with the database, available by default on the `5000`
port: http://localhost:5000

**Important:** In production mode, be sure to set up a password for the database admin page

## 🍀 Code quality

> TL;DR: Run `npm run check` before **every** commit

### ✅ Tests

```shell
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

The project has [ESLint](https://eslint.org/) configured, which checks the code for errors and warnings, and See
also `tsconfig.json` for proper assembly and compilation of types. To check the code for errors and warnings - run the
command `npm run check`.
Prettier is also configured to format the code, run `npm run format` to format the code (but ESLint will still check it)
.

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to
check [issues page](https://github.com/uxname/liteend/issues).

## 💪 Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 [uxname@gmail.com](https://github.com/uxname).<br />
This project is [MIT](https://mit-license.org/) licensed.

## 🔍 Telemetry

The LiteEnd project collects telemetry data to help improve the product and enhance user experience. Telemetry data
collected includes information such as product name, version, architecture, operating system, NodeJS version, a unique
instance identifier, and launch timestamp.

The telemetry data collected is used to understand how users are using the product and to identify any issues or areas
for improvement. All telemetry data collected is treated as confidential and is never shared with third parties.

To opt-out of telemetry, users can set the `DISABLE_TELEMETRY` environment variable to `true` when running LiteEnd.
