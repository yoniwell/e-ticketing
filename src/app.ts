import express from 'express';
import routes from "./modules/routes/index.js";

import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';

import { AppError } from './common/errors/index.js';
import { asyncHandler } from './common/utils/index.js';

import { ResponseBuilder } from './common/responses/index.js';


const app = express();




/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

// Parse JSON request bodies
app.use(express.json());

app.use(requestLogger);

app.use("/api", routes);



/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

app.get('/', (req, res) => {
  ResponseBuilder.success(
    res,
    {
      version: '1.0.0',
    },
    'Transportation Backend API is running',
  );
});

app.get(
  '/async-test',
  asyncHandler(async (_req, _res) => {
    throw new AppError('Async error works!', 500);
  }),
);



app.use(errorHandler);

export default app;
