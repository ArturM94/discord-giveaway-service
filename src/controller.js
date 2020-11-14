const calculateDelay = require('./helpers/calculateDelay.js');
const queue = require('./queue.js');
const logger = require('./helpers/logger.js');

class JobController {
  static async get(req,res) {
    try {
      // TODO: add validation
      const { types } = req.query;

      const jobs = await queue.getJobs(types);

      if (!jobs.length) {
        return res.status(404).json({ error: `Jobs with types ${types.join(', ')} not found` });
      }

      return res.status(200).json(jobs);
    } catch (error) {
      logger.error(error);
      return res.sendStatus(500);
    }
  }

  static async add(req, res) {
    try {
      // TODO: add validation
      // draft of incoming fields
      // id - giveaway's message id
      // date - giveaway's end date

      const { body } = req;
      const { id, date } = body;

      const delay = await calculateDelay(date);
      console.log('delay', delay);
      await queue.add(body, { delay, jobId: id });

      return res.status(200).json({ message: `Job with id ${id} has been added successfully` });
    } catch (error) {
      logger.error(error);
      return res.sendStatus(500);
    }
  }

  static async delete(req, res) {
    try {
      // TODO: add validation
      const { types } = req.query;

      const jobs = await queue.getJobs(types);
      jobs.forEach((job) => job.remove());

      return res.status(200).json({ message: `Jobs with types ${types.join(', ')} has been cleared successfully` });
    } catch (error) {
      logger.error(error);
      return res.sendStatus(500);
    }
  }
}

module.exports = { JobController };
