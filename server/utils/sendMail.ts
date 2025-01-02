import nodemailer, { Transporter } from 'nodemailer';
import path from "path";
import ejs from 'ejs';
import "dotenv/config";

interface EmailOptions { 
    email: string;
    subject: string;   
    template: string;
    data:{[key: string]: any};
}

export const sendMail = async (options: EmailOptions) => {
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const { email, subject, template, data } = options;

    //get the path to the email template file
    const templatePath = path.join(__dirname, '../mails', template);
    
    //render the email template with the data
    const html = await ejs.renderFile(templatePath, data);

    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: options.email,
        subject: options.subject,
        html, 
    };

    await transporter.sendMail(mailOptions);
}

export default sendMail;