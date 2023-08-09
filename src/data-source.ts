import "dotenv/config";
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./entities/users.entity";
import { Train } from "./entities/trains.entity";
import { Workout_plan } from "./entities/workout_plans.entity";
import { InitialMigration1691602936015 } from "./migrations/1691602936015-InitialMigration";

const dataSourceConfig = (): DataSourceOptions => {
  const migrationsPath: string = path.join(
    __dirname,
    "./migrations/**.{js,ts}"
  );
  const dbURL: string | undefined = process.env.DATABASE_URL;
  if (!dbURL) {
    throw new Error("Var env DATABASE_URL is not defined");
  }
  const nodeEnv: string | undefined = process.env.NODE_ENV;
  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [User, Train, Workout_plan],
    };
  }
  return {
    type: "postgres",
    url: dbURL,
    synchronize: false,
    logging: true,
    entities: [User, Train, Workout_plan],
    migrations: [InitialMigration1691602936015]
  };
};

const AppDataSource = new DataSource(dataSourceConfig());

export default AppDataSource;