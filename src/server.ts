import "dotenv/config";
import { app } from "./app";
import  AppDataSource  from "./data-source";

const PORT = 3000;
AppDataSource.initialize()
  .then((): void => {
    console.log("Database Connected!");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
