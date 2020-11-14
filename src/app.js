const express = require('express');

const config = require('./config.js');
const JobsRouter = require('./routes.js');
const logger = require('./helpers/logger.js');
const { NotFoundError, ServerError } = require('./middlewares/errorMiddleware.js');

const app = express();
const { PORT } = config;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendStatus(200));

app.use('/jobs', JobsRouter);

app.use(NotFoundError);
app.use(ServerError);

app.listen(PORT, () => {
  logger.info(`Giveaway service is running on ${PORT}`);
});
