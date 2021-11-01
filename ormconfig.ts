import { ConnectionOptions } from "typeorm";

const pgUser = process.env.PGUSER;
const pgPassword = process.env.PGPASSWORD;
const pgDatabase = process.env.PGDATABASE;
const pgPort = Number(process.env.PGPORT);
const pgHost = process.env.PGHOST;

const defaultConnection: ConnectionOptions = {
  name: "default",
  type: "postgres",
  host: pgHost,
  port: pgPort,
  username: pgUser,
  password: pgPassword,
  database: pgDatabase,
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts", "src/entity/**/*.js"],
  migrations: ["src/migration/**/*.ts", "src/migration/**/*.js"],
  subscribers: ["src/subscriber/**/*.ts", "src/subscriber/**/*.js"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

const seedConnection: ConnectionOptions = {
  ...defaultConnection,
  name: "seed",
  synchronize: true,
  migrations: ["src/seed/**/*.ts", "src/seed/**/*.js"],
  cli: {
    migrationsDir: "src/seed",
  },
};

export default [defaultConnection, seedConnection];
