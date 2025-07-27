const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });

        await transporter.sendMail({
            from: `"Vyapaar Mandal" <${process.env.SMTP_EMAIL}>`,
            to,
            subject,
            html
        });

        console.log(`✅ Email sent to ${to}`);
    } catch (error) {
        console.error("❌ Email sending failed:", error.message);
    }
};

module.exports = sendEmail;
