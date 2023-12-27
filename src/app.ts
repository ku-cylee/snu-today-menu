import './env';
import getMenu from './menu-parser';
import sendEmail from './email';

const main = async (): Promise<void> => {
    const today = new Date();
    const menu = await getMenu();
    await sendEmail(today, menu);
};

main();
