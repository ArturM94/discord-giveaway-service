const ENV = process.env;

const config = {
  PORT: ENV.PORT || 5000,
  REDIS_URL: ENV.REDIS_URL,
  DISCORD_CLIENT_URL: ENV.DISCORD_CLIENT_URL,
};

module.exports = config;
