import "dotenv/config";
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";

const dataSourceConfig = (): DataSourceOptions => {
  const migrationsPath: string = path.join(
    __dirname,
    "./migrations/**.{js,ts}"
  );
  const dbURL: string | undefined = process.env.DATABASE_URL;
  if(!dbURL){
    throw new Error("Var env DATABASE_URL is not defined")
  }
  const nodeEnv: string | undefined = process.env.NODE_ENV;
  if(nodeEnv === "test"){
    return {
        type: "sqlite",
        database: ":memory",
        synchronize: true,
        entities:[] 
    }
  } 
  return {
    type: "postgres",
    url: dbURL,
    synchronize: false,
    logging: true,
    entities: [],
    migrations:[],
  }
};
export const AppDataSource = new DataSource(dataSourceConfig())