import config from 'config';
import { logger } from './utils/logger';
const x = 100;
logger.info("node.js", x, process.env.NODE_ENV, config.get('name'));
export { x };