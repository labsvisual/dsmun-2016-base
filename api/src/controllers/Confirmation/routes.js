import controller from './controller';
import Joi from 'joi';

const routes = [

    {

        path: '/{conferenceGuid}',
        method: 'GET',
        handler: controller.prepareConfirmationSheet,
        config: {

            validate: {

                params: {

                    guid: Joi.string().min( 36 ).max( 36 ).required()

                }

            }

        }

    },


];

export default routes;
