// eslint-disable-next-line no-unused-vars
import config from 'dotenv/config';
import app from './app';

app.listen(process.env.SERVER_PORT);
