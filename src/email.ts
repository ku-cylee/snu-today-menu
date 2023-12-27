import nodemailer from 'nodemailer';
import Menu from './menu';

const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS, EMAIL_TO } = process.env;

const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
});

export default async (datetime: Date, menu: Menu): Promise<void> => {
    const year = datetime.getFullYear();
    const month = datetime.getMonth() + 1;
    const date = datetime.getDate();

    const html =
        `<p>${year}년 ${month}월 ${date}일 식단</p>` +
        `<p></p><p>점심</p><ul>${menu.lunch
            .map(text => `<li>${text}</li>`)
            .join('')}</ul><p></p><p>저녁</p><ul>${menu.dinner
            .map(text => `<li>${text}</li>`)
            .join('')}</ul>`;

    const mailOptions = {
        from: EMAIL_USER,
        to: EMAIL_TO,
        subject: `${year}년 ${month}월 ${date}일 식단`,
        html,
    };

    await transporter.sendMail(mailOptions);
};
