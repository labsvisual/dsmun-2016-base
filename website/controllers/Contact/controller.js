import * as Mailer from '../../helpers/mailer';

const handlers = {

    postContact( request, reply ) {

        const payload = JSON.parse( request.payload.payload );

        const msgText = `

        You have a new contact form submission. <br>
        <br>
        Name: ${ payload.name }<br>
        Email: ${ payload.email }<br>
        Subject: ${ payload.subject }<br>
        <hr>
        Message: <br>
        ${ payload.message }

        `;

        const message = Mailer.buildMessage( payload.email, `Contact Form ${ payload.email }`, msgText, msgText );
        Mailer.instance.sendMail( message, ( err, res ) => {

            if( err ) {
                console.log( err );
                const response = reply( {

                    statusCode: 500,
                    message: 'There was an error'

                } );
                response.statusCode = 500;
                return;
            }

            const response = reply( {

                statusCode: 200,
                message: 'Ok'

            } );

        } );

    }

};

export default handlers;
