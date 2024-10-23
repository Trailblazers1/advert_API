import { createTransport } from "nodemailer";

export const mailTransporter = createTransport({
    host: 'smtp.gmail.com',
    port: /*587*/  465,
    secure: /*false*/ true,
    auth: {
        user: 'djabateylarko@gmail.com',
        pass: process.env.EMAIL_PASSWORD_KEY
    },
    from: 'djabateylarko@gmail.com'
});