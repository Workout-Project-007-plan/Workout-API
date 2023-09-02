import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./entities/users.entity";
import { Train } from "./entities/trains.entity";
import { Workout_plan } from "./entities/workout_plans.entity";
import { InitialMigration1691602936015 } from "./migrations/1691602936015-InitialMigration";
import { IncludeExercisesRelation1692743601397 } from "./migrations/1692743601397-includeExercisesRelation";
import { ExercisesUpdate1692812631314 } from "./migrations/1692812631314-exercisesUpdate";
import { PasswordResetFix1693670962710 } from "./migrations/1693670962710-passwordResetFix";
import { DatesFix1693672267622 } from "./migrations/1693672267622-datesFix";
import { Exercise } from "./entities/exercises.entity";

const setDataSourceConfig = (): DataSourceOptions => {
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
      entities: [User, Train, Workout_plan, Exercise],
    };
  }

  return {
    type: "postgres",
    url: dbURL,
    synchronize: false,
    logging: true,
    entities: [User, Train, Workout_plan, Exercise],
    migrations: [
      InitialMigration1691602936015,
      IncludeExercisesRelation1692743601397,
      ExercisesUpdate1692812631314,
      PasswordResetFix1693670962710,
      DatesFix1693672267622,
    ],
  };
};

const AppDataSource = setDataSourceConfig();
export default new DataSource(AppDataSource);
