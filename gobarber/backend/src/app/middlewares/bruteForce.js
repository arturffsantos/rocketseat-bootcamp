import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);

export default async (req, res, next) => {
  if (
    process.env.NODE_ENV !== 'development' &&
    process.env.NODE_ENV !== 'test'
  ) {
    return bruteForce.prevent;
  }
  return next();
};
