import controller from './controller';
import Joi from 'joi';

const routes = [

    {

        path: '/',
        method: 'POST',
        handler: controller.postNotification,
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

        path: '/{guid}',
        method: 'GET',
        handler: controller.getNotifications,
        config: {

            validate: {

                query: {

                    token: Joi.string().min( 32 ).max( 32 ).required(),

                },

                params: {

                    guid: Joi.string().min( 36 ).max( 36 ).required(),

                }

            }

        }

    },

    {

        path: '/{guid}/{notificationId}/viewed',
        method: 'GET',
        handler: controller.confirmNotification,
        config: {

            validate: {

                query: {

                    token: Joi.string().min( 32 ).max( 32 ).required(),

                },

                params: {

                    guid: Joi.string().min( 36 ).max( 36 ).required(),
                    notificationId: Joi.string().min( 16 ).max( 16 ).required(),

                }

            }

        }

    },

];

export default routes;
