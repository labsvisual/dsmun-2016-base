import controller from './controller';
import Joi from 'joi';

const routes = [

    {

        path: '/{conferenceGuid}',
        method: 'POST',
        handler: controller.prepareConfirmationSheet,
        config: {

            validate: {

                payload: {

                    token: Joi.string().min( 32 ).max( 32 ).required(),
                    guid: Joi.string().min( 36 ).max( 36 ).required(),

                },

                params: {

                    conferenceGuid: Joi.string().min( 36 ).max( 36 ).required(),

                }

            }

        }

    },

];

export default routes;
