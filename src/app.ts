import './env';
import { scheduleJob } from 'node-schedule';
import getMenu from './menu-parser';
import sendEmail from './email';

const main = async (): Promise<void> => {
    const today = new Date();
    const menu = await getMenu();
    await sendEmail(today, menu);
};

scheduleJob('0 0 10 * * 1-5', main);
