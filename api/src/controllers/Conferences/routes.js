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
                    guid: Joi.string().min( 36 ).max( 36 ).required(),
                    data: Joi.object().required()

                }

            }

        }

    },

    {

        path: '/',
        method: 'GET',
        handler: controller.getConferences,
        config: {

            validate: {

                query: {

                    token: Joi.string().min( 32 ).max( 32 ).required(),
                    guid: Joi.string().min( 36 ).max( 36 ).required()

                }

            }

        }

    },

    {

        path: '/{conferenceId}',
        method: 'GET',
        handler: controller.getConference,
        config: {

            validate: {

                query: {

                    token: Joi.string().min( 32 ).max( 32 ).required(),
                    guid: Joi.string().min( 36 ).max( 36 ).required()

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

                    guid: Joi.string().min( 36 ).max( 36 ).required(),
                    token: Joi.string().min( 32 ).max( 32 ).required(),
                    data: Joi.object().required()

                }

            }

        }

    },

];

export default routes;
