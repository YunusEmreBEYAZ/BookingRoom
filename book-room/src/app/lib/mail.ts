"use server";

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendMail = async ({
    to,
    subject,
    body,
}: {
    to: string;
    subject: string;
    body: string;
}) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "yebeyaz@gmail.com",
            pass: "twdygfnbvfqcspqs",

        },

    });

    try {

        const test = await transporter.verify();
        console.log('SMTP transport verification:', test);
    } catch (error) {
        console.error('Error verifying SMTP transport:', error);
        return;
    }

    try {

        const sendResult = await transporter.sendMail({
            from: "yebeyaz@gmail.com",
            to,
            subject,
            html: body,
        });
        console.log('Mail sent:', sendResult);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
