const express = require('express');

const { JobController } = require('./controller.js');

const JobsRouter = express.Router();

JobsRouter.get('/', JobController.get);
JobsRouter.post('/', JobController.add);
JobsRouter.delete('/', JobController.delete);

module.exports = JobsRouter;
