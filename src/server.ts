import app from "./app.js";
import { env,logger } from "./config/index.js";


import { DatabaseService } from "../src/database/database.service.js";

async function bootstrap() {
  await DatabaseService.connect();

  app.listen(env.PORT, () => {
    logger.info(
      {
        environment: env.NODE_ENV,
        port: env.PORT,
      },
      "Server started successfully."
    );
  });
}

bootstrap();

