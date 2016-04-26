import controller from './controller';
import Joi from 'joi';

const routes = [

    {

        path: '/',
        method: 'POST',
        handler: controller.createConference,
        config: {

            validate: {

                payload: {

                    token: Joi.string().min( 32 ).max( 32 ).required(),
                    data: Joi.object().required()

                }

            }

        }

    },

    {

        path: '/{conferenceId}',
        method: 'PUT',
        handler: controller.updateConference,
        config: {

            validate: {

                payload: {

                    token: Joi.string().min( 32 ).max( 32 ).required(),
                    data: Joi.object().required()

                }

            }

        }

    },

];

export default routes;
