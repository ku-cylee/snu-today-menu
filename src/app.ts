import './env';
import getMenu from './menu-parser';

const main = async (): Promise<void> => {
    const menu = await getMenu();
};

main();
