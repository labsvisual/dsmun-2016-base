import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

const options = {
    auth: {
        api_key: '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'
    }
}

export const buildMessage = ( to, subject, text, html ) => {

    return {
        to,
        from: 'DSMUN Base <no-reply@dsmun.com>',
        subject,
        text,
        html
    };

};

export const instance = nodemailer.createTransport( sgTransport( options ) );
