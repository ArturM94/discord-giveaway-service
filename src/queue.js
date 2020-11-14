const Queue = require('bull');
const axios = require('axios').default;

const config = require('./config.js');
const logger = require('./helpers/logger.js');

const { REDIS_URL, DISCORD_CLIENT_URL } = config;
const queue = new Queue('scheduler', REDIS_URL);
const api = axios.create({
  baseURL: DISCORD_CLIENT_URL,
});

queue.on('active', (job) => logger.info(`Job with id ${job.id} in queue "${queue.name}" has just started`));
queue.on('completed', (job, result) => logger.info(`Job with id ${job.id} in queue "${queue.name}" has been completed with result ${result}`));
queue.on('paused', (job) => logger.info(`Job with id ${job.id} in queue "${queue.name}" has paused`));
queue.on('drained', () => logger.info(`Queue "${queue.name}" has drained`));

queue.on('error', (error) => logger.error(`Queue "${queue.name}" has failed. Error: ${error.message}`));
queue.on('stalled', (job) => logger.error(`Job with id ${job.id} in queue "${queue.name}" has been stalled`));
queue.on('failed', (job, error) => logger.error(`Job with id ${job.id} in queue "${queue.name}" has failed. Error: ${error.message}`));

queue.process(async (job) => {
  try {
    const { data } = job;
    // should trigger a bot server that has to define a winner
    // await api.post('/winner', data);

    console.log('data', data);
  } catch (error) {
    logger.error(error);
  }
});

module.exports = queue;
