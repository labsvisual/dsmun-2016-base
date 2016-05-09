import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

const options = {
    auth: {
        api_key: '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'
    }
}

export const buildMessage = ( fromEmail, subject, text, html ) => {

    return {
        to: [ 'dsmun@doonschool.com', '334@doonschool.com' ],
        from: fromEmail,
        subject,
        text,
        html
    };

};

export const instance = nodemailer.createTransport( sgTransport( options ) );
