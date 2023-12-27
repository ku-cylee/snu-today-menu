import axios from 'axios';
import Menu from './menu';
import parse from 'node-html-parser';

const MENU_ADDRESS = 'https://snuco.snu.ac.kr/foodmenu';

const parseMenuPage = (htmlText: any): Menu => {
    try {
        const respHTML = parse(htmlText);
        const tableRows = respHTML.querySelectorAll('.view-content tr');
        const restaurantMenu = tableRows.find(elem => {
            const restaurantName = elem.childNodes[1].innerText;
            return restaurantName.includes('302동');
        });

        if (!restaurantMenu) throw new Error();

        const menu = restaurantMenu
            .getElementsByTagName('td')
            .filter((_, idx) => idx > 1)
            .map(elem =>
                elem.innerText
                    .split('\n')
                    .map(text => text.trim().replace(/&amp;/g, '&'))
                    .filter(text => {
                        const isEmpty = text === '';
                        const isHeader = text.includes('&lt; 뷔페 &gt;');
                        const isFooter = text.includes('※');
                        return !(isEmpty || isHeader || isFooter);
                    }),
            );

        return {
            lunch: menu[0],
            dinner: menu[1],
        };
    } catch {
        throw new Error('PARSE_FAILURE');
    }
};

export default async (): Promise<Menu> => {
    const response = await axios.get(MENU_ADDRESS);
    if (response!.status !== 200) throw new Error('GET_MENU_FAILURE');

    const menu = parseMenuPage(response.data);

    return menu;
};
